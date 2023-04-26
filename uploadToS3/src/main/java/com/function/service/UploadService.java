package com.function.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UploadService {

	private final S3Service s3Service;

	public void uploadVideo(MultipartFile file) throws IOException {
		String filePath = s3Service.uploadFileToS3(file);
		log.info("파일 업로드 성공: " + filePath);
	}

}
