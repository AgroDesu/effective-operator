package com.revature.repositories;

import org.springframework.data.repository.CrudRepository;

import com.revature.beans.Department;

public interface DepartmentRepository extends CrudRepository<Department, Long> {
	

}
