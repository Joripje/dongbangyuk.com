package com.function.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GameSaveRequestDto {

	private Long userId;
	private String date;
	private String gameType;

}
