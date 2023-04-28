package com.game.service;

import org.springframework.stereotype.Service;

import com.game.dto.FirebaseSaveRequestDto;
import com.game.utils.PhoneNumberUtils;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

@Service
public class FirebaseAuthService {

	public String getUidAfterCreateUser(FirebaseSaveRequestDto dto) throws FirebaseAuthException {
		String formattedPhoneNumber = PhoneNumberUtils.formatPhoneNumberWithCountryCode(dto.getPhoneNumber());

		UserRecord.CreateRequest request = new UserRecord.CreateRequest()
			.setEmail(dto.getEmail())
			.setPhoneNumber(formattedPhoneNumber)
			.setPassword(dto.getPassword())
			.setDisplayName(dto.getNickname());

		UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
		return userRecord.getUid();
	}

}
