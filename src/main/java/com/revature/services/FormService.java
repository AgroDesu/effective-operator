package com.revature.services;

import java.util.List;
import java.util.Set;

import com.revature.beans.Employee;
import com.revature.beans.Form;

public interface FormService {
	int addForm(Form f);
	List<Form> getForms(Employee e);
	Set<Form> getActionableForms(Employee e);
	Form getForm(int id);
	int setFormGrade(Form f);
}
