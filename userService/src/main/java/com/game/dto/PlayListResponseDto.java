package com.game.dto;

import java.time.LocalDateTime;

import com.game.domain.play.Play;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PlayListResponseDto {

	private final Long id;
	private final LocalDateTime date;
	private final String type;

	@Builder
	public PlayListResponseDto(Play entity) {
		this.id = entity.getId();
		this.date = entity.getDate();
		this.type = entity.getType();
	}

}
