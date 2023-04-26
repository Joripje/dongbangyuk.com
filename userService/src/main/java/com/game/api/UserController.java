package com.game.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.game.domain.user.User;
import com.game.service.FirebaseAuthService;
import com.game.service.UserService;
import com.google.firebase.auth.FirebaseAuthException;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	private final FirebaseAuthService firebaseAuthService;

	@PostMapping
	public ResponseEntity<User> createUser(@RequestHeader("Authorization") String token,
		@RequestParam String birthDate,
		@RequestParam int feature) {
		String uid = null;

		try {
			uid = firebaseAuthService.getUid(token);
		} catch (FirebaseAuthException e) {
			throw new RuntimeException(e);
		}
		User user = userService.createUser(uid, birthDate, feature);
		return new ResponseEntity<>(user, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
		User user = userService.getUserById(id);
		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping
	public ResponseEntity<User> getUserByUid(@RequestHeader("Authorization") String token) {
		try {
			String uid = firebaseAuthService.getUid(token);
			User user = userService.getUserByUid(uid);
			if (user != null) {
				return new ResponseEntity<>(user, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		} catch (FirebaseAuthException e) {
			return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		}
	}

}
