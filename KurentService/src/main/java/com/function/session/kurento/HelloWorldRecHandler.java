package com.function.session.kurento;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.kurento.client.Continuation;
import org.kurento.client.ErrorEvent;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidate;
import org.kurento.client.IceCandidateFoundEvent;
import org.kurento.client.KurentoClient;
import org.kurento.client.MediaPipeline;
import org.kurento.client.MediaProfileSpecType;
import org.kurento.client.MediaType;
import org.kurento.client.PausedEvent;
import org.kurento.client.RecorderEndpoint;
import org.kurento.client.RecordingEvent;
import org.kurento.client.StoppedEvent;
import org.kurento.client.WebRtcEndpoint;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.amazonaws.util.IOUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.function.session.api.domain.Game;
import com.function.session.api.dto.PlaySaveRequestDto;
import com.function.session.api.dto.RpsSaveRequestDto;
import com.function.session.api.dto.VideoRequestDto;
import com.function.session.api.service.GameService;
import com.function.session.api.service.UploadService;
import com.function.session.client.user.UserServiceClient;
import com.function.session.kafka.GameEventProducer;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;

public class HelloWorldRecHandler extends TextWebSocketHandler {

	private static String RECORDER_FILE_NAME;
	private static Long gameId = 0L;

	private final Logger log = LoggerFactory.getLogger(HelloWorldRecHandler.class);
	private static final Gson gson = new GsonBuilder().create();

	@Autowired
	private UserRegistry registry;

	@Autowired
	private KurentoClient kurento;

	@Autowired
	private GameService gameService;

	@Autowired
	private UploadService uploadService;

	@Autowired
	private UserServiceClient userServiceClient;

	@Autowired
	private GameEventProducer gameEventProducer;

	@Override
	public void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		JsonObject jsonMessage = gson.fromJson(message.getPayload(), JsonObject.class);

		log.info("Incoming message: {}", jsonMessage);

		UserSession user = registry.getBySession(session);
		if (user != null) {
			log.debug("Incoming message from user '{}': {}", user.getId(), jsonMessage);
		} else {
			log.debug("Incoming message from new user: {}", jsonMessage);
		}

		// recording 시 record 실행 및 addEventListener 실행
		String msg = message.getPayload();

		System.out.println("msg :  " + msg);

