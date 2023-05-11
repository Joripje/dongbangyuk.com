package com.function.api;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.function.dto.GameSaveRequestDto;
import com.function.dto.PlaySaveRequestDto;
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

	// @ApiOperation(value = "S3에 영상 업로드")
	// @PostMapping("/upload")
	// public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) throws IOException {
	// 	String filePath = uploadService.uploadVideo(file);
	// 	return ResponseEntity.ok("Video upload successful!");
	// }

	@ApiOperation(value = "게임 기록 저장")
	@PostMapping(value = "/recordPlay")
	public ResponseEntity<PlaySaveRequestDto> saveGameHistory(@Valid @RequestBody PlaySaveRequestDto requestDto) {
		// 필요한 정보 추출
		Long userId = requestDto.getUserId();
		String gameType = requestDto.getGameType();
		String date = requestDto.getDate();

		// GameHistory 엔티티 생성 후 필요한 정보 저장
		GameSaveRequestDto gameHistory = createGameHistory(userId, gameType, date);

		// GameHistory 엔티티 저장
		Long newGameId = playService.save(gameHistory);
		requestDto.setGameId(newGameId);

		String dtoString = convertDtoToJsonString(requestDto);
		log.info("gameEventProducer 호출");
		gameEventProducer.publish("kafka.assess.answer.json", dtoString);

		return ResponseEntity.ok(requestDto);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	}

	@ExceptionHandler(IOException.class)
	public ResponseEntity<String> handleIOException(IOException e) {
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed: " + e.getMessage());
	}

	private GameSaveRequestDto createGameHistory(Long userId, String gameType, String date) {
		return GameSaveRequestDto.builder()
			.userId(userId)
			.gameType(gameType)
			.date(date)
			.build();
	}

	private String convertDtoToJsonString(Object dto) {
		try {
			return new ObjectMapper().writeValueAsString(dto);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("Failed to convert Dto to JSON string", e);
		}
	}

}
