package com.game.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSaveRequestDto {

	private final String uid;
	private final String birthDate;

}
