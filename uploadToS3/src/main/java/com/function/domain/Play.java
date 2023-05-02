package com.function.domain;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.function.dto.GameSaveRequestDto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_game")
public class Play {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "game_id")
	private Long id;

	@Column(name = "user_id")
	private Long userId;

	@Column(name = "type")
	private String type;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Seoul")
	@Column(name = "start_time")
	private Instant startTime;

	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "Asia/Seoul")
	@Column(name = "end_time")
	private Instant endTime;

	// @Column(name = "video_path")
	// private String videoPath;

	@Builder
	public Play(GameSaveRequestDto requestDto) {
		this.userId = requestDto.getUserId();
		this.type = requestDto.getType();
		this.startTime = requestDto.getStartTime();
		this.endTime = requestDto.getEndTime();
	}

}
