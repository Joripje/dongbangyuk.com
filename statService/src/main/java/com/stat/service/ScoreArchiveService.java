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
import com.stat.dto.GameScoreDto;

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

		// userId에 해당하는 데이터가 없으면 새로 생성하여 추가
		ScoreArchive scoreArchive = optionalScoreArchive.orElseGet(() -> ScoreArchive.builder()
			.userId(userId)
			.gameScores(new ArrayList<>())
			.build());

		// gameId에 해당하는 데이터 찾기
		Optional<GameScore> optionalScore = scoreArchive.getGameScores().stream()
			.filter(s -> s.getType().equals(type))
			.findFirst();

		GameScore gameScore = optionalScore.get();
		gameScore.getScores().add(0, score);
		gameScore.updateLastModified();
		return scoreArchiveRepository.save(scoreArchive);
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