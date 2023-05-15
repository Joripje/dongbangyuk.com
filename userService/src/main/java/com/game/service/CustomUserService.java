package com.game.service;

import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

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

	@Transactional
	public String updateProfileImage(Long id) {
		CustomUser customUser = customUserRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 유저가 없어요."));

		System.out.println("============= updateProfileImage 호출 ==========");
		String birthDate = customUser.getBirthDate();
		String profilePath = sendProfileImageRequest(birthDate);

		customUser.updateProfileImage(profilePath);
		System.out.println("customUser: " + customUser.toString());

		return customUser.toString();
	}

	private String sendProfileImageRequest(String birthDate) {
		System.out.println("============= sendProfileImageRequest 호출 =============");
		String url = "https://k8a305.p.ssafy.io/profile/?birth=" + birthDate;

		System.out.println("url: " + url);
		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, null, String.class);

		System.out.println("response.getBody(): " + response.getBody());
		return response.getBody();
	}

}
