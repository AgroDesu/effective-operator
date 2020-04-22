package com.revature.services;

import com.revature.beans.Employee;

public interface EmployeeService {
	public Employee getEmployee(String username, String password);
	public Employee getEmployeeById(long id);
}
