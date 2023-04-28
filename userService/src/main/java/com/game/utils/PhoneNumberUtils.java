package com.game.utils;

public class PhoneNumberUtils {

	public static String formatPhoneNumberWithCountryCode(String phoneNumber) {
		return "+82" + phoneNumber.substring(1, 11);
	}

}
