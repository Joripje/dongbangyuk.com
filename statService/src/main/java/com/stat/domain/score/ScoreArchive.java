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

