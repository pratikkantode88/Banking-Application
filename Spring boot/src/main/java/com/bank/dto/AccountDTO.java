package com.bank.dto;

public class AccountDTO {

	private Long id;
	private String accHolderName;
	private Double balance;
	
	public AccountDTO() {
      super();
	}

	public AccountDTO(Long id, String accHolderName, Double balance) {
		super();
		this.id = id;
		this.accHolderName = accHolderName;
		this.balance = balance;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAccHolderName() {
		return accHolderName;
	}

	public void setAccHolderName(String accHolderName) {
		this.accHolderName = accHolderName;
	}

	public Double getBalance() {
		return balance;
	}

	public void setBalance(Double balance) {
		this.balance = balance;
	}

	@Override
	public String toString() {
		return "AccountDTO [id=" + id + ", accHolderName=" + accHolderName + ", balance=" + balance + "]";
	}
	
}
