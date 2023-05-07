package com.function.kafka;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class GameEventProducer {

	private final KafkaTemplate<String, String> kafkaTemplate;

	public void publish(String topic, String message) {
		log.info("publish 호출 - topic: " + topic);
		this.kafkaTemplate.send(new ProducerRecord<>(topic, message));
		log.info("success");
	}

}
