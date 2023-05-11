package com.stat.domain.score;

import java.util.ArrayList;
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
public class GameScore {

	// 게임 종류 (cat, road, rotate, rps)
	private String type;

	// 게임 아이디를 기준으로 [게임 아이디, 점수, 지구력, 회탄성]
	private List<List<Integer>> scoreList;

	@Builder
	public GameScore(String type, List<List<Integer>> scoreList) {
		this.type = type;
		this.scoreList = scoreList != null ? scoreList : new ArrayList<>();
	}

}
