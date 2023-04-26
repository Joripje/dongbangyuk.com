package com.game.dto;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PlaySaveRequestDto {

	private LocalDateTime date;
	private String type;
	private Long userId;

	@Builder
	public PlaySaveRequestDto(String date, String type, Long userId) {
		this.date = parseDate(date);
		this.type = type;
		this.userId = userId;
	}

	private LocalDateTime parseDate(String date) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		return LocalDateTime.parse(date, formatter);
	}

}
