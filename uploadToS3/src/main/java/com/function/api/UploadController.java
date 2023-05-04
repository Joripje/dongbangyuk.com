package com.function.api;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.function.dto.GameSaveRequestDto;
import com.function.kafka.GameEventProducer;
import com.function.service.PlayService;
import com.function.service.UploadService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class UploadController {

	private final UploadService uploadService;
	private final PlayService playService;
	private final GameEventProducer gameEventProducer;

	@ApiOperation(value = "S3에 영상 업로드")
	@PostMapping("/upload")
	public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) throws IOException {
		String filePath = uploadService.uploadVideo(file);
		gameEventProducer.publish("test", filePath);
		return ResponseEntity.ok("Video upload successful!");
	}

	@ApiOperation(value = "게임 기록 저장")
	@PostMapping(value = "/recordPlay")
	public ResponseEntity<String> saveGameHistory(@RequestBody String gameData) {

		ObjectMapper objectMapper = new ObjectMapper();

		try {
			// JSON 문자열을 Map으로 변환
			JsonNode jsonNode = objectMapper.readTree(gameData);
			// 필요한 정보 추출
			Long userId = jsonNode.get("userId").asLong();
			String gameType = jsonNode.get("gameType").asText();
			String date = jsonNode.get("date").asText();

			// GameHistory 엔티티 생성 후 필요한 정보 저장
			GameSaveRequestDto gameHistory = GameSaveRequestDto.builder()
				.userId(userId)
				.gameType(gameType)
				.date(date)
				.build();

			// GameHistory 엔티티 저장
			Long newGameId = playService.save(gameHistory);

			// 입력 데이터 복사해서 gameId만 변경
			jsonNode = jsonNode.deepCopy();
			((ObjectNode)jsonNode).put("gameId", newGameId);
			String responseData = objectMapper.writeValueAsString(jsonNode);

			log.info("gameEventProducer 호출");
			gameEventProducer.publish("test", responseData);

			return ResponseEntity.ok(responseData);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	}

	@ExceptionHandler(IOException.class)
	public ResponseEntity<String> handleIOException(IOException e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed: " + e.getMessage());
	}

}
