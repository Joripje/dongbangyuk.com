package com.stat.dto;

import java.util.List;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class GameScoreResponseDto {

	private final String type;
	private final Long gameId;	// 게임 아이디
	private final int score;	// 게임 점수
	private final int endurance;	// 지구력
	private final int resilience;	// 회복 탄력성

	public GameScoreResponseDto(String type, Long gameId, List<Integer> scoreList) {
		this.type = type;
		this.gameId = gameId;
		this.score = scoreList.get(0);
		this.endurance = scoreList.get(1);
		this.resilience = scoreList.get(2);
	}

}
