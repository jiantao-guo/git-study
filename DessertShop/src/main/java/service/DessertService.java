package service;

import java.util.HashMap;
import java.util.ArrayList;
import java.util.List;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import vo.Page;
import entity.Cart;
import entity.Dessert;

import mapper.IDessertMapper;
import util.StringUtil;
import vo.ContactDessert;
import vo.IndexDessert;
import vo.ListDessert;
import vo.OrderList;

@Service
public class DessertService {

	public Logger log = Logger.getLogger(DessertService.class);

	@Autowired
	IDessertMapper iDessertMapper;

	public IndexDessert indexDessert() {

		List<Dessert> bigDessert = iDessertMapper.selectBigDessert();
		List<Dessert> hotDessert = iDessertMapper.selectHotDessert();
		List<Dessert> newDessert = iDessertMapper.selectNewDessert();
		List<Dessert> cheapDessert = iDessertMapper.selectCheapDessert();
		List<Dessert> expensiveDessert = iDessertMapper.selectExpensiveDessert();
		List<Dessert> clicksDessert = iDessertMapper.selectClicksDessert();

		IndexDessert desserts = new IndexDessert();

		desserts.setBigDessert(bigDessert);
		desserts.setHotDessert(hotDessert);
		desserts.setNewDessert(newDessert);
		desserts.setCheapDessert(cheapDessert);
		desserts.setExpensiveDessert(expensiveDessert);
		desserts.setClicksDessert(clicksDessert);
		return desserts;
	}

	public ListDessert searchList(String keyword) {

		List<Dessert> searchDessert = iDessertMapper.searchDessert(keyword);

		ListDessert desserts = new ListDessert();
		desserts.setSearchDessert(searchDessert);

		return desserts;
	}

	public ListDessert searchType(String keyword) {

		List<Dessert> searchDessert = iDessertMapper.searchType(keyword);

		log.info("#####searchDessert="+searchDessert);
		ListDessert desserts = new ListDessert();
		desserts.setSearchDessert(searchDessert);

		return desserts;
	}

	public boolean addCart(String userId, String dessertId, String num) {

		Cart cart = new Cart();
		int UserId = Integer.parseInt(userId);
		int DesserId = Integer.parseInt(dessertId);
		int Num = Integer.parseInt(num);

		cart.setUserId(UserId);
		cart.setDessertId(DesserId);
		cart.setNum(Num);
		/*
		 * String user=cart.getUserId()+""; String dessert=cart.getDessertId()+"";
		 * String Num=cart.getNum()+"";
		 */
		log.info("#####开始addCart");
		if (userId == "" || dessertId == "" || num == "" || userId == null || dessertId == null || num == null) {
			log.info("#####addCart fail");
			return false;
		}

		else {
			iDessertMapper.addCart(cart);
			log.info("#####addCart succeed");
			return true;
		}

	}

	public List<Dessert> queryCart(String userId) {

		List<Cart> carts = iDessertMapper.queryCart(userId);
		int dessertId = 0;

		List<Dessert> desserts = new ArrayList<>();
		
		for (int i = 0; i < carts.size(); i++) {
			dessertId = carts.get(i).getDessertId();
			

			desserts.add(i, iDessertMapper.queryDessert(dessertId));

		}

		return desserts;
	}

	public List<Cart> queryCartNum(String userId) {

		List<Cart> dessertNum = iDessertMapper.queryCartNum(userId);

		return dessertNum;

	}

	public boolean querySameDessert(String userId, String dessertId) {

		int same = iDessertMapper.querySameDessert(userId, dessertId);
		if (same > 0) {
			return true;
		} else
			return false;
	}

	public boolean addNum(String userId, String dessertId, String num) {
		if (userId == "" || dessertId == "" || num == "" || userId == null || dessertId == null || num == null) {
			log.info("#####addNum fail");
			return false;
		}

		else {
			Cart cart = new Cart();
			int UserId = Integer.parseInt(userId);
			int DessertId = Integer.parseInt(dessertId);
			int Num = Integer.parseInt(num);
			cart.setUserId(UserId);
			cart.setDessertId(DessertId);
			cart.setNum(Num);
			iDessertMapper.addNum(cart);
			return true;
		}

	}

	public void addOrder(ContactDessert contactDessert) {
		ContactDessert c = new ContactDessert();
		c.setAllMoney(contactDessert.getAllMoney());
		int isChoose = Integer.parseInt(contactDessert.getIsChoose());
		if (isChoose == 1) {
			c.setIsChoose("已结算");
		} else
			c.setIsChoose("未结算");

		c.setMoney(contactDessert.getMoney());
		c.setName(contactDessert.getName());
		c.setNum(contactDessert.getNum());
		c.setPrice(contactDessert.getPrice());
		c.setRebate(contactDessert.getRebate());
		c.setType(contactDessert.getType());
		c.setUserId(contactDessert.getUserId());
		log.info("#####userid in service=" + c.getUserId());
		iDessertMapper.addOrder(c);
		log.info("#####add order success");
	}

	public OrderList selectOrder(int userId) {
		log.info("#####order service start");
		List<ContactDessert> orders = iDessertMapper.selectOrder(userId);
		OrderList orderList = new OrderList();
		orderList.setOrderList(orders);
		log.info("#####service select order end");
		return orderList;

	}

	public Page queryDessertByNum(String keyword,String pageNo,String typeWord) {
//		Map<String, Object> param = new HashMap<String, Object>();
		Page page = new Page();
//		String pageNoStr = request.getParameter("pageNo");// 第一次为空
		
		if (pageNo.equals("null")) {
			pageNo = "1";
			log.info("#####pageNOisnull");
		}
		int pageNoInt = Integer.valueOf(pageNo);// 转成int类型
		
		int totalCount = iDessertMapper.countDessert();// 获取总条数
		log.info("#####totalCount="+totalCount);
		int totalPage = (totalCount - 1) / 9 + 1;// 计算总页数
		if (pageNoInt < 1) {
			pageNoInt = 1;
		} else if (pageNoInt > totalPage) {
			pageNoInt = totalPage;
		}
		
		log.info("#####pageNo2="+pageNoInt);
		
		int start = (pageNoInt - 1) * 9; // 开始位置
		log.info("#####start="+start);
		int count = 9;
		log.info("#####count="+count);
//		String keyword=request.getParameter("keyword");
//		String typeWord=request.getParameter("typeWord");
//		log.info("#####keyword="+keyword);
		log.info("#####typeWord="+typeWord);
//		if (!StringUtil.isNull(keyword)) {
//			param.put("keyword", keyword);
//		}
//		if (!StringUtil.isNull(typeWord)) {
//			param.put("typeWord", typeWord);
//		}
		
//		request.setAttribute("param", param);
//		request.setAttribute("keyword", keyword);
//		request.setAttribute("typeWord", typeWord);
//		param.put("count", count);
//		param.put("start", start);
		
		List<Dessert> pageDessert = iDessertMapper.queryDessertByLimit(keyword,typeWord,start,count);
		log.info("pageDessert="+pageDessert);
		page.setPageNo(pageNoInt);
		log.info("#####pageNo3="+page.getPageNo());
		page.setList(pageDessert);
		
		return page;
	}

}
