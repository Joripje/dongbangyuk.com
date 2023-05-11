package com.stat.api;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stat.domain.score.GameScore;
import com.stat.dto.GameScoreDto;
import com.stat.service.ScoreArchiveService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/game_history")
@RequiredArgsConstructor
public class ScoreArchiveController {

	private final ScoreArchiveService scoreArchiveService;

	@ApiOperation(value = "게임 기록 추가")
	@PostMapping
	public ResponseEntity<GameScore> addScore(
		@RequestBody GameScoreDto gameScoreDto) {
		scoreArchiveService.saveGameScore(gameScoreDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@ApiOperation(value = "유저별 게임 최신 기록 단건 조회 - gameType 지정 안하면 게임별 최신 데이터 하나씩 반환")
	@GetMapping("/{userId}")
	public ResponseEntity<?> searchByUserId(
		@PathVariable int userId,
		@RequestParam(required = false) String gameType
	) {
		if (gameType != null) {
			return ResponseEntity.ok(scoreArchiveService.findByUserIdAndGameType(userId, gameType));
		} else {
			return ResponseEntity.ok(scoreArchiveService.findByUserId(userId));
		}
	}

	@ApiOperation(value = "더미 데이터 생성")
	@PostMapping("/dummy")
	public ResponseEntity<String> addDummyData() {
		scoreArchiveService.addDummyData();
		return ResponseEntity.ok("Dummy 완성");
	}

}
