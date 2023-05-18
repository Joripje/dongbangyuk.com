package com.stat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GameScoreSaveRequestDto {

	private final String type;
	private final int gameId;
	private final int score;
	private final int endurance;
	private final int resilience;

}
