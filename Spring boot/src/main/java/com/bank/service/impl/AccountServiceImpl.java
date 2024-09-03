package com.bank.service.impl;

import java.util.ArrayList;
import java.util.List;import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dto.AccountDTO;
import com.bank.entity.Account;
import com.bank.exception.ResourceNotFoundException;
import com.bank.mapper.AccountMapper;
import com.bank.repository.AccountRepository;
import com.bank.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{

	@Autowired
	private AccountRepository accountRepository;
	
	@Override
	public AccountDTO createAccount(AccountDTO accountDTO) {

		Account account=AccountMapper.mapToAccount(accountDTO);
		AccountDTO resultAccountDTO=AccountMapper.mapToAccountDTO(accountRepository.save(account));
		return  resultAccountDTO;
	}

	@Override
	public AccountDTO accountGetById(long id) {
		Account getAccount=accountRepository.findById(id).orElseThrow(()->new RuntimeException("account not found with id :"+id));
		AccountDTO resultAccountDTO=AccountMapper.mapToAccountDTO(getAccount);
		
		return resultAccountDTO;
	}

	@Override
	public AccountDTO deposit(long id, double ammount) {
		Account getAccount=accountRepository.findById(id).orElseThrow(()->new RuntimeException("account not found with id :"+id));
		if(ammount>100000) {
			throw new ResourceNotFoundException("Enter Ammount is greater than 100000");
		}
		getAccount.setBalance(getAccount.getBalance()+ammount);
		AccountDTO resultAccountDTO=AccountMapper.mapToAccountDTO(accountRepository.save(getAccount));
		return resultAccountDTO;
	}

	@Override
	public AccountDTO withdraw(long id, double ammount) {
		Account getAccount=accountRepository.findById(id).orElseThrow(()->new RuntimeException("account not found with id :"+id));
		double remaining=getAccount.getBalance()-ammount;
		if(ammount>getAccount.getBalance()) {
			throw new ResourceNotFoundException("Insufficient Balance!");
		}else if (ammount>100000) {
			throw new ResourceNotFoundException("Withdraw Ammount is Restricted Above 100000");
		}else if(remaining < 1000) {
			throw new ResourceNotFoundException("Required Ammount in Bank is 1000");
		}
		getAccount.setBalance(remaining);
		AccountDTO resultAccountDTO=AccountMapper.mapToAccountDTO(accountRepository.save(getAccount));
		return resultAccountDTO;
	}

	@Override
	public List<AccountDTO> getAllAccount() {
		return accountRepository.findAll().stream()
				.map((account)->AccountMapper.mapToAccountDTO(account))
				.collect(Collectors.toList());
		 
	}

	@Override
	public void delete(long id) {
		Account getAccount=accountRepository.findById(id).orElseThrow(()->new RuntimeException("account not found with id :"+id));
		accountRepository.delete(getAccount);
		
	}

}
