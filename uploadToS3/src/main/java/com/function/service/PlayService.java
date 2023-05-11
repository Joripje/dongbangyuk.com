package com.function.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.domain.Play;
import com.function.domain.PlayRepository;
import com.function.dto.GameSaveRequestDto;
import com.function.dto.PlayListResponseDto;
import com.function.exception.PlayNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlayService {

	private final PlayRepository playRepository;

	@Transactional
	public Long save(GameSaveRequestDto requestDto) {

		// TODO: user Validation 추가
		// var user = userRepository.findById(requestDto.getUserId())
		// 	.orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

		return playRepository.save(new Play(requestDto)).getId();
	}

	@Transactional(readOnly = true)
	public List<PlayListResponseDto> findByUserId(Long userId) {
		List<Play> plays = playRepository.findByUserId(userId);

		if (plays.isEmpty()) {
			throw new PlayNotFoundException(String.format("해당 유저(%s)에 대한 게임 기록이 없습니다.", userId));
		}
		return plays.stream()
			.map(PlayListResponseDto::new)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public PlayListResponseDto findById(Long id) {
		var play = playRepository.findById(id)
			.orElseThrow(() -> new PlayNotFoundException(String.format("해당 기록(id: %d)이 존재하지 않습니다.", id)));
		return new PlayListResponseDto(play);
	}

}
