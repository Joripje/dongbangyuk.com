package com.game.service;

import org.springframework.stereotype.Service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FirebaseAuthService {

	public String getUidAfterCreateUser(String email, String password) throws FirebaseAuthException {
		UserRecord.CreateRequest request = new UserRecord.CreateRequest()
			.setEmail(email)
			.setPassword(password)
			.setDisabled(false);

		UserRecord userRecord = FirebaseAuth.getInstance().createUser(request);
		return userRecord.getUid();
	}

}
