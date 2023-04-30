package com.game.message;

import com.game.domain.user.CustomUser;
import lombok.Getter;

@Getter
public class UserInfo {

    private String birthDate;
    private int feature;

    public UserInfo(CustomUser customUser) {
        this.birthDate = customUser.getBirthDate();
        this.feature = customUser.getFeature();
    }

}
