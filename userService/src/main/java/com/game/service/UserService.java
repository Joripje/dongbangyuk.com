package com.game.service;

import org.springframework.stereotype.Service;

import com.game.domain.user.User;
import com.game.domain.user.UserRepository;
import com.game.dto.FirebaseSaveRequestDto;
import com.game.dto.UserSaveRequestDto;
import com.google.firebase.auth.FirebaseAuthException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final FirebaseAuthService firebaseAuthService;

	public Long createUser(UserSaveRequestDto dto) throws FirebaseAuthException {
		String uid = firebaseAuthService.getUidAfterCreateUser(FirebaseSaveRequestDto.from(dto));

		User user = User.builder()
			.uid(uid)
			.birthDate(dto.getBirthDate())
			.feature(dto.getFeature())
			.build();
		return userRepository.save(user).getId();
	}

	public User getUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

}
