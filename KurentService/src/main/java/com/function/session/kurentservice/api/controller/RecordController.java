package com.function.session.kurentservice.api.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.function.session.kurentservice.api.data.Game;
import com.function.session.kurentservice.api.service.GameService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {

	private final GameService gameService;

	@ApiOperation(value = "{id}에 해당하는 게임 기록 가져오기")
	@GetMapping("/{id}")
	public ResponseEntity<Game> getOnePlayById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(gameService.findById(id));
	}

	@ApiOperation(value = "{gameId}에 해당하는 유저 아이디 가져오기")
	@GetMapping("/userInfo")
	public ResponseEntity<String> getUserIdByGameId(@RequestParam Long gameId) {
		return ResponseEntity.ok(gameService.findById(gameId).getUserEmail());
	}

	@ApiOperation(value = "아이디가 {id}인 유저의 모든 게임 기록 가져오기")
	@GetMapping("/users")
	public ResponseEntity<List<Game>> getPlayByUserId(@RequestParam String email) {
		return ResponseEntity.ok(gameService.findByUserEmail(email));
	}


}
