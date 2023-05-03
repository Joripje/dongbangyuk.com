package com.game.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.game.domain.user.CustomUser;
import com.game.domain.user.CustomUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserService implements UserDetailsService {

	private final CustomUserRepository customUserRepository;

	@Override
	public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
		return customUserRepository.findByUid(uid).get();
	}

	@Transactional
	public CustomUser createUser(String uid, String birthDate) {
		CustomUser customUser = new CustomUser(uid, birthDate);
		customUserRepository.save(customUser);
		return customUser;
	}

}
