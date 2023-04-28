package com.game.message;

import com.game.domain.user.CustomUser;

import lombok.Data;

@Data
public class UserInfo {

	private String uid;

	public UserInfo(CustomUser customUser) {
		this.uid = customUser.getUid();
	}
}
