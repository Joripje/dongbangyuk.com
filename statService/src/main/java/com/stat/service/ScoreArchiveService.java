package com.stat.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameResult;
import com.stat.domain.score.ScoreArchive;
import com.stat.domain.score.ScoreArchiveRepository;
import com.stat.dto.AbilityResponseDto;
import com.stat.dto.GameScoreDto;
import com.stat.dto.GameScoreResponseDto;
import com.stat.dto.UserHistoryResponseDto;
import com.stat.exception.InsufficientDataException;
import com.stat.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScoreArchiveService {

	private final ScoreArchiveRepository scoreArchiveRepository;

	/**
	 * 게임 기록 저장
	 */
	@Transactional
	public ScoreArchive saveGameScore(GameScoreDto gameScoreDto) {
		List<Integer> newScore = List.of(
			gameScoreDto.getScore(),
			gameScoreDto.getEndurance(),
			gameScoreDto.getResilience()
		);

		// userId 와 gameType 에 해당하는 ScoreArchive 가져오기
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserIdAndGameType(gameScoreDto.getUserId(),
				gameScoreDto.getType())
			.orElseGet(
				() -> ScoreArchive.builder()
					.userId(gameScoreDto.getUserId())
					.gameType(gameScoreDto.getType())
					.resultList(new ArrayList<>())
					.build());

		System.out.println("====== scoreArchive 1: " + scoreArchive.toString() + "=====");
		List<GameResult> resultList = scoreArchive.getResultList();
		resultList.add(0, new GameResult(gameScoreDto.getGameId(), gameScoreDto.getDate(), newScore));
		System.out.println("====== scoreArchive 2: " + scoreArchive.toString() + "=====");

		return scoreArchiveRepository.save(scoreArchive);
	}

	/**
	 * 유저의 모든 게임 기록 가져오기
	 */
	@Transactional(readOnly = true)
	public List<ScoreArchive> findByUserId(int userId) {
		List<ScoreArchive> scoreArchiveList = scoreArchiveRepository.findByUserId(userId);

		if (scoreArchiveList.size() == 0) {
			throw new UserNotFoundException(String.format("해당 사용자 (%s)에 대한 게임 기록이 없습니다.", userId));
		}

		return scoreArchiveList;
	}

}