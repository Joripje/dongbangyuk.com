package com.function.api;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/kafka")
@RestController
@RequiredArgsConstructor
public class KafkaController {

	private final KafkaTemplate<String, String> kafkaTemplate;

	@GetMapping("/publish")
	public String publish(@RequestParam String message) {
		this.kafkaTemplate.send("test", message);
		log.info("message: " + message);
		return "success";
	}

}
