package com.stat.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stat.domain.score.ScoreArchive;
import com.stat.dto.GameScoreDto;
import com.stat.service.ScoreArchiveService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/game_history")
@RequiredArgsConstructor
public class ScoreArchiveController {

	private final ScoreArchiveService scoreArchiveService;

	@ApiOperation(value = "게임 기록 추가")
	@PostMapping
	public ResponseEntity<ScoreArchive> addScore(
		@RequestBody GameScoreDto gameScoreDto) {

		log.info("============ addScore 호출 ===========");
		ScoreArchive scoreArchive = scoreArchiveService.saveGameScore(gameScoreDto);

		log.info("return Value: " + scoreArchive.toString());

		return ResponseEntity.ok(scoreArchive);
	}

	@ApiOperation(value = "유저의 모든 게임 기록 가져오기")
	@GetMapping("/{userId}")
	public ResponseEntity<List<ScoreArchive>> getAllScoresByUserId(@PathVariable int userId) {
		return ResponseEntity.ok(scoreArchiveService.findByUserId(userId));
	}

	// @ApiOperation(value = "[TEST] 유저별 게임 최신 기록 단건 조회 - gameType 지정 안하면 게임별 최신 데이터 하나씩 반환")
	// @GetMapping("/{userId}")
	// public ResponseEntity<?> searchByUserId(
	// 	@PathVariable int userId,
	// 	@RequestParam(required = false) String gameType
	// ) {
	// 	log.info("============ searchByUserId 호출 ===========");
	// 	if (gameType != null) {
	// 		GameScoreResponseDto dto = scoreArchiveService.findByUserIdAndGameType(userId, gameType);
	// 		log.info("return : " + dto.toString());
	// 		return ResponseEntity.ok(scoreArchiveService.findByUserIdAndGameType(userId, gameType));
	// 	} else {
	// 		List<GameScoreResponseDto> dto = scoreArchiveService.findByUserId(userId);
	// 		log.info("return : " + dto.toString());
	// 		return ResponseEntity.ok(scoreArchiveService.findByUserId(userId));
	// 	}
	// }
	//
	// @ApiOperation(value = "[TEST] 더미 데이터 생성")
	// @PostMapping("/dummy")
	// public ResponseEntity<String> addDummyData() {
	// 	scoreArchiveService.addDummyData();
	// 	return ResponseEntity.ok("Dummy 완성");
	// }

}
