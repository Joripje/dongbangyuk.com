package com.function.api;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.function.dto.GameSaveRequestDto;
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
	private final KafkaController kafkaController;

	@ApiOperation(value = "S3에 영상 업로드")

	@PostMapping("/upload")
	public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) throws IOException {
		uploadService.uploadVideo(file);
		return ResponseEntity.ok("Video upload successful!");
	}

	@ApiOperation(value = "게임 기록 저장")
	@PostMapping(value = "/recordPlay")
	public ResponseEntity<Long> saveGameHistory(@RequestBody GameSaveRequestDto dto) {
		// 나중에 [userId]_[timestamp] 조합한 파일명 가져오기
		return ResponseEntity.ok(playService.save(dto));
	}

	@ApiOperation(value = "테스트용 컨트롤러")
	@GetMapping("/hello")
	public void hello() {
		log.info("hello 호출");
		// 나중에 [userId]_[timestamp] 조합한 파일명 가져오기
		kafkaController.publish("test");
		log.info("publish도 호출");
		// return ResponseEntity.ok(playService.save(dto));
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
