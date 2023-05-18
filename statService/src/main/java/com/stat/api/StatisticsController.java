package com.stat.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stat.dto.AbilityResponseDto;
import com.stat.dto.StatisticsListResponseDto;
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

	@ApiOperation(value = "유저 응시 게임 기록 가져오기")
	@GetMapping("/history")
	public ResponseEntity<?> getUserGameHistory(@RequestParam int userId, @RequestParam String gameType) {
		log.info("============ getUserGameHistory 호출 ===========");
		return ResponseEntity.ok(statisticsService.getUserHistoryByUserIdAndGameType(userId, gameType));
	}

	@ApiOperation(value = "유저 개인 역량 가져오기")
	@GetMapping("/ability")
	public AbilityResponseDto getUserAbility(@RequestParam int userId) {
		log.info("============ userId 호출 ===========");
		AbilityResponseDto dto = statisticsService.getUserAbility(userId);
		log.info("return: " + dto.toString());
		return statisticsService.getUserAbility(userId);
	}

	@ApiOperation(value = "게임 점수 분포 조회")
	@GetMapping("/score-distribution")
	public ResponseEntity<List<StatisticsListResponseDto>> getScoreLevelStatistics() {
		return ResponseEntity.ok(statisticsService.getScoreLevelStatistics());
	}

	@ApiOperation(value = "통계 업데이트")
	@GetMapping("/all-update")
	public ResponseEntity<String> processScoreArchive() {
		statisticsService.storeGameStatistics();
		return ResponseEntity.ok("성공");
	}
}
