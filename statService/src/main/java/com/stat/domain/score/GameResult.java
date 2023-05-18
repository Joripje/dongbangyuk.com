package com.stat.domain.score;

import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class GameResult {

	private int gameId;
	private String date;

	// 게임 아이디를 기준으로 [게임 아이디, 점수, 지구력, 회탄성]
	private List<Integer> scoreList;

	@Builder
	public GameResult(int gameId, String date, List<Integer> scoreList) {
		this.gameId = gameId;
		this.date = date;
		this.scoreList = scoreList;
	}

}
