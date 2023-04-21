package com.function.service;

import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UploadService {

	private final S3Service s3Service;

	public void uploadImage(MultipartFile file) throws IOException {
		String filePath = s3Service.uploadFileToS3(file);
		System.out.println("파일 업로드 성공: " + filePath);
	}

}
