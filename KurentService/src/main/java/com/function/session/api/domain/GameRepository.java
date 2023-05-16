package com.function.session.api.domain;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

	List<Game> findByUserId(Long userId);

}
