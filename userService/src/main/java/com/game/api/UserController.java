package com.game.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.game.domain.user.CustomUser;
import com.game.dto.UserSaveRequestDto;
import com.game.message.RegisterInfo;
import com.game.message.UserInfo;
import com.game.service.UserService;
import com.game.utils.RequestUtil;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

	private final FirebaseAuth firebaseAuth;
	private final UserService userService;

	@PostMapping
	public UserInfo register(@RequestHeader("Authorization") String authorization, @RequestBody RegisterInfo registerInfo) {
		FirebaseToken decodedToken;
		try {
			String token = RequestUtil.getAuthorizationToken(authorization);
			decodedToken = firebaseAuth.verifyIdToken(token);
		} catch (IllegalArgumentException | FirebaseAuthException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
				"{\"code\":\"INVALID_TOKEN\", \"message\":\"" + e.getMessage() + "\"}");
		}
		UserSaveRequestDto dto = UserSaveRequestDto.builder()
			.uid(decodedToken.getUid())
			.email(decodedToken.getEmail())
			.nickname(registerInfo.getNickname())
			.build();

		// 사용자를 등록한다.
		CustomUser registeredUser = userService.createUser(dto);
		return new UserInfo(registeredUser);
	}

}