		// // 파일 이름 지정
		// RECORDER_FILE_NAME = jsonMessage.get("userEmail").getAsString() + ".webm";
		switch (jsonMessage.get("id").getAsString()) {
			case "start":
				// TODO: FE 에서 보내준 정보로 변경
				String uid = jsonMessage.get("uid").getAsString();
				System.out.println("============== uid: " + uid + "=======================");
				// String uid = "PqeD5zOWLXauO1AAt81Fn3YoFbI3";
				// start 요청이 오면 파일 이름 지정
				Long userId = userServiceClient.findByUserId(uid);
				System.out.println("====================== userId: " + userId + "====================");
				gameId = gameService.save(new Game(userId));

				RECORDER_FILE_NAME = gameId + "_" + uid + ".webm";
				start(session, jsonMessage);

				break;
			case "stop":
				if (user != null) {
					String gameResults = jsonMessage.get("gameResult").getAsString();
					System.out.println("=========== gameResults: " + gameResults.toString() + " ===========");
					stop(gameResults);
					user.stop();
				}
			case "stopPlay":
				if (user != null) {
					user.release();
				}
				break;
			case "connect":
				sendToMessage(session);
				break;
			// case "play":
			// 	play(user, session, jsonMessage);
			// 	break;
			case "onIceCandidate": {
				JsonObject jsonCandidate = jsonMessage.get("candidate").getAsJsonObject();
				System.out.println(jsonCandidate.toString());

				System.out.println("candidate: " + jsonCandidate.get("candidate").getAsString());
				System.out.println("sdpMid: " + jsonCandidate.get("sdpMid").getAsString());
				System.out.println("sdpMLineIndex: " + jsonCandidate.get("sdpMLineIndex").getAsInt());

				if (user != null) {
					IceCandidate candidate = new IceCandidate(jsonCandidate.get("candidate").getAsString(),
						jsonCandidate.get("sdpMid").getAsString(),
						jsonCandidate.get("sdpMLineIndex").getAsInt());
					user.addCandidate(candidate);
				}
				break;
			}

			default:
				sendError(session, "Invalid message with id " + jsonMessage.get("id").getAsString());
				break;
		}
	}

	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		super.afterConnectionClosed(session, status);
		registry.removeBySession(session);
	}

	private void start(final WebSocketSession session, JsonObject jsonMessage) {

		try {
			long startTime = System.currentTimeMillis();
			System.out.println("======= startTime: " + startTime);
			AtomicBoolean isRecordingStarted = new AtomicBoolean(false);

			// 1. Media logic (webRtcEndpoint in loopback)
			MediaPipeline pipeline = kurento.createMediaPipeline();
			WebRtcEndpoint webRtcEndpoint = new WebRtcEndpoint.Builder(pipeline).build();
			webRtcEndpoint.connect(webRtcEndpoint);

			MediaProfileSpecType profile = getMediaProfileFromMessage(jsonMessage);

			String filePath = "file:///tmp/" + RECORDER_FILE_NAME;

			System.out.println("**************************************************");
			System.out.println("**************************************************");
			System.out.println("**************************************************");
			System.out.println("**************** " + startTime + " *****************");
			System.out.println("**************************************************");
			System.out.println("**************************************************");
			System.out.println("**************************************************");

			System.out.println("filePath: " + filePath);
			RecorderEndpoint recorder = new RecorderEndpoint.Builder(pipeline, filePath)
				.withMediaProfile(profile).build();

			pipeline.addErrorListener(new EventListener<ErrorEvent>() {
				@Override
				public void onEvent(ErrorEvent ev) {
					log.error(
						"[MediaPipeline::ErrorEvent] Error code {}: '{}', source: {}, timestamp: {}, tags: {}, description: {}",
						ev.getErrorCode(), ev.getType(), ev.getSource().getName(),
						ev.getTimestampMillis(), ev.getTags(), ev.getDescription());
					sendError(session, "[MediaPipeline] " + ev.getDescription());
				}
			});

			webRtcEndpoint.addErrorListener(new EventListener<ErrorEvent>() {
				@Override
				public void onEvent(ErrorEvent ev) {
					log.error(
						"[WebRtcEndpoint::ErrorEvent] Error code {}: '{}', source: {}, timestamp: {}, tags: {}, description: {}",
						ev.getErrorCode(), ev.getType(), ev.getSource().getName(),
						ev.getTimestampMillis(), ev.getTags(), ev.getDescription());
					sendError(session, "[WebRtcEndpoint] " + ev.getDescription());
				}
			});

			recorder.addErrorListener(new EventListener<ErrorEvent>() {
				@Override
				public void onEvent(ErrorEvent ev) {
					log.error(
						"[RecorderEndpoint::ErrorEvent] Error code {}: '{}', source: {}, timestamp: {}, tags: {}, description: {}",
						ev.getErrorCode(), ev.getType(), ev.getSource().getName(),
						ev.getTimestampMillis(), ev.getTags(), ev.getDescription());
					sendError(session, "[RecorderEndpoint] " + ev.getDescription());
				}
			});

			recorder.addStoppedListener(new EventListener<StoppedEvent>() {

				@Override
				public void onEvent(StoppedEvent event) {
					System.out.println("recording.addStoppedListener 진입");
					JsonObject response = new JsonObject();
					response.addProperty("id", "stopped");

					try {
						System.out.println("stop try");

						synchronized (session) {
							session.sendMessage(new TextMessage(response.toString()));
						}
					} catch (IOException e) {
						log.error(e.getMessage());
					}
				}

			});

			recorder.addPausedListener(new EventListener<PausedEvent>() {

				@Override
				public void onEvent(PausedEvent event) {
					JsonObject response = new JsonObject();
					response.addProperty("id", "paused");
					try {
						synchronized (session) {
							session.sendMessage(new TextMessage(response.toString()));
						}
					} catch (IOException e) {
						log.error(e.getMessage());
					}
				}
			});

			connectAccordingToProfile(webRtcEndpoint, recorder, profile);

			// 2. Store user session
			UserSession user = new UserSession(session);
			user.setMediaPipeline(pipeline);
			user.setWebRtcEndpoint(webRtcEndpoint);
			user.setRecorderEndpoint(recorder);

			registry.register(user);

			// 3. SDP negotiation
			String sdpOffer = jsonMessage.get("sdpOffer").getAsString();
			String sdpAnswer = webRtcEndpoint.processOffer(sdpOffer);

			// 4. Gather ICE candidates
			webRtcEndpoint.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {

				@Override
				public void onEvent(IceCandidateFoundEvent event) {
					JsonObject response = new JsonObject();
					response.addProperty("id", "iceCandidate");
					response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
					try {
						synchronized (session) {
							session.sendMessage(new TextMessage(response.toString()));
						}
					} catch (IOException e) {
						log.error(e.getMessage());
					}
				}
			});

			JsonObject response = new JsonObject();
			response.addProperty("id", "startResponse");
			response.addProperty("sdpAnswer", sdpAnswer);

			synchronized (user) {
				session.sendMessage(new TextMessage(response.toString()));
			}

			webRtcEndpoint.gatherCandidates();

			recorder.record(new Continuation<Void>() {
				@Override
				public void onSuccess(Void result) {
					// 녹화 시작 성공 시 실행할 코드
					System.out.println("Recording started successfully");

					try {
						Thread.sleep(3000);
					} catch (InterruptedException e) {
						e.printStackTrace();
					}

					long endTime = System.currentTimeMillis();  // 종료 시간 기록
					long elapsedTime = endTime - startTime;  // 경과 시간 계산
					System.out.println("elapsedTime: " + elapsedTime);
					isRecordingStarted.set(true);
					System.out.println("녹화요청 성공함: " + isRecordingStarted.get());
				}

				@Override
				public void onError(Throwable cause) {
					// 녹화 시작 실패 시 실행할 코드
					System.out.println("Failed to start recording: " + cause.getMessage());
				}
			});

			long maxWaitTime = 5000;
			long elapsedTime = 0;

			while (!isRecordingStarted.get() && elapsedTime <= maxWaitTime) {
				Thread.sleep(100);  //100ms 간격
				elapsedTime += 100;
			}

			System.out.println("녹화 시작까지 걸린 시간: " + elapsedTime + " __ " + isRecordingStarted.get());

			if (isRecordingStarted.get()) {
				System.out.println("Listener 실행됨" + recorder.getState());

				recorder.addRecordingListener(new EventListener<RecordingEvent>() {
					@Override
					public void onEvent(RecordingEvent event) {
						System.out.println("recording.addRecordingListener 진입" + event);
						JsonObject response = new JsonObject();
						response.addProperty("id", "recording");
						response.addProperty("gameId", gameId);

						try {
							System.out.println("record try");
							synchronized (session) {
								session.sendMessage(new TextMessage(response.toString()));
							}
						} catch (IOException e) {
							log.error(e.getMessage());
						}
					}
				});
			} else {
				System.out.println("============ 시간 초과 ============");
			}
		} catch (Throwable t) {
			log.error("Start error", t);
			sendError(session, t.getMessage());
		}
		System.out.println("============ catch 뒤 ============");
	}

	private MediaProfileSpecType getMediaProfileFromMessage(JsonObject jsonMessage) {
		return MediaProfileSpecType.WEBM;
	}

	private void connectAccordingToProfile(WebRtcEndpoint webRtcEndpoint, RecorderEndpoint recorder,
		MediaProfileSpecType profile) {

		System.out.println("connectAccordingToProfile webRtcEndpoint : " + webRtcEndpoint.getConnectionState());
		System.out.println("connectAccordingToProfile recorder : " + recorder.getState());
		System.out.println("connectAccordingToProfile profile : " + profile.toString());

		switch (profile) {
			case WEBM:
				webRtcEndpoint.connect(recorder, MediaType.AUDIO);
				webRtcEndpoint.connect(recorder, MediaType.VIDEO);
				break;
			case WEBM_AUDIO_ONLY:
				webRtcEndpoint.connect(recorder, MediaType.AUDIO);
				break;
			case WEBM_VIDEO_ONLY:
				webRtcEndpoint.connect(recorder, MediaType.VIDEO);
				break;
			default:
				throw new UnsupportedOperationException("Unsupported profile for this tutorial: " + profile);
		}
	}

	private void stop(String gameResults) {
		System.out.println("======================= stop 진입 ===================== ");
		try {
			System.out.println("flag 1");

			// 6. Send video to Spring
			String videoPath = "/recordvideo/" + RECORDER_FILE_NAME;
			System.out.println("filePath: " + videoPath);

			Path videoFilePath = Paths.get(videoPath);
			System.out.println("videoFilePath = " + videoFilePath);
			if (!Files.exists(videoFilePath)) {
				throw new FileNotFoundException("없어!" + videoFilePath);
			}

			Game game = gameService.findById(gameId);
			System.out.println("************************* game = " + game + " ************************* ");

			// 게임 데이터를 가공해서 kafka 에 넣어주기
			System.out.println("*************** 게임 데이터 받아와서 작업 시작 ***************");
			ObjectMapper objectMapper = new ObjectMapper();

			JsonNode jsonNode = objectMapper.readTree(gameResults);
			String gameType = jsonNode.get("gameType").asText();

			System.out.println("gameType = " + gameType);

			if (gameType.equals("rps")) {
				System.out.println("[CASE 1] RPS 게임인 경우");
				RpsSaveRequestDto dto = objectMapper.readValue(gameResults, RpsSaveRequestDto.class);
				dto.setUserId(game.getUserId());
				System.out.println("============= dto: " + convertDtoToJsonString(dto));
				gameEventProducer.publish("kafka.assess.answer.json", convertDtoToJsonString(dto));

			} else {
				System.out.println("[CASE 2] NOT RPS 게임인 경우");
				PlaySaveRequestDto dto = objectMapper.readValue(gameResults, PlaySaveRequestDto.class);
				dto.setUserId(game.getUserId());
				System.out.println("============= dto: " + convertDtoToJsonString(dto));
				gameEventProducer.publish("kafka.assess.answer.json", convertDtoToJsonString(dto));
			}
			// Game game = gameService.findById(gameId);

			// 게임을 가져와서 S3 업로드하는 과정
			System.out.println("flag 2");
			File file = videoFilePath.toFile();
			System.out.println("file: " + file.getName());
			String filePath = uploadService.uploadVideo(convertFileToMultipartFile(file));

			System.out.println("game: " + game.toString());

			// game 내용 업데이트
			game.update(gameType);
			gameService.save(game);
			System.out.println("After game: " + game.toString());

			VideoRequestDto requestDto = new VideoRequestDto(gameId, filePath, game.getType(), "startTime", "endTime");
			System.out.println(requestDto.toString());
			gameEventProducer.publish("kafka.ai.video.json", convertDtoToJsonString(requestDto));
			log.info("file upload 성공: " + filePath);
		} catch (IOException e) {
			log.error("Failed to send video to Spring: {}", e.getMessage());
		}
	}

	private MultipartFile convertFileToMultipartFile(File file) throws IOException {
		System.out.println("================= convertFileToMultipartFile 호출 =================");
		FileItem fileItem = new DiskFileItem("file"
			, Files.probeContentType(file.toPath())
			, false, file.getName()
			, (int)file.length(),
			file.getParentFile());
		System.out.println("flag 1");
		try {
			System.out.println("flag 2");
			InputStream is = new FileInputStream(file);
			System.out.println("flag 3");
			OutputStream os = fileItem.getOutputStream();
			System.out.println("flag 4");
			IOUtils.copy(is, os);
			System.out.println("flag 5");
		} catch (IOException e) {
			log.error("[convertFileToMultipartFile] error {}", e.getMessage());
			throw new IOException(e);
		}
		System.out.println("flag 6");

		return new CommonsMultipartFile(fileItem);
	}

	private String convertDtoToJsonString(Object dto) {
		try {
			return new ObjectMapper().writeValueAsString(dto);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Failed to convert Dto to JSON string", e);
		}
	}

	public void sendPlayEnd(WebSocketSession session, MediaPipeline pipeline) {
		try {
			JsonObject response = new JsonObject();
			response.addProperty("id", "playEnd");
			session.sendMessage(new TextMessage(response.toString()));
		} catch (IOException e) {
			log.error("Error sending playEndOfStream message", e);
		}
		// Release pipeline
		pipeline.release();
	}

	private void sendError(WebSocketSession session, String message) {
		JsonObject response = new JsonObject();
		response.addProperty("id", "error");
		response.addProperty("message", message);

		try {
			synchronized (session) {
				session.sendMessage(new TextMessage(response.toString()));
			}
		} catch (IOException e) {
			log.error("Exception sending message", e);
		}
	}

	private void sendToMessage(WebSocketSession session) {
		JsonObject response = new JsonObject();
		response.addProperty("connection", "ok");

		try {
			synchronized (session) {
				session.sendMessage(new TextMessage(response.toString()));
			}
		} catch (IOException e) {
			log.error("Exception sending message", e);
		}
	}
}
