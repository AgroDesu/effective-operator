package com.revature.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.beans.Employee;
import com.revature.repositories.EmployeeRepository;

@Service
public class EmployeeServiceSpring implements EmployeeService {
	@Autowired
	EmployeeRepository employeeRepository;

	@Override
	public Employee getEmployee(String username, String password) {
		return employeeRepository.attemptLogin(username, password);
	}

	@Override
	public Employee getEmployeeById(long id) {
		// Either returns the requested Employee or null
		return employeeRepository.findById(id).orElse(null);
	}

}
