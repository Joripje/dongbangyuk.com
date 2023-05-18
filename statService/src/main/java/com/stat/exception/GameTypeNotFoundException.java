package com.stat.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class GameTypeNotFoundException extends RuntimeException {

	private String errorCode;

	public GameTypeNotFoundException(String message) {
		super(message);
		this.errorCode = "GAME_TYPE_NOT_FOUND";
	}

}
