package com.game.api;

import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.game.domain.user.CustomUser;
import com.game.dto.UserSaveRequestDto;
import com.game.message.RegisterInfo;
import com.game.message.UserInfo;
import com.game.service.CustomUserService;
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
	private final CustomUserService userService;

	@ApiOperation(value = "토큰 추출해서 사용자 등록")
	@PostMapping
	public UserInfo register(@RequestHeader("Authorization") String authorization, @RequestBody RegisterInfo registerInfo) {
		FirebaseToken decodedToken;
		try {
			// Token 추출
			String token = RequestUtil.getAuthorizationToken(authorization);
			decodedToken = firebaseAuth.verifyIdToken(token);
		} catch (IllegalArgumentException | FirebaseAuthException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
				"{\"code\":\"INVALID_TOKEN\", \"message\":\"" + e.getMessage() + "\"}");
		}

		// 사용자 등록
		UserSaveRequestDto dto = UserSaveRequestDto.builder()
			.uid(decodedToken.getUid())
			.birthDate(registerInfo.getBirthDate())
			.build();

		CustomUser registeredUser = userService.createUser(dto);
		return new UserInfo(registeredUser);
	}

	@ApiOperation(value = "개인 정보 조회")
	@GetMapping("/myInfo")
	public UserInfo getMyInfo(Authentication authentication) {
		CustomUser customUser = ((CustomUser) authentication.getPrincipal());
		return new UserInfo(customUser);
	}

}
