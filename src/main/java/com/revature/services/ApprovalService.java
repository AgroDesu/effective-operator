package com.revature.services;

import com.revature.beans.Employee;

public interface ApprovalService {
	int addApproval(int id, Employee approver);
	int rejectForm(int id, Employee approver, String reason);
	int cancelForm(int id, Employee approver);
}
