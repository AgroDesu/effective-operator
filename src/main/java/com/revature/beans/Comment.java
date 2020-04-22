package com.revature.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="comments")
public class Comment {
	@Id
	@SequenceGenerator(name="comments", sequenceName="comments_seq", allocationSize=1)
	@GeneratedValue(generator="comments", strategy=GenerationType.SEQUENCE)
	private int id;
	private String commentBody;
	@ManyToOne
	@JoinColumn(name="emp_from")
	private Employee empFrom;
	@ManyToOne
	@JoinColumn(name="emp_to")
	private Employee empTo;
	
	// GETTERS/SETTERS
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCommentBody() {
		return commentBody;
	}
	public void setCommentBody(String commentBody) {
		this.commentBody = commentBody;
	}
	public Employee getEmpFrom() {
		return empFrom;
	}
	public void setEmpFrom(Employee empFrom) {
		this.empFrom = empFrom;
	}
	public Employee getEmpTo() {
		return empTo;
	}
	public void setEmpTo(Employee empTo) {
		this.empTo = empTo;
	}
}
