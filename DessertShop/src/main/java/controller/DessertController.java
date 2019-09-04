package controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import entity.Cart;
import entity.Dessert;
import entity.User;
import service.AccountService;
import service.DessertService;
import vo.ContactDessert;
import vo.IndexDessert;
import vo.ListDessert;
import vo.OrderList;
import vo.Page;

@Controller
@RequestMapping("/Dessert")
public class DessertController {
	public Logger log = Logger.getLogger(DessertController.class);
	
	@Autowired
	private HttpServletRequest request;

	@Autowired
	private AccountService accountService;

	@Autowired
	private DessertService dessertService;

	@RequestMapping("/")
	public ModelAndView toIndex() {
		ModelAndView mv = new ModelAndView();
		IndexDessert indexDessert = dessertService.indexDessert();
		log.info("#####Desserts=" + indexDessert.getBigDessert());
		mv.addObject("bigDessert", indexDessert.getBigDessert());
		mv.addObject("hotDessert", indexDessert.getHotDessert());
		mv.addObject("newDessert", indexDessert.getNewDessert());
		mv.addObject("cheapDessert", indexDessert.getCheapDessert());
		mv.addObject("expensiveDessert", indexDessert.getExpensiveDessert());
		mv.addObject("clicksDessert", indexDessert.getClicksDessert());
		mv.setViewName("index");
		return mv;
	}

	@RequestMapping("/Index")
	public ModelAndView Index() {
		log.info("#####跳转首页");
		ModelAndView mv = new ModelAndView();
		IndexDessert indexDessert = dessertService.indexDessert();
		log.info("#####bigDessert=" + indexDessert);
		mv.addObject("bigDessert", indexDessert.getBigDessert());
		mv.addObject("hotDessert", indexDessert.getHotDessert());
		mv.addObject("newDessert", indexDessert.getNewDessert());
		mv.addObject("cheapDessert", indexDessert.getCheapDessert());
		mv.addObject("expensiveDessert", indexDessert.getExpensiveDessert());
		log.info("#####expensive=" + indexDessert.getExpensiveDessert());
		mv.addObject("clicksDessert", indexDessert.getClicksDessert());
		log.info("#####clicks=" + indexDessert.getClicksDessert());

		mv.setViewName("index");
		return mv;
	}

	@RequestMapping("/Single")
	public ModelAndView Single(int id) {
		log.info("#####Single ID=" + id);
		ModelAndView mv = new ModelAndView();
		Dessert d = new Dessert();
		d = accountService.singleDessert(id);
		mv.setViewName("single");
		mv.addObject("dessert", d);
		return mv;

	}

	

	@RequestMapping("/Search")
	public ModelAndView search(String keyword,String pageNo,String typeWord) {    //String keyword   String keyword,String pageNo,String typeWord
//		log.info("#####keyword=" + keyword+"pageNo="+pageNo+"typeWord="+typeWord);
		log.info("##### pageNo1="+pageNo);
//		int pageNoInt=Integer.parseInt(pageNo);
//		page.setPageNo(pageNoInt);
		ModelAndView mv = new ModelAndView();
//		ListDessert searchList = new ListDessert();
//		searchList = dessertService.searchList(keyword);
	
		Page page=dessertService.queryDessertByNum(keyword,pageNo,typeWord);
//		log.info("#####分页page内容=" + page.getList());
//		log.info("#####pageNo="+page.getPageNo());
		mv.addObject("page", page);
		mv.setViewName("dessert");
		log.info("#####pageNo4="+page.getPageNo());
//		mv.addObject("searchList", searchList.getSearchDessert());
//		log.info("#####searchList=" + searchList.getSearchDessert());
		return mv;

	}
	
	@RequestMapping("/Query")
	public ModelAndView query(String keyword) {    //String keyword   String keyword,String pageNo,String typeWord
//		log.info("#####keyword=" + keyword+"pageNo="+pageNo+"typeWord="+typeWord);
		String pageNo="null";
		String typeWord="null";
//		int pageNoInt=Integer.parseInt(pageNo);
//		page.setPageNo(pageNoInt);
		ModelAndView mv = new ModelAndView();
//		ListDessert searchList = new ListDessert();
//		searchList = dessertService.searchList(keyword);
	
		Page page=dessertService.queryDessertByNum(keyword,pageNo,typeWord);
//		log.info("#####分页page内容=" + page.getList());
//		log.info("#####pageNo="+page.getPageNo());
		mv.addObject("page", page);
		mv.setViewName("dessert");
		log.info("#####pageNo4="+page.getPageNo());
//		mv.addObject("searchList", searchList.getSearchDessert());
//		log.info("#####searchList=" + searchList.getSearchDessert());
		return mv;

	}
	
