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
import com.stat.domain.statistics.StatisticsSaveRequestDto;
import com.stat.service.StatisticsService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/stat")
@RequiredArgsConstructor
public class StatisticsController {

	private final StatisticsService statisticsService;

	@ApiOperation(value = "통계 기록 추가")
	@PostMapping
	public ResponseEntity<GameScore> addScore(@RequestBody StatisticsSaveRequestDto requestDto) {
		statisticsService.addStatistics(requestDto);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@ApiOperation(value = "게임별 통계 조회 - 모든 점수 조회")
	@GetMapping("/games")
	public ResponseEntity<List<Integer>> getStatisticsByType(@RequestParam String type) {
		return ResponseEntity.ok(statisticsService.getStatisticsByType(type));
	}

	@ApiOperation(value = "더미 데이터 생성")
	@PostMapping("/dummy")
	public ResponseEntity<String> addDummyData() {
		statisticsService.addDummy();
		return ResponseEntity.ok("Dummy 완성");
	}

	@ApiOperation(value = "통계 업데이트")
	@PostMapping("/update")
	public ResponseEntity<String> updateStatistics() {
		statisticsService.updateStatistics();
		return ResponseEntity.ok("gameId에 대한 통계 업데이트");
	}

	@ApiOperation(value = "게임별 점수 분포 조회")
	@GetMapping("/getStatistics")
	public ResponseEntity<Map<String, Integer>> getScoreLevelStatistics(String type) {
		return ResponseEntity.ok(statisticsService.getScoreLevelStatistics(type));
	}
}
