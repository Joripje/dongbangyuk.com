package com.function.session.kurentservice.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.session.kurentservice.api.data.Game;
import com.function.session.kurentservice.api.data.GameRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GameService {

	private final GameRepository gameRepository;

	// 게임 기록 저장
	@Transactional
	public Long save(Game game) {
		return gameRepository.save(game).getId();
	}

	// gameId(pk)로 조회
	@Transactional(readOnly = true)
	public Game findById(Long id) {
		return gameRepository.findById(id)
			.orElseThrow(() -> new IllegalArgumentException(id + "에 해당하는 게임 기록이 없어요."));
	}

	// userId로 조회
	@Transactional(readOnly = true)
	public List<Game> findByUserEmail(String userEmail) {
		return gameRepository.findByUserEmail(userEmail);
	}

}
