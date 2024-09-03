package com.bank.mapper;

import com.bank.dto.AccountDTO;
import com.bank.entity.Account;

public class AccountMapper {

	public static Account mapToAccount(AccountDTO accountDTO) {

		Account account = new Account(accountDTO.getId(), accountDTO.getAccHolderName(), accountDTO.getBalance());
		return account;
	}

	public static AccountDTO mapToAccountDTO(Account account) {

		AccountDTO accountDTO = new AccountDTO(account.getId(), account.getAccHolderName(), account.getBalance());
		return accountDTO;
	}
}
