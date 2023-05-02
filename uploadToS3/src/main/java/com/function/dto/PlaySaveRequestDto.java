package com.function.dto;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PlaySaveRequestDto {

	private final String type;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Seoul")
	private final Instant startTime;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Seoul")
	private final Instant endTime;
	private final String videoPath;

	@Builder
	public PlaySaveRequestDto(String type, Instant startTime, Instant endTime, String videoPath) {
		this.type = type;
		this.startTime = startTime;
		this.endTime = endTime;
		this.videoPath = videoPath;
	}

}
