package com.stat.domain.score;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "score_archive")
public class ScoreArchive {

	// 유저 고유 키 <- 이를 기준으로 데이터 쌓임
	@Id
	private int userId;
	
	// 유저의 모든 게임 점수들
	private List<GameScore> gameScores = new ArrayList<>();

	@Builder
	public ScoreArchive(int userId, List<GameScore> gameScores) {
		this.userId = userId;
		this.gameScores = gameScores != null ? gameScores : new ArrayList<>();
	}

	public void addGameScore(GameScore gameScore) {
		gameScores.add(gameScore);
	}

}

