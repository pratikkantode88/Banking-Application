package com.security.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.security.entity.Roles;
import com.security.entity.User;
import com.security.repository.RolesRepository;
import com.security.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
   private UserRepository userRepository;
	
	@Autowired
	private RolesRepository rolesRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
   
	
	public void initRolesAdUser() {
		Roles adminRoles=new Roles();
		adminRoles.setRoleName("admin");
		adminRoles.setDescription("admin role");
		rolesRepository.save(adminRoles);
		
	
		
		User adminUser =new User();
		adminUser.setUsername("admin123");
		adminUser.setFirstname("pratik");
		adminUser.setLastname("kantode");
		adminUser.setPassword(passwordEncoder.encode("12345"));
		Set<Roles> adminRole=new HashSet<Roles>();
		adminRole.add(adminRoles);
		adminUser.setRole(adminRole);
		userRepository.save(adminUser);
	}
}
