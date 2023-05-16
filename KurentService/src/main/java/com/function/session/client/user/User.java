package com.function.session.client.user;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class User {

	private Long id;
	private String uid;
	private String birthDate;
	private String profilePath;
	private Boolean isDeleted;
}
