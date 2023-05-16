package com.function.session.kurentservice.api.data;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GameRepository extends JpaRepository<Game, Long> {

	@Query("select g from Game g where g.userEmail = ?1")
	List<Game> findByUserEmail(String userEmail);

}
