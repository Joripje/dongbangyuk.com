package com.game.domain.play;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PlayRepository extends JpaRepository<Play, Long> {

	@Query("select p from Play p where p.user.id = ?1")
	List<Play> findByUserId(Long userId);

}
