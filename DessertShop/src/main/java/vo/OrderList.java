package vo;

import java.io.Serializable;
import java.util.List;

public class OrderList implements Serializable{
	private List<ContactDessert> orderList;

	public List<ContactDessert> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<ContactDessert> orderList) {
		this.orderList = orderList;
	}

	@Override
	public String toString() {
		return "OrderList [orderList=" + orderList + "]";
	}

}
