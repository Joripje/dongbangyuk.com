package com.stat.domain.score;

import java.util.ArrayList;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@ToString
public class GameScore {

	private String gameId;
	private List<Double> scores;

	@Builder
	public GameScore(String gameId, List<Double> scores) {
		this.gameId = gameId;
		this.scores = scores != null ? scores : new ArrayList<>();
	}

	public GameScore(GameScoreSaveRequestDto dto) {
		this.gameId = dto.getGameId();
		this.scores = dto.getScores() != null ? dto.getScores() : new ArrayList<>();
	}

}
