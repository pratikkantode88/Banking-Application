package com.bank.service;

import java.util.List;

import com.bank.dto.AccountDTO;

public interface AccountService {

	AccountDTO createAccount(AccountDTO account);
	AccountDTO accountGetById(long id);
	AccountDTO deposit(long id,double ammount);
	AccountDTO withdraw(long id,double ammount);
	List<AccountDTO> getAllAccount();
	void delete(long id);
}
