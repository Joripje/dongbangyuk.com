package com.function.session.api.dto;

import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;

import io.swagger.annotations.ApiModel;
import lombok.Getter;

@ApiModel(description = "가위바위보 결과 데이터")
@Getter
public class RpsSaveRequestDto {

	@NotNull(message = "gameId must not be null")
	private final Long gameId;

	@NotNull(message = "UserID must not be null")
	private Long userId;

	@NotNull(message = "GameType must not be null")
	private final String gameType;

	@NotNull(message = "Date must not be null")
	private final String date;

	private final JsonNode rounds;

	@JsonCreator
	public RpsSaveRequestDto(
		@JsonProperty("gameId") String gameId,
		@JsonProperty("userId") String userId,
		@JsonProperty("date") String date,
		@JsonProperty("gameType") String gameType,
		@JsonProperty("rounds") JsonNode rounds) {
		this.gameId = Long.parseLong(gameId);
		this.date = date;
		// this.userId = userId;
		this.gameType = gameType;
		this.rounds = rounds;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

}
