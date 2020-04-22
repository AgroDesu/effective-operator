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
@Table(name="approvals")
public class Approval {
	@Id
	@SequenceGenerator(name="approvals", sequenceName="approvals_seq", allocationSize=1)
	@GeneratedValue(generator="approvals", strategy=GenerationType.SEQUENCE)
	private int id;
	@ManyToOne
	@JoinColumn(name="approvalstage")
	private ApprovalStage approvalstage;
	@ManyToOne
	@JoinColumn(name="approver")
	private Employee approver;
	
	// GETTERS/SETTERS
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public ApprovalStage getApprovalstage() {
		return approvalstage;
	}
	public void setApprovalstage(ApprovalStage approvalstage) {
		this.approvalstage = approvalstage;
	}
	public Employee getApprover() {
		return approver;
	}
	public void setApprover(Employee approver) {
		this.approver = approver;
	}
}
