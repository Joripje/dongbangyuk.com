package com.stat.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameResult;
import com.stat.domain.score.ScoreArchive;
import com.stat.domain.score.ScoreArchiveRepository;
import com.stat.dto.GameScoreDto;
import com.stat.dto.GameScoreResponseDto;
import com.stat.exception.GameTypeNotFoundException;
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
					.gameIds(new ArrayList<>())
					.build());

		System.out.println("====== scoreArchive 1: " + scoreArchive.toString() + "=====");
		List<GameResult> resultList = scoreArchive.getResultList();
		resultList.add(0, new GameResult(gameScoreDto.getGameId(), gameScoreDto.getDate(), newScore));
		scoreArchive.getGameIds().add(0, gameScoreDto.getGameId());
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

	@Transactional(readOnly = true)
	public List<GameScoreResponseDto> findGameIdsByUserId(int userId) {
		List<ScoreArchive> scoreArchiveList = findByUserId(userId);
		List<Integer> gameIds = new ArrayList<>();
		List<GameScoreResponseDto> answer = new ArrayList<>();

		for (ScoreArchive scoreArchive : scoreArchiveList) {
			gameIds.addAll(scoreArchive.getGameIds());
		}

		System.out.println("gameIds = " + gameIds);

		for (int gameId : gameIds) {
			answer.add(getGameInformationByUserIdAndGameId(userId, gameId));
		}
		return answer;
	}

	@Transactional(readOnly = true)
	public List<GameScoreResponseDto> findGameIdsByUserIdAndGameType(int userId, String type) {
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserIdAndGameType(userId, type)
			.orElseThrow(() -> new GameTypeNotFoundException("해당 게임에 대한 기록이 없어요."));
		List<Integer> gameIds = scoreArchive.getGameIds();

		List<GameScoreResponseDto> answer = new ArrayList<>();

		System.out.println("gameIds = " + gameIds);

		for (int gameId : gameIds) {
			answer.add(getGameInformationByUserIdAndGameId(userId, gameId));
		}
		return answer;
	}

	public GameScoreResponseDto getGameInformationByUserIdAndGameId(int userId, int gameId) {
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserIdAndGameId(userId, gameId);

		if (scoreArchive != null) {
			GameScoreResponseDto dto;

			List<GameResult> resultList = scoreArchive.getResultList();
			GameResult gameResult = resultList.stream()
				.filter(result -> result.getGameId() == gameId)
				.findFirst()
				.orElse(null);

			if (gameResult != null) {
				String type = scoreArchive.getGameType();
				List<Integer> scoreList = gameResult.getScoreList();

				dto = new GameScoreResponseDto(type, gameId, scoreList);
				System.out.println("dto = " + dto);
				return dto;
			} else {
				System.out.println("Game not found for the given userId and gameId.");
				return null;

			}
		} else {
			System.out.println("No document found for the given userId and gameId.");
			return null;

		}
	}
}