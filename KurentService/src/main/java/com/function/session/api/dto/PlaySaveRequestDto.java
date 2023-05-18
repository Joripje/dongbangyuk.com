package com.function.session.api.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import io.swagger.annotations.ApiModel;
import lombok.Getter;

@ApiModel(description = "게임 결과 데이터")
@Getter
public class PlaySaveRequestDto {

	@NotNull(message = "gameId must not be null")
	private final int gameId;

	@NotNull(message = "UserID must not be null")
	private final int userId;

	@NotNull(message = "GameType must not be null")
	private final String gameType;

	private final List<JsonNode> problems;

	@JsonCreator
	public PlaySaveRequestDto(
		@JsonProperty("gameId") String gameId,
		@JsonProperty("userId") int userId,
		@JsonProperty("gameType") String gameType,
		@JsonProperty("problems") List<JsonNode> problems) {
		this.gameId = Integer.parseInt(gameId);
		this.userId = userId;
		this.gameType = gameType;
		this.problems = problems;
	}

}
