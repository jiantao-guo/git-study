package mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import entity.Cart;
import entity.Dessert;
import vo.ContactDessert;
import vo.OrderList;

@Repository
public interface IDessertMapper {
	List<Dessert> selectBigDessert();

	List<Dessert> selectHotDessert();

	List<Dessert> selectNewDessert();

	List<Dessert> selectCheapDessert();
	
	List<Dessert> selectClicksDessert();
	
	List<Dessert> selectExpensiveDessert();


	Dessert singleDessert(int id);

	List<Dessert> searchDessert(@Param("keyword") String keyword);
	List<Dessert> searchType(@Param("keyword") String keyword);

//	void addCart(@Param("userId") String userId,@Param("dessertId") String dessertId,@Param("num") String num);

	void addCart(Cart cart);

	List<Cart> queryCart(@Param("userId") String userId);

	Dessert queryDessert(@Param("dessertId") int dessertId);

	List<Cart> queryCartNum(@Param("userId") String userId);

	int querySameDessert(@Param("userId") String userId,@Param("dessertId") String dessertId);

	void addNum(Cart cart);

	void addOrder(ContactDessert contactDessert);

	List<ContactDessert> selectOrder(@Param("userId") int userId);

	int countDessert();

	List<Dessert> queryDessertByLimit(@Param("keyword") String keyword,  @Param("typeWord") String typeWord,@Param("start") int start,@Param("count") int count);

//	List<Dessert> queryDessertByLimit(Map<String,Object> param);
	
	

}
