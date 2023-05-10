package com.stat.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GameScoreSaveRequestDto {

	private final String type;
	private final List<Integer> scoreList;
	private final List<Integer> enduranceList;
	private final List<Integer> resilienceList;

}
