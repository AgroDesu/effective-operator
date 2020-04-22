package com.revature.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.revature.beans.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, Long>{
	@Query(value="SELECT * FROM employees e WHERE e.username = :username AND e.pass = :password",
		   nativeQuery = true)
	Employee attemptLogin(
			@Param("username") String username,
			@Param("password") String password
	);
}
