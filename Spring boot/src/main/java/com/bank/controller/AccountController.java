package com.bank.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dto.AccountDTO;
import com.bank.service.impl.AccountServiceImpl;

@RestController
@CrossOrigin
@RequestMapping("/account")
@PreAuthorize("hasRole('admin')")
public class AccountController {

	@Autowired
	private AccountServiceImpl accountServiceImpl;
	
	@PostMapping("/save")
	public ResponseEntity<AccountDTO>  saveAccount(@RequestBody AccountDTO accountDTO) {
		AccountDTO saveAcc= accountServiceImpl.createAccount(accountDTO);
		return new ResponseEntity<>( saveAcc,HttpStatus.CREATED);
	}
	
	@GetMapping("/getById/{id}")
	public ResponseEntity<AccountDTO> accountGetById(@PathVariable long id){
		AccountDTO getAcc=accountServiceImpl.accountGetById(id);
		return new ResponseEntity<>(getAcc,HttpStatus.ACCEPTED);
	}
	
	@PutMapping("/deposit/{id}")
	public ResponseEntity<AccountDTO>  deposit(@PathVariable long id,@RequestBody Map<String, Double> req){
		AccountDTO getAcc=accountServiceImpl.deposit(id, req.get("ammount"));
		return new ResponseEntity<>(getAcc,HttpStatus.OK);
	}
	
	@PutMapping("/withdraw/{id}")
	public ResponseEntity<AccountDTO>  withdraw(@PathVariable long id,@RequestBody Map<String, Double> req){
		AccountDTO getAcc=accountServiceImpl.withdraw(id, req.get("ammount"));
		return new ResponseEntity<>(getAcc,HttpStatus.OK);
	}
	
	@GetMapping()
	public ResponseEntity<List<AccountDTO>> getAllAccounts(){
		List<AccountDTO> getList=accountServiceImpl.getAllAccount();
		return new ResponseEntity<>(getList,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteAccount(@PathVariable long id){
		accountServiceImpl.delete(id);
		return new ResponseEntity<>("Account deleted Successfully!",HttpStatus.NO_CONTENT);
	}
}
