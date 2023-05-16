package com.function.session.api.service;

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

	public String uploadVideo(MultipartFile file) throws IOException {
		return s3Service.uploadFileToS3(file);
	}

}
