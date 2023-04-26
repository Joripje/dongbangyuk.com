package com.game.api;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.game.dto.PlayListResponseDto;
import com.game.dto.PlaySaveRequestDto;
import com.game.service.PlayService;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/plays")
@RequiredArgsConstructor
public class PlayController {

	private final PlayService playService;

	@ApiOperation(value = "게임 기록 생성")
	@PostMapping
	public ResponseEntity<Long> createPlay(@RequestBody PlaySaveRequestDto requestDto) {
		playService.save(requestDto);
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}

	@ApiOperation(value = "{id}에 해당하는 게임 기록 가져오기")
	@GetMapping("/{id}")
	public ResponseEntity<PlayListResponseDto> getOnePlayById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(playService.findById(id));
	}

	@ApiOperation(value = "아이디가 {id}인 유저의 모든 게임 기록 가져오기")
	@GetMapping("/users/{id}")
	public ResponseEntity<List<PlayListResponseDto>> getPlayByUserId(@PathVariable("id") Long userId) {
		return ResponseEntity.ok(playService.findByUserId(userId));
	}

}
