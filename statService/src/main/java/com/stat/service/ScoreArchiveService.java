package com.stat.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
		System.out.println();
		System.out.println("==================== findGameIdsByUserId 호출 ===================");
		List<ScoreArchive> scoreArchiveList = findByUserId(userId);
		List<Integer> gameIds = new ArrayList<>();
		List<GameScoreResponseDto> answer = new ArrayList<>();

		System.out.println("scoreArchiveList = " + scoreArchiveList.toString());
		System.out.println("userId 에 대한 게임 결과 개수 = " + scoreArchiveList.size());

		for (ScoreArchive scoreArchive : scoreArchiveList) {

			List<GameResult> resultList = scoreArchive.getResultList();
			System.out.println("resultList = " + resultList.toString());

			for (GameResult gameResult : resultList) {
				System.out.println("[resultList] " + gameResult.toString());
				answer.add(getGameInformationByUserIdAndGameId(userId, gameResult.getGameId()));
				System.out.println(getGameInformationByUserIdAndGameId(userId, gameResult.getGameId()));
			}
		}
		System.out.println("answer.toString() = " + answer.toString());
		System.out.println("gameIds = " + gameIds);

		return answer;
	}

	@Transactional(readOnly = true)
	public List<GameScoreResponseDto> findGameIdsByUserIdAndGameType(int userId, String type) {
		System.out.println("findGameIdsByUserIdAndGameType 호출");
		
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserIdAndGameType(userId, type)
			.orElseThrow(() -> new GameTypeNotFoundException("해당 게임에 대한 기록이 없어요."));

		List<GameResult> resultList = scoreArchive.getResultList();

		List<GameScoreResponseDto> answer = new ArrayList<>();
		for (GameResult gameResult : resultList) {
			answer.add(getGameInformationByUserIdAndGameId(userId, gameResult.getGameId()));
		}

		return answer;
	}

	@Transactional(readOnly = true)
	public GameScoreResponseDto getGameInformationByUserIdAndGameId(int userId, int gameId) {
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserIdAndResultListGameId(userId, gameId);

		if (scoreArchive == null) {
			throw new GameTypeNotFoundException("해당하는 데이터가 없어요");
		}

		GameScoreResponseDto dto;

		GameResult results = scoreArchive.getResultList().stream()
			.filter(result -> result.getGameId() == gameId)
			.findFirst()
			.orElse(null);

		System.out.println("[3] resultList = " + results.toString());
		// return results;
		if (results != null) {
			String type = scoreArchive.getGameType();
			List<Integer> scoreList = results.getScoreList();

			dto = new GameScoreResponseDto(type, gameId, scoreList);
			System.out.println("dto = " + dto);
			return dto;
		} else {
			System.out.println("Game not found for the given userId and gameId.");
			return null;

		}

	}
}