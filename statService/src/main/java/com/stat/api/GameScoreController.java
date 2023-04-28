package com.stat.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stat.domain.score.GameScore;
import com.stat.domain.statistics.StatisticsRepository;
import com.stat.dto.GameScoreDto;
import com.stat.service.ScoreAvgService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/games")
@RequiredArgsConstructor
public class GameScoreController {

	private final ScoreAvgService scoreAvgService;
	private final StatisticsRepository statisticsRepository;

	@ApiOperation(value = "더미 데이터 생성")
	@PostMapping("/dummy")
	public ResponseEntity<String> addDummyData() {
		scoreAvgService.addDummyData();
		return ResponseEntity.ok("Dummy 완성");
	}

	@ApiOperation(value = "게임 기록 추가")
	@PostMapping("/add")
	public ResponseEntity<GameScore> addScore(@RequestBody GameScoreDto gameScoreDto) {
		int userId = gameScoreDto.getUserId();
		String gameId = gameScoreDto.getGameId();
		double score = gameScoreDto.getScore();
		scoreAvgService.addScore(userId, gameId, score);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

}
