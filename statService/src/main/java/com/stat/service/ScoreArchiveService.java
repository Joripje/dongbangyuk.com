package com.stat.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameScore;
import com.stat.dto.GameScoreSaveRequestDto;
import com.stat.domain.score.ScoreArchive;
import com.stat.domain.score.ScoreArchiveRepository;
import com.stat.dto.ScoreArchiveResponseDto;
import com.stat.dto.GameScoreDto;
import com.stat.exception.GameTypeNotFoundException;
import com.stat.exception.UserNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ScoreArchiveService {

	private final ScoreArchiveRepository scoreArchiveRepository;

	@Transactional
	public ScoreArchive addScore(GameScoreDto gameScoreDto) {
		int userId = gameScoreDto.getUserId();
		String type = gameScoreDto.getType();
		int score = gameScoreDto.getScore();
		int endurance = gameScoreDto.getEndurance();
		int resilience = gameScoreDto.getResilience();

		Optional<ScoreArchive> optionalScoreArchive = scoreArchiveRepository.findByUserId(userId);

		// ScoreArchive
		if (optionalScoreArchive.isEmpty()) {
			GameScore gameScore = createGameScore(type, score, endurance, resilience);
			return scoreArchiveRepository.save(createScoreArchive(userId, gameScore));
		}
		ScoreArchive scoreArchive = optionalScoreArchive.get();

		// GameScore
		Optional<GameScore> optionalGameScore = findGameScoreByType(scoreArchive, type);

		if (optionalGameScore.isPresent()) {
			GameScore gameScore = optionalGameScore.get();
			gameScore.getScoreList().add(0, score);
			gameScore.getEnduranceList().add(0, endurance);
			gameScore.getResilienceList().add(0, resilience);
		} else {
			GameScore gameScore = createGameScore(type, score, endurance, resilience);
			scoreArchive.getGameScores().add(gameScore);
		}
		return scoreArchiveRepository.save(scoreArchive);
	}

	private GameScore createGameScore(String type, int score, int endurance, int resilience) {
		List<Integer> scoreList = new ArrayList<>();
		scoreList.add(0, score);

		List<Integer> enduranceList = new ArrayList<>();
		enduranceList.add(0, endurance);

		List<Integer> resilienceList = new ArrayList<>();
		resilienceList.add(0, resilience);

		return GameScore.builder()
			.type(type)
			.scoreList(scoreList)
			.enduranceList(enduranceList)
			.resilienceList(resilienceList)
			.build();
	}

	private ScoreArchive createScoreArchive(int userId, GameScore gameScore) {
		List<GameScore> gameScores = new ArrayList<>();
		gameScores.add(gameScore);

		return ScoreArchive.builder()
			.userId(userId)
			.gameScores(gameScores)
			.build();
	}

	private Optional<GameScore> findGameScoreByType(ScoreArchive scoreArchive, String type) {
		return scoreArchive.getGameScores().stream()
			.filter(gameScore -> gameScore.getType().equals(type))
			.findFirst();
	}

	@Transactional(readOnly = true)
	public List<ScoreArchiveResponseDto> findByUserId(int userId) {
		Optional<ScoreArchive> optionalScoreArchive = scoreArchiveRepository.findByUserId(userId);

		List<ScoreArchiveResponseDto> dtos = new ArrayList<>();
		if (optionalScoreArchive.isPresent()) {
			ScoreArchive scoreArchive = optionalScoreArchive.get();

			// 4가지 게임 역량
			for (GameScore gameScore : scoreArchive.getGameScores()) {
				dtos.add(new ScoreArchiveResponseDto(gameScore.getType(), gameScore.getScoreList().get(0)));
			}

			// 지구력
			dtos.add(new ScoreArchiveResponseDto("endurance", calculateEnduranceAverage(scoreArchive)));

			// 회탄성
			dtos.add(new ScoreArchiveResponseDto("resilience", calculateResilienceAverage(scoreArchive)));


		} else {
			throw new UserNotFoundException(String.format("해당 사용자 (%s)에 대한 게임 기록이 없습니다.", userId));
		}
		return dtos;
	}

	@Transactional(readOnly = true)
	public ScoreArchiveResponseDto findByUserIdAndGameType(int userId, String type) {
		Optional<ScoreArchive> optionalScoreArchive = scoreArchiveRepository.findByUserId(userId);

		ScoreArchiveResponseDto dto;
		if (optionalScoreArchive.isPresent()) {
			ScoreArchive scoreArchive = optionalScoreArchive.get();

			Optional<GameScore> first = scoreArchive.getGameScores()
				.stream()
				.filter(gameScore -> type.equals(gameScore.getType()))
				.findFirst();

			if (first.isPresent()) {
				dto = new ScoreArchiveResponseDto(type, first.get().getScoreList().get(0));
				return dto;
			} else {
				throw new GameTypeNotFoundException(String.format("해당 사용자 (%s)에 대한 %s 기록이 없습니다.", userId, type));
			}
		} else {
			throw new UserNotFoundException(String.format("해당 사용자 (%s)에 대한 게임 기록이 없습니다.", userId));
		}
	}

	private static int calculateAverage(List<Integer> values) {
		if (values == null || values.isEmpty()) {
			return 0;
		}
		int sum = 0;

		for (Integer value : values) {
			sum += value;
		}

		return sum / values.size();
	}

	private static int calculateEnduranceAverage(ScoreArchive scoreArchive) {
		List<Integer> enduranceList = new ArrayList<>();
		for (GameScore gameScore : scoreArchive.getGameScores()) {
			enduranceList.addAll(gameScore.getEnduranceList());
		}
		return calculateAverage(enduranceList);
	}

	public static int calculateResilienceAverage(ScoreArchive scoreArchive) {
		List<Integer> resilienceList = new ArrayList<>();
		for (GameScore gameScore : scoreArchive.getGameScores()) {
			resilienceList.addAll(gameScore.getResilienceList());
		}
		return calculateAverage(resilienceList);
	}

	@Transactional
	public void addDummyData() {
		GameScore score1 = new GameScore(
			new GameScoreSaveRequestDto("cat", Arrays.asList(8, 6), Arrays.asList(8, 6), Arrays.asList(8, 6)));
		GameScore score2 = new GameScore(
			new GameScoreSaveRequestDto("road", Arrays.asList(7, 5), Arrays.asList(0, 1), Arrays.asList(7, 5)));
		GameScore score3 = new GameScore(
			new GameScoreSaveRequestDto("rotate", Arrays.asList(1, 6), Arrays.asList(4, 5), Arrays.asList(6, 8)));
		GameScore score4 = new GameScore(
			new GameScoreSaveRequestDto("rps", Arrays.asList(2, 5), Arrays.asList(1, 3), Arrays.asList(4, 5)));

		List<GameScore> scores1 = Arrays.asList(score1, score2, score3, score4);
		ScoreArchive gameScore1 = new ScoreArchive(1, scores1);

		GameScore score5 = new GameScore(
			new GameScoreSaveRequestDto("cat", Arrays.asList(9, 6), Arrays.asList(7, 2), Arrays.asList(4, 5)));
		GameScore score6 = new GameScore(
			new GameScoreSaveRequestDto("road", Arrays.asList(7, 2), Arrays.asList(2, 5), Arrays.asList(4, 5)));
		GameScore score7 = new GameScore(
			new GameScoreSaveRequestDto("rotate", Arrays.asList(7, 2), Arrays.asList(2, 0), Arrays.asList(0, 0)));
		GameScore score8 = new GameScore(
			new GameScoreSaveRequestDto("rps", Arrays.asList(5, 1), Arrays.asList(9, 9), Arrays.asList(3, 0)));

		List<GameScore> scores2 = Arrays.asList(score5, score6, score7, score8);
		ScoreArchive gameScore2 = new ScoreArchive(2, scores2);

		List<ScoreArchive> gameScores = Arrays.asList(gameScore1, gameScore2);
		scoreArchiveRepository.saveAll(gameScores);
	}

}