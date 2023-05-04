package com.game.api;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.game.domain.user.CustomUser;
import com.game.message.RegisterInfo;
import com.game.message.UserInfo;
import com.game.service.CustomUserService;
import com.game.utils.RequestUtil;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "https://k8a305.p.ssafy.io")
public class UserController {

	private final FirebaseAuth firebaseAuth;
	private final CustomUserService userService;

	@ApiOperation(value = "토큰 추출해서 사용자 등록")
	@PostMapping
	public UserInfo register(@RequestHeader("Authorization") String authorization,
		@RequestBody RegisterInfo registerInfo) {
		FirebaseToken decodedToken;
		try {
			// Token 추출
			String token = RequestUtil.getAuthorizationToken(authorization);
			decodedToken = firebaseAuth.verifyIdToken(token);
		} catch (IllegalArgumentException | FirebaseAuthException e) {
			throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
				"{\"code\":\"INVALID_TOKEN\", \"message\":\"" + e.getMessage() + "\"}");
		}
		CustomUser registeredUser = userService.createUser(
			decodedToken.getUid(), registerInfo.getBirthDate()
		);
		return new UserInfo(registeredUser);
	}

	@ApiOperation(value = "개인 정보 조회")
	@GetMapping("/myInfo")
	public UserInfo getMyInfo(Authentication authentication) {
		CustomUser customUser = ((CustomUser)authentication.getPrincipal());
		return new UserInfo(customUser);
	}

}
