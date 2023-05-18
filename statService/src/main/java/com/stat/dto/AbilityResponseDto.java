package com.stat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class AbilityResponseDto {

	private final int catScore;
	private final int roadScore;
	private final int rotateScore;
	private final int rpsScore;
	private final int enduranceAvg;
	private final int resilienceAvg;

}
