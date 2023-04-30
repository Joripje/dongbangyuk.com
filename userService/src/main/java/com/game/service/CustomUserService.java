package com.game.service;

import com.game.domain.user.CustomUser;
import com.game.domain.user.CustomUserRepository;
import com.game.dto.UserSaveRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserService implements UserDetailsService {

    private final CustomUserRepository customUserRepository;

    @Override
    public UserDetails loadUserByUsername(String uid) throws UsernameNotFoundException {
        return customUserRepository.findByUid(uid).get();
    }

    @Transactional
    public CustomUser createUser(UserSaveRequestDto dto) {
        CustomUser customUser = CustomUser.builder()
                .uid(dto.getUid())
                .birthDate(dto.getBirthDate())
                .build();

        customUserRepository.save(customUser);
        return customUser;
    }

}
