package com.revature.beans;

import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name="forms")
public class Form {
	@Id
	@SequenceGenerator(name="forms", sequenceName="forms_seq", allocationSize=1)
	@GeneratedValue(generator="forms", strategy=GenerationType.SEQUENCE)
	private long id;
	@ManyToOne
	@JoinColumn(name="employee")
	private Employee employee;
	@ManyToOne
	@JoinColumn(name="eventtype")
	private EventType eventtype;
	private Date eventdate;
	private String eventlocation;
	private String eventdesc;
	@ManyToOne
	@JoinColumn(name="gradingformat")
	private GradingFormat gradingformat;
	private String grade;
	private String reason;
	private double eventcost;
	private Boolean urgent;
	private Date submissiondate;
	@OneToMany
	@JoinColumn(name="form_id")
	private List<Comment> comments;
	@OneToMany
	@JoinColumn(name="form_id")
	private List<Approval> approvals;
	
	// GETTERS/SETTERS
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public double getEventcost() {
		return eventcost;
	}
	public void setEventcost(double eventcost) {
		this.eventcost = eventcost;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public EventType getEventtype() {
		return eventtype;
	}
	public void setEventtype(EventType eventtype) {
		this.eventtype = eventtype;
	}
	public Date getEventdate() {
		return eventdate;
	}
	public void setEventdate(Date eventdate) {
		this.eventdate = eventdate;
	}
	public String getEventlocation() {
		return eventlocation;
	}
	public void setEventlocation(String eventlocation) {
		this.eventlocation = eventlocation;
	}
	public String getEventdesc() {
		return eventdesc;
	}
	public void setEventdesc(String eventdesc) {
		this.eventdesc = eventdesc;
	}
	public GradingFormat getGradingformat() {
		return gradingformat;
	}
	public void setGradingformat(GradingFormat gradingformat) {
		this.gradingformat = gradingformat;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	public Boolean getUrgent() {
		return urgent;
	}
	public void setUrgent(Boolean urgent) {
		this.urgent = urgent;
	}
	public Date getSubmissiondate() {
		return submissiondate;
	}
	public void setSubmissiondate(Date submissiondate) {
		this.submissiondate = submissiondate;
	}
	public List<Comment> getComments() {
		return comments;
	}
	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	public List<Approval> getApprovals() {
		return approvals;
	}
	public void setApprovals(List<Approval> approvals) {
		this.approvals = approvals;
	}
}
