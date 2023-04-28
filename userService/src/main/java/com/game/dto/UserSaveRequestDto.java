package com.game.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSaveRequestDto {

	private final String uid;
	private final String email;
	private final String phoneNumber;
	private final String password;
	private final String nickname;
	private final int feature;
	private final String birthDate;

}
