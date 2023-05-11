package com.function.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {

	private String errorCode;

	public UserNotFoundException(String message) {
		super(message);
		this.errorCode = "USER_NOT_FOUND";
	}

}
