package com.game.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSaveRequestDto {

	private final String email;
	private final String password;
	private final int feature;
	private final String birthDate;

}