	@RequestMapping("/Type")
	public ModelAndView type(String typeWord) {    //String keyword   String keyword,String pageNo,String typeWord
//		log.info("#####keyword=" + keyword+"pageNo="+pageNo+"typeWord="+typeWord);
		String pageNo="null";
		String keyword="null";
//		int pageNoInt=Integer.parseInt(pageNo);
//		page.setPageNo(pageNoInt);
		ModelAndView mv = new ModelAndView();
//		ListDessert searchList = new ListDessert();
//		searchList = dessertService.searchList(keyword);
	
		log.info("#####type="+typeWord);
		Page page=dessertService.queryDessertByNum(keyword,pageNo,typeWord);
//		log.info("#####分页page内容=" + page.getList());
//		log.info("#####pageNo="+page.getPageNo());
		mv.addObject("page", page);
		mv.setViewName("dessert");
//		log.info("#####pageNo4="+page.getPageNo());
//		mv.addObject("searchList", searchList.getSearchDessert());
//		log.info("#####searchList=" + searchList.getSearchDessert());
		return mv;

	}
	
//	@RequestMapping("/Type")
//	public ModelAndView type(String keyword) {  //HttpServletRequest request
//		log.info("#####keyword=" + keyword);
//		ModelAndView mv = new ModelAndView();
//		ListDessert searchList = new ListDessert();
//		searchList = dessertService.searchType(keyword);
//		log.info("#####searchList=" + searchList.getSearchDessert());
//		mv.setViewName("dessert");
//		mv.addObject("searchList", searchList.getSearchDessert());
//		
//		return mv;
//
//	}
	
	

	@RequestMapping("/Cart")
	public ModelAndView cart(String userId, String dessertId, String num) {
		ModelAndView mv = new ModelAndView();
		log.info("#####开始添加购物车");
		log.info("#####userId="+userId+"dessertId="+dessertId+"num="+num);
		boolean hasDessert = dessertService.querySameDessert(userId, dessertId);
		log.info("#####hasDessert="+hasDessert);
		if (hasDessert) {
			log.info("#####有相同cart");
			boolean isAddNum=dessertService.addNum(userId,dessertId,num);
			if(isAddNum) {
				log.info("#####购物车添加成功");
				List<Dessert> carts = dessertService.queryCart(userId);
				log.info("#####carts=" + carts);
				List<Cart> cartNum=dessertService.queryCartNum(userId);
				log.info("#####cartNum="+cartNum);
				mv.addObject("userId", userId);
			    mv.addObject("carts", carts);
			    log.info("!@$#$%%^"+carts.get(0).getName());
				mv.addObject("cartNum", cartNum);
				mv.setViewName("contact");
				log.info("#####添加结束");
				return mv;
				
			}
			else {
				log.info("#####购物车添加失败");
				mv.setViewName("login");
				return mv;	
			}

		} else {
			log.info("#####没有相同cart");
			boolean isCart = dessertService.addCart(userId, dessertId, num);
			log.info("#####isCart=" + isCart);
			if (isCart) {
				log.info("#####购物车添加成功");
				mv.addObject("userId", userId);
				List<Dessert> carts = dessertService.queryCart(userId);
				log.info("#####carts=" + carts);
				List<Cart> cartNum=dessertService.queryCartNum(userId);
				log.info("#####cartNum="+cartNum);

				mv.addObject("carts", carts);
				log.info("!@$#$%%^"+carts.get(0).getName());
				mv.addObject("cartNum", cartNum);
				mv.setViewName("contact");
				log.info("#####添加结束");
				return mv;

			} else {
				log.info("#####购物车添加失败");
				mv.setViewName("login");
				return mv;

			}

		}

	}
	
	@RequestMapping("/Order")
	@ResponseBody
	public String order(@RequestBody OrderList orderList) {    //HttpServletRequest request
		log.info("#####orderList="+orderList);
		
		for(ContactDessert contactDessert:orderList.getOrderList()) {
//			log.info("#####orderListDetails="+contactDessert);
//			log.info("#####userId="+contactDessert.getUserId());
//			log.info("#####"+contactDessert.getName());
//			log.info("#####"+contactDessert.getNum());
//			log.info("#####IsChoose="+contactDessert.getIsChoose());
			dessertService.addOrder(contactDessert);
			
//			int isChoose=Integer.parseInt(contactDessert.getIsChoose());
//			if(isChoose==1) {
//				String money=contactDessert.getMoney();	
//				log.info("#####money="+money);
//				sum=sum+Double.valueOf(money.toString());
//				
//			}
		}
		
		return "success";
		
	}
	@RequestMapping("/ToOrder")
	public ModelAndView toOrder() {
		ModelAndView mv=new ModelAndView();
		HttpSession session=request.getSession();
		
		User u=(User) session.getAttribute("user");
		int userId=u.getId();
		log.info("#####Order userid="+userId);
		OrderList orderList=dessertService.selectOrder(userId);
		log.info("#####OrderList="+orderList);
		mv.setViewName("order");
		mv.addObject("orderList", orderList);
		return mv;
		
	}
	


}
