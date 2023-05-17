package com.function.session.api.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class VideoRequestDto {

	@JsonProperty("gameid")
	private Long gameId;

	@JsonProperty("videopath")
	private String videoPath;

	@JsonProperty("game_type")
	private String gameType;

}
