package com.revature.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.revature.beans.Employee;
import com.revature.beans.Form;
import com.revature.beans.FormFields;
import com.revature.services.EmployeeService;
import com.revature.services.FormService;

@RestController
public class FrontController {
	@Autowired
	EmployeeService empService;
	@Autowired
	FormService formService;
	
	@GetMapping("/login")
	public ResponseEntity<Employee> checkLoggedIn(HttpSession session) {
		// Check if employee is already logged in
		if (session.getAttribute("logged") != null) {
			return ResponseEntity.ok((Employee) session.getAttribute("logged"));
		} else {
			return ResponseEntity.noContent().build();
		}
	}
	
	@PostMapping("/login")
	public ResponseEntity<Employee> attemptLogin(@RequestBody FormFields[] loginForm, HttpSession session) {
		// Check if employee is already logged in
		if (session.getAttribute("logged") != null) {
			return ResponseEntity.ok((Employee) session.getAttribute("logged"));
		}
		// Check if employee login credentials are valid
		System.out.println(loginForm[0].value);
		System.out.println(loginForm[1].value);
		Employee emp = empService.getEmployee(loginForm[0].value, loginForm[1].value);
		if (emp == null) {
			// Employee not found
			System.out.println("Not found");
			return ResponseEntity.notFound().build();
		} else {
			// Employee found; save to session
			System.out.println("Logged in");
			session.setAttribute("logged", emp);
			return ResponseEntity.ok(emp);
		}
	}
	
	@DeleteMapping("/logout")
	public ResponseEntity<Employee> logout(HttpSession session) {
		System.out.println("Attempting log out.");
		session.removeAttribute("logged");
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("/getforms")
	public ResponseEntity<List<Form>> getForms(HttpSession session) {
		// Check if employee is logged in
		if (session.getAttribute("logged") == null) {
			return ResponseEntity.noContent().build();
		}
		
		Employee emp = (Employee) session.getAttribute("logged");
		List<Form> forms = formService.getForms(emp);
		
		if (forms != null && forms.size() > 0) {
			return ResponseEntity.ok(forms);
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}
