package com.stat.domain.statistics;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StatisticsSaveRequestDto {

	private final String type;
	private final int score;

}
