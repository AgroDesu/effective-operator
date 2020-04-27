package com.revature.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.revature.beans.Employee;
import com.revature.beans.Form;
import com.revature.repositories.FormRepository;

@Service
public class FormServiceSpring implements FormService {
	@Autowired
	FormRepository formRepo;

	@Override
	public int addForm(Form f) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<Form> getForms(Employee e) {
		return formRepo.getForms(e.getId());
	}

	@Override
	public Set<Form> getActionableForms(Employee e) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Form getForm(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int setFormGrade(Form f) {
		// TODO Auto-generated method stub
		return 0;
	}

}
