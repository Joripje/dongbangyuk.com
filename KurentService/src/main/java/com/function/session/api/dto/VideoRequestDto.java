package com.function.session.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class VideoRequestDto {

	private Long gameId;
	private String videoPath;
	private String gameType;

}
