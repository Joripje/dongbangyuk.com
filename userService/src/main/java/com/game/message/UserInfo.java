package com.game.message;

import com.game.domain.user.CustomUser;
import lombok.Getter;

@Getter
public class UserInfo {

    private final String birthDate;

    public UserInfo(CustomUser customUser) {
        this.birthDate = customUser.getBirthDate();
    }

}
