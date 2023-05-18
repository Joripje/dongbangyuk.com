package com.game.filter;

import java.io.IOException;
import java.util.NoSuchElementException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import com.game.domain.user.CustomUser;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class FirebaseTokenFilter extends OncePerRequestFilter {

	private final UserDetailsService userDetailsService;
	private final FirebaseAuth firebaseAuth;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {

		// get the token from the request
		FirebaseToken decodedToken;
		String header = request.getHeader("Authorization");
		if (header == null || !header.startsWith("Bearer ")) {
			setUnauthorizedResponse(response, "INVALID_HEADER");
			return;
		}
		String token = header.substring(7);

		// verify IdToken
		try {
			decodedToken = firebaseAuth.verifyIdToken(token);
		} catch (FirebaseAuthException e) {
			setUnauthorizedResponse(response, "INVALID_TOKEN");
			return;
		}

		// User를 가져와 SecurityContext에 저장한다.
		try {
			UserDetails user = userDetailsService.loadUserByUsername(decodedToken.getUid());

			if (user != null) {
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
					user, null, user.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(authentication);
			} else {
				CustomUser customUser = new CustomUser(decodedToken.getUid(), null);
				user = customUser;
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
					user, null, user.getAuthorities());
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (NoSuchElementException e) {
			setUnauthorizedResponse(response, "USER_NOT_FOUND");
			return;
		}
		filterChain.doFilter(request, response);
	}

	private void setUnauthorizedResponse(HttpServletResponse response, String code) throws IOException {
		response.setStatus(HttpStatus.SC_UNAUTHORIZED);
		response.setContentType("application/json");
		response.getWriter().write("{\"code\":\"" + code + "\"}");
	}

}