package com.stat.domain.score;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "score_archive")
public class ScoreArchive {

	@Id
	private ObjectId id;
	private int userId;
	private String gameType;	// 게임 종류 (cat, road, rotate, rps)
	private List<GameResult> resultList = new ArrayList<>();

	@Builder
	public ScoreArchive(int userId, String gameType, List<GameResult> resultList) {
		this.userId = userId;
		this.gameType = gameType;
		this.resultList = resultList;
	}

}
