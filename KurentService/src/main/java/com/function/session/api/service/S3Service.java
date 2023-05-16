package com.function.session.api.service;

import java.io.IOException;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3Service {

	private final AmazonS3 s3Client;

	@Value("${S3_BUCKET}")
	private String bucketName;

	private final Function<MultipartFile, String> generateFileName =
		file -> "videos/" + file.getOriginalFilename();

	public String uploadFileToS3(MultipartFile file) throws IOException {
		String fileName = generateFileName.apply(file);
		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType("video/webm");
		s3Client.putObject(bucketName, fileName, file.getInputStream(), objectMetadata);
		return fileName;
	}

}