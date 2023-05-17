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

	/**
	 * 유저 응시 게임 기록 가져오기 : 게임별 최신 점수 + 지구력 평균 + 회복탄력성 평균
	 */
	public UserHistoryResponseDto getUserHistory(int userId) {
		List<ScoreArchive> scoreArchives = scoreArchiveRepository.findByUserId(userId);

		if (scoreArchives.size() == 0) {
			throw new UserNotFoundException(String.format("%s 님의 게임 응시 내역이 없어요.", userId));
		}

		// 최신 게임 6개 가져오기
		List<ScoreArchive> latestScoreArchives = scoreArchives.stream()
			.sorted((s1, s2) -> s2.getResultList().get(0).getDate().compareTo(s1.getResultList().get(0).getDate()))
			.limit(6)
			.collect(Collectors.toList());

		// 게임 개수 계산
		Map<String, Integer> gameCounts = new TreeMap<>();
		for (ScoreArchive scoreArchive : scoreArchives) {
			String gameType = scoreArchive.getGameType();
			gameCounts.put(gameType, gameCounts.getOrDefault(gameType, 0) + 1);
		}
		gameCounts.put("total", scoreArchives.size());

		List<GameScoreResponseDto> gameScoreList = new ArrayList<>();
		for (ScoreArchive scoreArchive : latestScoreArchives) {
			GameResult gameResult = scoreArchive.getResultList().get(0);
			GameScoreResponseDto gameScoreInfo = new GameScoreResponseDto(
				scoreArchive.getGameType(),
				gameResult.getGameId(),
				gameResult.getScoreList()
			);
			gameScoreList.add(gameScoreInfo);
		}
		return new UserHistoryResponseDto(gameCounts, gameScoreList);
	}

	public AbilityResponseDto getUserAbility(int userId) {

		if (!hasRecordsForAllGameTypes(userId)) {
			throw new InsufficientDataException("모든 게임을 수행했을 때만 조회가 가능합니다.");
		}

		List<ScoreArchive> scoreArchiveList = findByUserId(userId);

		int catScore = 0;
		int roadScore = 0;
		int rotateScore = 0;
		int rpsScore = 0;

		int totalGames = 0;
		int totalEndurance = 0;
		int totalResilience = 0;

		for (ScoreArchive scoreArchive : scoreArchiveList) {
			String gameType = scoreArchive.getGameType();
			List<GameResult> resultList = scoreArchive.getResultList();

			if (!resultList.isEmpty()) {
				GameResult latestResult = resultList.get(resultList.size() - 1);
				List<Integer> scoreList = latestResult.getScoreList();

				if (gameType.equals("cat")) {
					catScore = scoreList.get(0);
				} else if (gameType.equals("road")) {
					roadScore = scoreList.get(0);
				} else if (gameType.equals("rotate")) {
					rotateScore = scoreList.get(0);
				} else if (gameType.equals("rps")) {
					rpsScore = scoreList.get(0);
				}

				totalGames++;
				totalEndurance += scoreList.get(1);
				totalResilience += scoreList.get(2);
			}
		}

		int enduranceAvg = (totalGames > 0) ? totalEndurance / totalGames : 0;
		int resilienceAvg = (totalGames > 0) ? totalResilience / totalGames : 0;

		return new AbilityResponseDto(catScore, roadScore, rotateScore, rpsScore, enduranceAvg, resilienceAvg);
	}

	/**
	 * 유저가 모든 게임을 수행했는지 확인
	 */
	@Transactional(readOnly = true)
	public boolean hasRecordsForAllGameTypes(int userId) {
		List<ScoreArchive> scoreArchiveList = scoreArchiveRepository.findByUserId(userId);

		Set<String> gameTypes = scoreArchiveList.stream()
			.map(ScoreArchive::getGameType)
			.collect(Collectors.toSet());

		List<String> requiredGameTypes = List.of("cat", "road", "rotate", "rps");

		return gameTypes.containsAll(requiredGameTypes);
	}

}