package com.stat.domain.score;

import java.time.LocalDateTime;
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

	// 게임 종류 (cat, road, rotate, rps)
	private String type;
	
	// 게임별 점수 히스토리 저장
	private List<Integer> scores;
	
	// 마지막 업데이트 시간
	private LocalDateTime lastModified = LocalDateTime.now();

	@Builder
	public GameScore(String type, List<Integer> scores) {
		this.type = type;
		this.scores = scores != null ? scores : new ArrayList<>();
	}

	public GameScore(GameScoreSaveRequestDto dto) {
		this.type = dto.getType();
		this.scores = dto.getScores() != null ? dto.getScores() : new ArrayList<>();
	}

	public void updateLastModified() {
		this.lastModified = LocalDateTime.now();
	}

}
