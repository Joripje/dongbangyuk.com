package com.function.dto;

import lombok.Getter;

@Getter
public class VideoUploadRequestDto {

	private final String fileName;

	public VideoUploadRequestDto(GameSaveRequestDto dto) {
		this.fileName = "videos/" + dto.getUserId() + "_" + dto.getStartTime() + "_" + dto.getEndTime() + "_" + "record.webm";
	}

}
