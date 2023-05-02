package com.function.service;

import java.io.IOException;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.function.dto.VideoUploadRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class S3Service {

	private final AmazonS3 s3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	public String uploadFileToS3(MultipartFile file, VideoUploadRequestDto requestDto) throws IOException {
		// Input validation checks
		Objects.requireNonNull(file, "File cannot be null");
		Objects.requireNonNull(requestDto, "VideoUploadRequestDto cannot be null");

		ObjectMetadata objectMetadata = new ObjectMetadata();
		objectMetadata.setContentType("video/webm");

		String fileName = requestDto.getFileName();
		try {
			PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, fileName,
				file.getInputStream(), objectMetadata);
			s3Client.putObject(putObjectRequest);
		} catch (SdkClientException | IOException e) {
			throw new IOException("Failed to upload file to S3: " + e.getMessage());
		}
		return fileName;
	}

}