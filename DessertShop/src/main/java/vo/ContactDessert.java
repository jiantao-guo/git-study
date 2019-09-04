package vo;

import java.io.Serializable;

public class ContactDessert implements Serializable{
	
	private String userId;
	private String name;
	private String type;
	private String price;
	private String rebate;
	private String money;
	private String num;
	private String allMoney;
	private String isChoose;
	
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getRebate() {
		return rebate;
	}
	public void setRebate(String rebate) {
		this.rebate = rebate;
	}
	public String getMoney() {
		return money;
	}
	public void setMoney(String money) {
		this.money = money;
	}
	public String getNum() {
		return num;
	}
	public void setNum(String num) {
		this.num = num;
	}
	public String getAllMoney() {
		return allMoney;
	}
	public void setAllMoney(String allMoney) {
		this.allMoney = allMoney;
	}
	public String getIsChoose() {
		return isChoose;
	}
	public void setIsChoose(String isChoose) {
		this.isChoose = isChoose;
	}
	@Override
	public String toString() {
		return "ContactDessert [userId=" + userId + ", name=" + name + ", type=" + type + ", price=" + price
				+ ", rebate=" + rebate + ", money=" + money + ", num=" + num + ", allMoney=" + allMoney + ", isChoose="
				+ isChoose + "]";
	}
	
	

}
