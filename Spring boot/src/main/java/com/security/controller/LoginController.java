package com.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.entity.LoginReq;
import com.security.entity.LoginRes;
import com.security.entity.User;
import com.security.repository.UserRepository;
import com.security.service.JwtService;
import com.security.service.UserService;
import com.security.util.JwtUtil;

import jakarta.annotation.PostConstruct;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class LoginController {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@PostConstruct
	public void init() {
		this.userService.initRolesAdUser();
	}
	
	@PostMapping("/login")
	public ResponseEntity<LoginRes> login(@RequestBody LoginReq loginReq){
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getUsername(), loginReq.getPassword()));
		} catch (AuthenticationException e) {
                 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		UserDetails userDetails;
		try {
			  userDetails=jwtService.loadUserByUsername(loginReq.getUsername());
			  
		} catch (UsernameNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		  
		String jwtToken=jwtUtil.generateToken(userDetails.getUsername());
		User user=userRepository.findById(loginReq.getUsername()).get();
		return ResponseEntity.ok(new LoginRes(jwtToken,user));
	}
}
