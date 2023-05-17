package com.function.session.api.domain;

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

	@Column(name = "user_id")
	private Long userId;

	@Column(name = "file_path")
	private String filePath;

	@Column(name = "type")
	private String type;

	public Game(Long userId) {
		this.userId = userId;
		this.filePath = null;
		this.type = null;
	}

	public Game(Long userId, String filePath, String type) {
		this.userId = userId;
		this.filePath = filePath;
		this.type = null;
	}

	public void update(String filePath, String type) {
		this.filePath = filePath;
		this.type = type;
	}

}
