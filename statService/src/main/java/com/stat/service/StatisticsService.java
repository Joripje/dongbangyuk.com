package com.stat.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
		List<ScoreArchive> scoreArchives = scoreArchiveRepository.findByUserId(userId);
		System.out.println(scoreArchives.toString());

		if (scoreArchives.isEmpty()) {
			throw new UserNotFoundException(String.format("%s 님의 게임 응시 내역이 없어요.", userId));
		}

		List<ScoreArchive> filteredScoreArchives;

		if (type.equals("all")) {
			filteredScoreArchives = scoreArchives;
		} else {
			filteredScoreArchives = scoreArchives.stream()
				.filter(scoreArchive -> scoreArchive.getGameType().equals(type))
				.collect(Collectors.toList());
		}

		System.out.println(filteredScoreArchives.toString());
		// Sort the filtered score archives based on the game result date in descending order
		filteredScoreArchives.sort((s1, s2) -> {
			LocalDate date1 = LocalDate.parse(s1.getResultList().get(0).getDate(),
				DateTimeFormatter.ofPattern("yyyy-MM-dd"));
			LocalDate date2 = LocalDate.parse(s2.getResultList().get(0).getDate(),
				DateTimeFormatter.ofPattern("yyyy-MM-dd"));

			return date2.compareTo(date1);
		});

		// Retrieve the latest 6 game scores
		List<GameScoreResponseDto> gameScoreList = new ArrayList<>();
		int count = 0;
		for (ScoreArchive scoreArchive : filteredScoreArchives) {
			if (count >= 6) {
				break;
			}
			GameResult gameResult = scoreArchive.getResultList().get(0);
			GameScoreResponseDto gameScoreInfo = new GameScoreResponseDto(
				scoreArchive.getGameType(),
				gameResult.getGameId(),
				gameResult.getScoreList()
			);
			gameScoreList.add(gameScoreInfo);
			count++;
		}

		// Game counts calculation
		Map<String, Integer> gameCounts = new TreeMap<>();
		for (ScoreArchive scoreArchive : scoreArchives) {
			for (GameResult gameResult : scoreArchive.getResultList()) {
				String gameType = scoreArchive.getGameType();
				gameCounts.put(gameType, gameCounts.getOrDefault(gameType, 0) + 1);
			}
		}
		gameCounts.put("total", gameScoreList.size());

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
