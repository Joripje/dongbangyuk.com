package com.function.api;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.function.dto.PlayListResponseDto;
import com.function.service.PlayService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin("*")
@RequestMapping("/plays")
@RequiredArgsConstructor
public class PlayController {

	private final PlayService playService;

	@ApiOperation(value = "{id}에 해당하는 게임 기록 가져오기")
	@GetMapping("/{id}")
	public ResponseEntity<PlayListResponseDto> getOnePlayById(@PathVariable("id") Long id) {
		log.info("======== getOnePlayById 호출 ========");
		System.out.println("id : " + id);
		return ResponseEntity.ok(playService.findById(id));
	}

	@ApiOperation(value = "{gameId}에 해당하는 유저 아이디 가져오기")
	@GetMapping("/userInfo")
	public ResponseEntity<Long> getUserIdByGameId(@RequestParam Long gameId) {
		log.info("======== getUserIdByGameId 호출 ========");
		System.out.println("gameId : " + gameId);
		return ResponseEntity.ok(playService.findById(gameId).getUserId());
	}
	
	@ApiOperation(value = "아이디가 {id}인 유저의 모든 게임 기록 가져오기")
	@GetMapping("/users/{id}")
	public ResponseEntity<List<PlayListResponseDto>> getPlayByUserId(@PathVariable("id") Long userId) {
		log.info("======== getPlayByUserId 호출 ========");
		System.out.println("userId : " + userId);
		return ResponseEntity.ok(playService.findByUserId(userId));
	}

}

