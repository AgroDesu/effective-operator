package com.revature.services;

import java.util.List;

import com.revature.beans.GradingFormat;

public interface GradingFormatService {
	List<GradingFormat> getGradingFormats();
	GradingFormat getGradingFormat(int id);
}
