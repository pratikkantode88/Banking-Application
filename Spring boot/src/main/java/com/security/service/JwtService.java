package com.security.service;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.security.entity.User;
import com.security.repository.UserRepository;

@Service
public class JwtService implements UserDetailsService{
	@Autowired
	private UserRepository userRepo;
	

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
		User user=userRepo.findById(username).orElseThrow(()->new UsernameNotFoundException("User Not Found with username : "+username));
		
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),getAuthorities(user));
	}
	
	private Set getAuthorities(User user) {
		Set authorities=new HashSet();
		
		user.getRole().forEach(role -> {
			authorities.add(new SimpleGrantedAuthority("ROLE_"+role.getRoleName()));
		});
		return authorities;
	}

}
