package com.stat.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.stat.domain.score.GameScore;
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

	@Transactional
	public void saveGameScore(GameScoreDto gameScoreDto) {
		ScoreArchive scoreArchive = scoreArchiveRepository.findByUserId(gameScoreDto.getUserId())
			.orElseGet(() -> ScoreArchive.builder().userId(gameScoreDto.getUserId()).build());

		List<GameScore> gameList = scoreArchive.getGameList();
		GameScore gameScore = findGameScoreByType(gameScoreDto.getType(), gameList);

		if (gameScore != null) {
			addScoreToList(gameScore, gameScoreDto);
		} else {
			gameScore = createGameScore(gameScoreDto);
			gameList.add(gameScore);
		}

		List<Integer> gameIds = scoreArchive.getGameIds();
		gameIds.add(0, gameScoreDto.getGameId());
		scoreArchiveRepository.save(scoreArchive);
	}

	private GameScore findGameScoreByType(String type, List<GameScore> gameList) {
		return gameList.stream()
			.filter(gameScore -> gameScore.getType().equals(type))
			.findFirst()
			.orElse(null);
	}

	private void addScoreToList(GameScore gameScore, GameScoreDto gameScoreDto) {
		List<Integer> newScore = List.of(gameScoreDto.getGameId(), gameScoreDto.getScore(),
			gameScoreDto.getEndurance(), gameScoreDto.getResilience());
		gameScore.getScoreList().add(0, newScore);
	}

	private GameScore createGameScore(GameScoreDto gameScoreDto) {
		List<Integer> score = List.of(gameScoreDto.getGameId(), gameScoreDto.getScore(),
			gameScoreDto.getEndurance(), gameScoreDto.getResilience());
		return GameScore.builder()
			.type(gameScoreDto.getType())
			.scoreList(List.of(score))
			.build();
	}

	// userId 로 조회했을 때 각 게임별 최신 기록 반환
	@Transactional(readOnly = true)
	public List<GameScoreResponseDto> findByUserId(int userId) {
		Optional<ScoreArchive> optionalScoreArchive = scoreArchiveRepository.findByUserId(userId);

		List<GameScoreResponseDto> dtos = new ArrayList<>();

		if (optionalScoreArchive.isPresent()) {
			ScoreArchive scoreArchive = optionalScoreArchive.get();

			// 4가지 게임 역량
			for (GameScore gameScore : scoreArchive.getGameList()) {
				List<Integer> results = gameScore.getScoreList().stream()
					.findFirst()
					.orElse(null);

				dtos.add(new GameScoreResponseDto(gameScore.getType(), results));
			}
		} else {
			throw new UserNotFoundException(String.format("해당 사용자 (%s)에 대한 게임 기록이 없습니다.", userId));
		}
		return dtos;
	}

	// userId 와 gameType 으로 조회했을 때, 가장 최신 기록 하나 반환
	@Transactional(readOnly = true)
	public GameScoreResponseDto findByUserIdAndGameType(int userId, String gameType) {
		Optional<GameScore> optionalGameScore = scoreArchiveRepository.findByUserId(userId)
			.map(scoreArchive1 -> filterGameScoreByType(gameType, scoreArchive1));

		if (optionalGameScore.isPresent()) {
			GameScore gameScore = optionalGameScore.get();
			return new GameScoreResponseDto(gameScore.getType(), gameScore.getScoreList().get(0));
		} else {
			throw new UserNotFoundException(String.format("해당 사용자 (%d)에 대한 게임 기록이 없습니다.", userId));
		}
	}

	private GameScore filterGameScoreByType(String gameType, ScoreArchive scoreArchive) {
		Optional<GameScore> first = scoreArchive.getGameList().stream()
			.filter(gameScore -> gameScore.getType().equals(gameType))
			.findFirst();

		if (first.isPresent()) {
			return first.get();
		}
		throw new GameTypeNotFoundException(String.format("해당 사용자에 대한 게임 %s 기록이 없습니다.", gameType));
	}

	@Transactional
	public void addDummyData() {
		GameScore score1 = new GameScore("cat", List.of(List.of(1, 0, 1, 1)));
		GameScore score2 = new GameScore("road", List.of(List.of(1, 0, 1, 1)));
		GameScore score3 = new GameScore("rotate", List.of(List.of(1, 0, 1, 1)));
		GameScore score4 = new GameScore("rps", List.of(List.of(1, 0, 1, 1)));

		List<GameScore> scores1 = Arrays.asList(score1, score2, score3, score4);
		ScoreArchive gameScore1 = new ScoreArchive(1, scores1);

		GameScore score5 = new GameScore("cat", List.of(List.of(1, 0, 1, 1)));
		GameScore score6 = new GameScore("road", List.of(List.of(1, 0, 1, 1)));
		GameScore score7 = new GameScore("rotate", List.of(List.of(1, 0, 1, 1)));
		GameScore score8 = new GameScore("rps", List.of(List.of(1, 0, 1, 1)));

		List<GameScore> scores2 = Arrays.asList(score5, score6, score7, score8);
		ScoreArchive gameScore2 = new ScoreArchive(2, scores2);

		List<ScoreArchive> gameScores = Arrays.asList(gameScore1, gameScore2);
		scoreArchiveRepository.saveAll(gameScores);
	}


}