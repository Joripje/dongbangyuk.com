package com.function.dto;

import java.util.List;

import com.fasterxml.jackson.databind.JsonNode;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;

@ApiModel(description = "채점 요청 데이터")
@Getter
public class GradingRequestDto {

	private final Long gameId;
	private final Long userId;
	private final String gameType;
	private final List<JsonNode> problems;

	@Builder
	public GradingRequestDto(Long gameId, PlaySaveRequestDto requestDto) {
		this.gameId = gameId;
		this.userId = requestDto.getUserId();
		this.gameType = requestDto.getGameType();
		this.problems = requestDto.getProblems();
	}

}
