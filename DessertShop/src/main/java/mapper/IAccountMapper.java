package mapper;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import entity.User;

@Repository
public interface IAccountMapper {
	
	public int isUser(String usrname);

	public void insertUser(User u);

	public User loginUser( @Param("username") String username,@Param("password") String password);

}
