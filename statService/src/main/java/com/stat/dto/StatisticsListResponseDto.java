package com.stat.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class StatisticsListResponseDto {

	private final String type;
	private final Map<String, Integer> scores;

}
