package com.stat.exception;

public class InsufficientDataException extends RuntimeException {

	private String errorCode;

	public InsufficientDataException(String message) {
		super(message);
		this.errorCode = "INSUFFICIENT_GAME_DATA";
	}

}