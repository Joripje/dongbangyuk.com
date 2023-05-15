package com.game.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.game.filter.FirebaseTokenFilter;
import com.game.service.CustomUserService;
import com.google.firebase.auth.FirebaseAuth;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final CustomUserService userService;
	private final FirebaseAuth firebaseAuth;

	/**
	 * HttpRequest를 받는 부분에 filter 적용 (addFilterBefore)
	 */
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.cors().and()
			.authorizeRequests()
				.antMatchers(HttpMethod.POST, "/users/register", "/users/register/").permitAll()
				.antMatchers(HttpMethod.POST, "/users/profile-update", "/users/register/profile-update/").permitAll()
				.anyRequest().authenticated()
				.and()
			.addFilterBefore(new FirebaseTokenFilter(userService, firebaseAuth),
				UsernamePasswordAuthenticationFilter.class)
			.exceptionHandling()
			.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED));
	}

	/**
	 * WebSecurity를 받는 부분에서 Filter를 적용하지 않을 요청
	 */
	@Override
	public void configure(WebSecurity web) throws Exception {
		// 회원가입, 메인페이지
		web.ignoring().antMatchers(HttpMethod.POST, "/users/register", "/users/profile-update")
				.antMatchers("/");
	}

}