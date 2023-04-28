package com.game.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.game.filter.FirebaseTokenFilter;
import com.game.service.UserService;
import com.google.firebase.auth.FirebaseAuth;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final UserService userService;
	private final FirebaseAuth firebaseAuth;

	/**
	 * HttpRequest를 받는 부분에 filter 적용 (addFilterBefore)
	 */
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
			.anyRequest().authenticated().and()
			.addFilterBefore(new FirebaseTokenFilter(userService, firebaseAuth),
				UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling()
			.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
	}

}