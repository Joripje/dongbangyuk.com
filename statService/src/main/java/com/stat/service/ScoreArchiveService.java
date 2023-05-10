package com.stat.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameScore;
import com.stat.domain.score.GameScoreSaveRequestDto;
import com.stat.domain.score.ScoreArchive;
import com.stat.domain.score.ScoreArchiveRepository;
import com.stat.domain.score.ScoreArchiveResponseDto;
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

		Optional<ScoreArchive> optionalScoreArchive = scoreArchiveRepository.findByUserId(userId);
		ScoreArchive scoreArchive = optionalScoreArchive.orElseGet(() -> {
			GameScore gameScore = createGameScore(type, score);
			return createScoreArchive(userId, gameScore);
		});

		Optional<GameScore> optionalGameScore = findGameScoreByType(scoreArchive, type);
		if (optionalGameScore.isPresent()) {
			GameScore gameScore = optionalGameScore.get();
			gameScore.getScores().add(0, score);
		} else {
			GameScore gameScore = createGameScore(type, score);
			scoreArchive.getGameScores().add(gameScore);
		}

		return scoreArchiveRepository.save(scoreArchive);
	}

	private GameScore createGameScore(String type, int score) {
		List<Integer> scores = new ArrayList<>();
		scores.add(0, score);

		return GameScore.builder()
			.type(type)
			.scores(scores)
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

			for (GameScore gameScore : scoreArchive.getGameScores()) {
				dtos.add(new ScoreArchiveResponseDto(gameScore.getType(), gameScore.getScores().get(0)));
			}
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
				dto = new ScoreArchiveResponseDto(type, first.get().getScores().get(0));
				return dto;
			} else {
				throw new GameTypeNotFoundException(String.format("해당 사용자 (%s)에 대한 %s 기록이 없습니다.", userId, type));
			}
		} else {
			throw new UserNotFoundException(String.format("해당 사용자 (%s)에 대한 게임 기록이 없습니다.", userId));
		}
	}

	@Transactional
	public void addDummyData() {
		GameScore score1 = new GameScore(
			new GameScoreSaveRequestDto("cat", Arrays.asList(8, 6, 9, 7, 5, 6)));
		GameScore score2 = new GameScore(
			new GameScoreSaveRequestDto("road", Arrays.asList(7, 5, 6, 8, 4, 5)));
		GameScore score3 = new GameScore(
			new GameScoreSaveRequestDto("rotate", Arrays.asList(9, 8, 7, 6, 5, 6)));
		GameScore score4 = new GameScore(
			new GameScoreSaveRequestDto("rps", Arrays.asList(6, 5, 4, 7, 8, 5)));

		List<GameScore> scores1 = Arrays.asList(score1, score2, score3, score4);
		ScoreArchive gameScore1 = new ScoreArchive(1, scores1);

		GameScore score5 = new GameScore(
			new GameScoreSaveRequestDto("cat", Arrays.asList(9, 6, 8, 7, 4, 6)));
		GameScore score6 = new GameScore(
			new GameScoreSaveRequestDto("road", Arrays.asList(8, 5, 5, 9, 3, 6)));
		GameScore score7 = new GameScore(
			new GameScoreSaveRequestDto("rotate", Arrays.asList(8, 7, 6, 5, 4, 7)));
		GameScore score8 = new GameScore(
			new GameScoreSaveRequestDto("rps", Arrays.asList(7, 4, 3, 6, 7, 4)));

		List<GameScore> scores2 = Arrays.asList(score5, score6, score7, score8);
		ScoreArchive gameScore2 = new ScoreArchive(2, scores2);

		List<ScoreArchive> gameScores = Arrays.asList(gameScore1, gameScore2);
		scoreArchiveRepository.saveAll(gameScores);
	}

}