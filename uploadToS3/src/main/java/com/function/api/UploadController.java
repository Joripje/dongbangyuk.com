package com.function.api;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.function.dto.GameSaveRequestDto;
import com.function.dto.VideoUploadRequestDto;
import com.function.service.UploadService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class UploadController {

	private final UploadService uploadService;

	// @ApiOperation(value = "영상 업로드")
	// @PostMapping("/upload")
	// public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) throws IOException {
	// 	uploadService.uploadVideo(file);
	// 	return ResponseEntity.ok("Video upload successful!");
	// }

	@ApiOperation(value = "영상 업로드")
	@PostMapping(value = "/upload"
		, consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<?> uploadVideo(
		@RequestPart("request") GameSaveRequestDto dto,
		@RequestPart("file") MultipartFile file
		) throws IOException {
		String fileName = uploadService.uploadVideo(file, new VideoUploadRequestDto(dto));
		System.out.println("fileName: " + fileName);
		return ResponseEntity.ok("Video upload successful!");
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
