package com.game.service;

import org.springframework.stereotype.Service;

import com.game.domain.user.User;
import com.game.domain.user.UserRepository;
import com.google.firebase.FirebaseApp;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {

	private final FirebaseApp firebaseApp;
	private final UserRepository userRepository;

	public User createUser(String uid, String birthDate, int feature) {
		User user = new User(uid, birthDate, feature);
		return userRepository.save(user);
	}

	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

	public User getUserByUid(String uid) {
		return userRepository.findByUid(uid).orElse(null);
	}

}
