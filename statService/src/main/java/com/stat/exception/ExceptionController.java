package com.stat.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;
import lombok.Setter;

@ControllerAdvice
public class ExceptionController {

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex) {
		ErrorResponse response = new ErrorResponse("UserNotFoundException", ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(GameTypeNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleGameTypeNotFoundException(GameTypeNotFoundException ex) {
		ErrorResponse response = new ErrorResponse("GameTypeNotFoundException", ex.getMessage());
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
	}

	@ExceptionHandler(InsufficientDataException.class)
	public ResponseEntity<ErrorResponse> handleInsufficientDataException(InsufficientDataException ex) {
		ErrorResponse response = new ErrorResponse("InsufficientDataException", ex.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	}

	@ExceptionHandler(Exception.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	public ErrorResponse handleInternalServerError(Exception ex) {
		return new ErrorResponse("INTERNAL_SERVER_ERROR", ex.getMessage() != null ? ex.getMessage() : "Unexpected error occurred");
	}

	@Getter
	@Setter
	public static class ErrorResponse {
		private String code;
		private String message;

		public ErrorResponse(String code, String message) {
			this.code = code;
			this.message = message;
		}
	}

}
