package com.function.session.api.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.function.session.api.domain.Game;
import com.function.session.api.domain.GameRepository;
import com.function.session.client.user.UserServiceClient;

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
	public List<Game> findByUserId(Long userId) {
		return gameRepository.findByUserId(userId);
	}

}
