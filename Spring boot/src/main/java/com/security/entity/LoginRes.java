package com.security.entity;

public class LoginRes {

	private String jwtToken;
	private User user;

	public LoginRes() {
		// TODO Auto-generated constructor stub
	}

	public LoginRes(String jwtToken, User user) {
		super();
		this.jwtToken = jwtToken;
		this.user = user;
	}

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
