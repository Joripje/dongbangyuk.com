package com.stat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GameScoreDto {

	int userId;
	String type;

	int score;	// 게임 점수
	int endurance;	// 지구력
	int resilience;	// 회복 탄력성

}
