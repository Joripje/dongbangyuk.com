package com.function.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.domain.Play;
import com.function.domain.PlayRepository;
import com.function.dto.GameSaveRequestDto;
import com.function.dto.PlayListResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PlayService {

	// private final UserRepository userRepository;
	private final PlayRepository playRepository;

	@Transactional
	public Long save(Long userId, GameSaveRequestDto requestDto, String filePath) {
		// var user = userRepository.findById(requestDto.getUserId())
		// 	.orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));

		return playRepository.save(new Play(userId, requestDto, filePath)).getId();
	}

	@Transactional(readOnly = true)
	public List<PlayListResponseDto> findByUserId(Long userId) {
		return playRepository.findByUserId(userId).stream()
			.map(PlayListResponseDto::new)
			.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public PlayListResponseDto findById(Long id) {
		var play = playRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException("해당 기록이 존재하지 않습니다."));
		return new PlayListResponseDto(play);
	}

}
