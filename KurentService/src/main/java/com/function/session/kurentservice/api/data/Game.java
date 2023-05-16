package com.function.session.kurentservice.api.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
@Table(name = "game")
public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "user_email")
	private String userEmail;

	@Column(name = "file_path")
	private String filePath;

	public Game(String userEmail) {
		this.userEmail = userEmail;
		this.filePath = null;
	}

	public Game(String userEmail, String filePath) {
		this.userEmail = userEmail;
		this.filePath = filePath;
	}

}
