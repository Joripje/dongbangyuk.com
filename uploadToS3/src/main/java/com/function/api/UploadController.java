package com.function.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.function.dto.GameSaveRequestDto;
import com.function.dto.PlaySaveRequestDto;
import com.function.kafka.GameEventProducer;
import com.function.service.PlayService;
import com.function.service.UploadService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class UploadController {

    private final UploadService uploadService;
    private final PlayService playService;
    private final GameEventProducer gameEventProducer;

    @ApiOperation(value = "S3에 영상 업로드")
    @PostMapping("/upload")
    public ResponseEntity<?> uploadVideo(@RequestParam("file") MultipartFile file) throws IOException {
        String filePath = uploadService.uploadVideo(file);
        gameEventProducer.publish("test", filePath);
        return ResponseEntity.ok("Video upload successful!");
    }

    @ApiOperation(value = "게임 기록 저장")
    @PostMapping(value = "/recordPlay")
    public ResponseEntity<PlaySaveRequestDto> saveGameHistory(@RequestBody PlaySaveRequestDto requestDto) {

        ObjectMapper objectMapper = new ObjectMapper();

        // 필요한 정보 추출
        Long userId = requestDto.getUserId();
        String gameType = requestDto.getGameType();
        String date = requestDto.getDate();

        // GameHistory 엔티티 생성 후 필요한 정보 저장
        GameSaveRequestDto gameHistory = GameSaveRequestDto.builder()
                .userId(userId)
                .gameType(gameType)
                .date(date)
                .build();

        // GameHistory 엔티티 저장
        Long newGameId = playService.save(gameHistory);
        requestDto.setGameId(newGameId);

        log.info("gameEventProducer 호출");
        String dtoString;
        try {
            dtoString = objectMapper.writeValueAsString(requestDto);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        gameEventProducer.publish("test", dtoString);
        return ResponseEntity.ok(requestDto);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(IOException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed: " + e.getMessage());
    }

}
