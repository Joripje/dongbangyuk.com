package com.stat.domain.score;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GameScoreSaveRequestDto {

	private final String gameId;
	private final List<Double> scores;

}
