package com.stat.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameResult;
import com.stat.domain.score.ScoreArchive;
import com.stat.domain.score.ScoreArchiveRepository;
import com.stat.domain.statistics.Statistics;
import com.stat.domain.statistics.StatisticsRepository;
import com.stat.dto.AbilityResponseDto;
import com.stat.dto.GameScoreResponseDto;
import com.stat.dto.StatisticsListResponseDto;
import com.stat.dto.UserHistoryResponseDto;
import com.stat.exception.GameTypeNotFoundException;
import com.stat.exception.InsufficientDataException;
import com.stat.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StatisticsService {

	private final StatisticsRepository statisticsRepository;
	private final ScoreArchiveRepository scoreArchiveRepository;
	private final ScoreArchiveService scoreArchiveService;

	/**
	 * 유저 응시 게임 기록 가져오기 : 게임별 최신 점수 + 지구력 평균 + 회복탄력성 평균
	 */
	public UserHistoryResponseDto getUserHistoryByUserIdAndGameType(int userId, String type) {
		System.out.println("============== getUserHistoryByUserIdAndGameType (" + userId + ", " + type + ") 호출 ==============================");
		List<ScoreArchive> scoreArchives = scoreArchiveRepository.findByUserId(userId);

		if (scoreArchives.isEmpty()) {
			throw new UserNotFoundException(String.format("%s 님의 게임 응시 내역이 없어요.", userId));
		}

		List<GameScoreResponseDto> gameScoreList;

		if (type.equals("all")) {
			System.out.println("[CASE 1] type NO 지정");

			gameScoreList = scoreArchiveService.findGameIdsByUserId(userId)
				.stream()
				.limit(6)
				.collect(Collectors.toList());

		} else {
			System.out.println("[CASE 2] type 지정");

			gameScoreList = scoreArchiveService.findGameIdsByUserIdAndGameType(userId, type)
				.stream()
				.limit(6)
				.collect(Collectors.toList());
		}

		System.out.println("gameScoreList = " + gameScoreList.toString());

		int total = 0;
		// Game counts calculation
		Map<String, Integer> gameCounts = new TreeMap<>();
		for (ScoreArchive scoreArchive : scoreArchives) {
			String gameType = scoreArchive.getGameType();
			// scoreArchive.getResultList().size();
			// if (gameCounts.containsKey(gameType)) {
			// 	int count = gameCounts.get(gameType);
			// 	gameCounts.put(gameType, count + 1);
			// } else {
			// 	gameCounts.put(gameType, 1);
			// }
			gameCounts.put(gameType, scoreArchive.getResultList().size());
			total++;
		}
		gameCounts.put("total", total);

		System.out.println("gameCounts = " + gameCounts);

		return new UserHistoryResponseDto(gameCounts, gameScoreList);
	}

	public AbilityResponseDto getUserAbility(int userId) {

		if (!hasRecordsForAllGameTypes(userId)) {
			throw new InsufficientDataException("모든 게임을 수행했을 때만 조회가 가능합니다.");
		}

		List<ScoreArchive> scoreArchiveList = scoreArchiveService.findByUserId(userId);

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

				switch (gameType) {
					case "cat":
						catScore = scoreList.get(0);
						break;
					case "road":
						roadScore = scoreList.get(0);
						break;
					case "rotate":
						rotateScore = scoreList.get(0);
						break;
					case "rps":
						rpsScore = scoreList.get(0);
						break;
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

	@Transactional(readOnly = true)
	public List<StatisticsListResponseDto> getScoreLevelStatistics() {

		List<StatisticsListResponseDto> dtoList = new ArrayList<>();
		String[] gameTypes = {"cat", "road", "rotate", "rps"};
		for (String gameType : gameTypes) {
			Statistics statistics = statisticsRepository.findByType(gameType)
				.orElseThrow(() -> new GameTypeNotFoundException(String.format("%s에 대한 데이터가 없어요.", gameType)));

			dtoList.add(new StatisticsListResponseDto(gameType, statistics.calculateScoreLevels()));
		}
		return dtoList;
	}

	public void storeGameStatistics() {
		List<ScoreArchive> scoreArchiveList = scoreArchiveRepository.findAll();

		for (ScoreArchive scoreArchive : scoreArchiveList) {
			String gameType = scoreArchive.getGameType();
			List<GameResult> resultList = scoreArchive.getResultList();
			List<Integer> scores = new ArrayList<>();

			for (GameResult gameResult : resultList) {
				List<Integer> scoreList = gameResult.getScoreList();
				if (!scoreList.isEmpty()) {
					scores.add(scoreList.get(0));
				}
			}

			if (!scores.isEmpty()) {
				Optional<Statistics> optionalStatistics = statisticsRepository.findByType(gameType);
				if (optionalStatistics.isPresent()) {
					Statistics statistics = optionalStatistics.get();
					statistics.getScores().addAll(scores);
					statisticsRepository.save(statistics);
				} else {
					Statistics statistics = new Statistics(gameType, scores);
					statisticsRepository.save(statistics);
				}
			}
		}
	}

}
