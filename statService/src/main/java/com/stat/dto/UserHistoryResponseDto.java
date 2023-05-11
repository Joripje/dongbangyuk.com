package com.stat.dto;

import java.util.List;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserHistoryResponseDto {

	private Map<String, Integer> gameCounts;
	private List<List<Integer>> gameScoreList;

}
