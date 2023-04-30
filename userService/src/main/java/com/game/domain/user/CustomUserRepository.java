package com.game.domain.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface CustomUserRepository extends JpaRepository<CustomUser, Long> {

	Optional<UserDetails> findByUid(String uid);

}
