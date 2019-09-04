package service;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import entity.Dessert;
import entity.User;
import mapper.IAccountMapper;
import mapper.IDessertMapper;

@Service
public class AccountService {
	public Logger log = Logger.getLogger(AccountService.class);

	@Autowired
	IAccountMapper iAccountMapper;
	
	@Autowired
	IDessertMapper iDessertMapper;

	public boolean isUser(String username) {

		int num = iAccountMapper.isUser(username);
		if (num < 1)
			return false;
		else
			return true;
	}

	public void addUser(String username,String password) {
		
		User u = new User();
		u.setUsername(username);
		u.setPassword(password);
		u.setUserType(1);
		iAccountMapper.insertUser(u);
	}

	public User loginUser(String username, String password) {
		User u=iAccountMapper.loginUser(username,password);
		return u;
		
	}

	public Dessert singleDessert(int id) {
		Dessert d=iDessertMapper.singleDessert(id);
		return d;
	}

}
