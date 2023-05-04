package com.function.api;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequestMapping("/kafka")
@RestController
@RequiredArgsConstructor
public class KafkaController {

	private final KafkaTemplate<String, String> kafkaTemplate;

	@GetMapping("/publish")
	public String publish(String message) {
		this.kafkaTemplate.send("video", message);
		return "success";
	}

}
