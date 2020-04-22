package com.revature.beans;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="departments")
public class Department {
	@Id
	@SequenceGenerator(name="departments", sequenceName="departments_seq", allocationSize=1)
	@GeneratedValue(generator="departments", strategy=GenerationType.SEQUENCE)
	private long id;
	private String name;
	@OneToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="departmenthead")
	@JsonBackReference
	private Employee head;
	
	// GETTERS/SETTERS
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Employee getHead() {
		return head;
	}
	public void setHead(Employee head) {
		this.head = head;
	}
}
