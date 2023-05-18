package com.stat.domain.statistics;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.persistence.Id;

import org.bson.types.ObjectId;
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
@Document(collection = "statistics")
public class Statistics {

	@Id
	private ObjectId id;
	private String type;

	// 게임별 모든 사람들의 점수 저장
	private List<Integer> scores = new ArrayList<>();

	@Builder
	public Statistics(String type, List<Integer> scores) {
		this.type = type;
		this.scores = scores != null ? scores : new ArrayList<>();
	}

	public void updateScores(List<Integer> scores) {
		this.scores = scores;
	}

	// TODO: 구간 기준 적용 및 변수명 수정
	public Map<String, Integer> calculateScoreLevels() {
		Map<String, Integer> levelCounts = new TreeMap<>();
		levelCounts.put("level1", 0);
		levelCounts.put("level2", 0);
		levelCounts.put("level3", 0);
		levelCounts.put("level4", 0);
		levelCounts.put("level5", 0);

		for (Integer score : scores) {
			if (score == 1) {
				levelCounts.put("level1", levelCounts.get("level1") + 1);
			} else if (score == 2) {
				levelCounts.put("level2", levelCounts.get("level2") + 1);
			} else if (score == 3) {
				levelCounts.put("level3", levelCounts.get("level3") + 1);
			} else if (score == 4) {
				levelCounts.put("level4", levelCounts.get("level4") + 1);
			} else if (score == 5) {
				levelCounts.put("level5", levelCounts.get("level5") + 1);
			}
		}
		return levelCounts;
	}

}
