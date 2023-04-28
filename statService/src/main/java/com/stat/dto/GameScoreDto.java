package com.stat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GameScoreDto {

	int userId;
	String gameId;
	double score;

}
