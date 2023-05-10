package com.stat.domain.score;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.stat.dto.GameScoreSaveRequestDto;

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
	private List<Integer> scoreList;

	// 게임별 지구력 저장
	private List<Integer> enduranceList;

	// 게임별 회복탄력성 저장
	private List<Integer> resilienceList;

	// 마지막 업데이트 시간
	private LocalDateTime lastModified = LocalDateTime.now();

	@Builder
	public GameScore(String type, List<Integer> scoreList, List<Integer> enduranceList, List<Integer> resilienceList) {
		this.type = type;
		this.scoreList = scoreList != null ? scoreList : new ArrayList<>();
		this.enduranceList = enduranceList != null ? enduranceList : new ArrayList<>();
		this.resilienceList = resilienceList != null ? resilienceList : new ArrayList<>();
	}

	public GameScore(GameScoreSaveRequestDto dto) {
		this.type = dto.getType();
		this.scoreList = dto.getScoreList() != null ? dto.getScoreList() : new ArrayList<>();
		this.enduranceList = dto.getEnduranceList() != null ? dto.getEnduranceList() : new ArrayList<>();
		this.resilienceList = dto.getResilienceList() != null ? dto.getResilienceList() : new ArrayList<>();
	}

	public void updateLastModified() {
		this.lastModified = LocalDateTime.now();
	}

}
