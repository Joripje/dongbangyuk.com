package com.game.dto;

import lombok.Getter;

@Getter
public class FirebaseSaveRequestDto {

	private final String email;
	private final String phoneNumber;
	private final String password;
	private final String nickname;

	private FirebaseSaveRequestDto(String email, String phoneNumber, String password, String nickname) {
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.password = password;
		this.nickname = nickname;
	}

	public static FirebaseSaveRequestDto from(UserSaveRequestDto dto) {
		return new FirebaseSaveRequestDto(dto.getEmail(), dto.getPhoneNumber(), dto.getPassword(), dto.getNickname());
	}

}
