package com.function.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class PlayNotFoundException extends RuntimeException {

	private String errorCode;

	public PlayNotFoundException(String message) {
		super(message);
		this.errorCode = "PLAY_NOT_FOUND";
	}

}
