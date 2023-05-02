package com.function.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayRepository extends JpaRepository<Play, Long> {

	List<Play> findByUserId(Long userId);

}
