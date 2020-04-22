package com.revature.services;

public interface CommentService {
	int addComment(String body, int empFrom, int empTo, int formId);
}
