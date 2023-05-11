package com.stat.api;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stat.domain.score.GameScore;
import com.stat.domain.statistics.Statistics;
import com.stat.dto.AbilityResponseDto;
import com.stat.dto.StatisticsSaveRequestDto;
import com.stat.dto.UserHistoryResponseDto;
import com.stat.service.StatisticsService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/stat")
@RequiredArgsConstructor
public class StatisticsController {

	private final StatisticsService statisticsService;

	@ApiOperation(value = "통계 기록 추가")
	@PostMapping
	public ResponseEntity<GameScore> addScore(@RequestBody StatisticsSaveRequestDto requestDto) {
		log.info("============ addScore 호출 ===========");

		Statistics statistics = statisticsService.addStatistics(requestDto);

		log.info("return: " + statistics.toString());
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@ApiOperation(value = "유저 응시 게임 기록 가져오기")
	@GetMapping("/history")
	public ResponseEntity<?> getUserGameHistory(@RequestParam int userId, @RequestParam String type) {
		log.info("============ getUserGameHistory 호출 ===========");
		UserHistoryResponseDto dto = statisticsService.getUserHistoryByGameType(userId, type);
		log.info("return: " + dto.toString());
		return ResponseEntity.ok(statisticsService.getUserHistoryByGameType(userId, type));
	}

	@ApiOperation(value = "유저 개인 역량 가져오기")
	@GetMapping("/ability")
	public AbilityResponseDto getUserAbility(@RequestParam int userId) {
		log.info("============ userId 호출 ===========");
		AbilityResponseDto dto = statisticsService.getUserAbility(userId);
		log.info("return: " + dto.toString());
		return statisticsService.getUserAbility(userId);
	}


	@ApiOperation(value = "게임별 점수 분포 조회")
	@GetMapping("/score-distribution")
	public ResponseEntity<Map<String, Integer>> getScoreLevelStatistics(@RequestParam String type) {
		log.info("============ getScoreLevelStatistics 호출 ===========");

		Map<String, Integer> dto = statisticsService.getScoreLevelStatistics(type);
		log.info("return: " + dto.toString());

		return ResponseEntity.ok(statisticsService.getScoreLevelStatistics(type));
	}

	@ApiOperation(value = "[TEST] 더미 데이터 생성")
	@PostMapping("/dummy")
	public ResponseEntity<String> addDummyData() {
		statisticsService.addDummy();
		return ResponseEntity.ok("Dummy 완성");
	}

	@ApiOperation(value = "[TEST] 게임별 통계 조회 - 모든 점수 조회")
	@GetMapping("/all-scores")
	public ResponseEntity<List<Integer>> getAllScoresByType(@RequestParam String type) {
		return ResponseEntity.ok(statisticsService.getAllScoresByType(type));
	}

	// @ApiOperation(value = "통계 업데이트")
	// @PostMapping("/update")
	// public ResponseEntity<String> updateStatistics() {
	// 	statisticsService.updateStatistics();
	// 	return ResponseEntity.ok("gameId에 대한 통계 업데이트");
	// }

}
