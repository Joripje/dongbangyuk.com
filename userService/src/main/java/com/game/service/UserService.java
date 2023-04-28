package com.game.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.game.domain.user.CustomUser;
import com.game.domain.user.UserRepository;
import com.game.dto.UserSaveRequestDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

	private final UserRepository userRepository;
	// private final FirebaseAuthService firebaseAuthService;

	@Override
	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
		return userRepository.findByUid(uid).get();
	}

	@Transactional
	public CustomUser createUser(UserSaveRequestDto dto) {
		CustomUser customUser = CustomUser.builder()
			.uid(dto.getUid())
			.birthDate(dto.getBirthDate())
			.feature(dto.getFeature())
			.build();

		userRepository.save(customUser);
		return customUser;
	}

}
