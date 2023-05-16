package com.function.session.client.user;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "userService", url = "k8a305.p.ssafy.io:8050/users")
public interface UserServiceClient {

	@GetMapping
	Long findByUserId(@RequestParam String uid);

}
