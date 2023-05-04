package com.function.dto;

import com.function.domain.Play;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PlayListResponseDto {

	private final Long id;
	private final Long userId;
	private final String type;
	private final String date;

	@Builder
	public PlayListResponseDto(Play entity) {
		this.id = entity.getId();
		this.userId = entity.getUserId();
		this.type = entity.getType();
		this.date = entity.getDate();
	}

}
