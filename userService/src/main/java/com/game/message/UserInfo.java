package com.game.message;

import com.game.domain.user.CustomUser;
import lombok.Getter;

@Getter
public class UserInfo {

    private final String birthDate;
    private final String profilePath;

    public UserInfo(CustomUser customUser) {
        this.birthDate = customUser.getBirthDate();
        this.profilePath = customUser.getProfilePath();
    }

}
