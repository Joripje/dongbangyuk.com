package com.game.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class DateUtil {
	public static String convertDateFormat(String date) {
		LocalDate localDate = LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
		return localDate.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
	}

}
