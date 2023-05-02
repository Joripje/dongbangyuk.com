package com.function.dto;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.function.domain.Play;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PlayListResponseDto {

	private final Long id;
	private final Long userId;
	private final String type;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Seoul")
	private final Instant startTime;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Seoul")
	private final Instant endTime;

	@Builder
	public PlayListResponseDto(Play entity) {
		this.id = entity.getId();
		this.userId = entity.getUserId();
		this.type = entity.getType();
		this.startTime = entity.getStartTime();
		this.endTime = entity.getEndTime();
	}

}
