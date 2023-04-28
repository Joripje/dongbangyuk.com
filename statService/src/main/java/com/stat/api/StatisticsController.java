package com.stat.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stat.domain.statistics.Statistics;
import com.stat.service.StatisticsService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/stat")
@RequiredArgsConstructor
public class StatisticsController {

	private final StatisticsService statisticsService;

	@ApiOperation(value = "게임별 통계 조회")
	@GetMapping("/games")
	public ResponseEntity<Statistics> getStatisticsByType(@RequestParam String type) {
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

}
