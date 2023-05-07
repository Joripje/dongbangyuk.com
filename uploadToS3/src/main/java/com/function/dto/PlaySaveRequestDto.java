package com.function.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.databind.JsonNode;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@ApiModel(description = "게임 결과 데이터")
@Getter
public class PlaySaveRequestDto {

	@NotNull(message = "UserID must not be null")
	private final Long userId;

	@NotNull(message = "Date must not be null")
	private final String date;

	@NotNull(message = "GameType must not be null")
	private final String gameType;

	private final List<JsonNode> problems;
	private Long gameId = 0L;

	@Builder
	public PlaySaveRequestDto(Long userId, String date, String gameType, List<JsonNode> problems) {
		this.userId = userId;
		this.date = date;
		this.gameType = gameType;
		this.problems = problems;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}

}
