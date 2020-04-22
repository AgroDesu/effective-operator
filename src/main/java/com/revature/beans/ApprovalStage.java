package com.revature.beans;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class ApprovalStage {
	@Id
	private long id;
	private String status;
	
	// GETTERS/SETTERS
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
}
