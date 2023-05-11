package com.stat.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class GameScoreResponseDto {

	private final String type;
	private final int gameId;	// 게임 아이디
	private final int score;	// 게임 점수
	private final int endurance;	// 지구력
	private final int resilience;	// 회복 탄력성

	public GameScoreResponseDto(String type, List<Integer> scoreList) {
		this.type = type;
		this.gameId = scoreList.get(0);
		this.score = scoreList.get(1);
		this.endurance = scoreList.get(2);
		this.resilience = scoreList.get(3);
	}

}
