package com.revature.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.revature.beans.Form;

public interface FormRepository extends CrudRepository<Form, Long> {
	@Query(value="SELECT * FROM forms f WHERE f.employee = :empId", nativeQuery = true)
	List<Form> getForms(@Param("empId") long empId);
}
