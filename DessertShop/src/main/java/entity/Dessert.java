package entity;

import java.util.Date;

public class Dessert {
	private int id;
	private String name;
	private String type;
	private Date time;
	private int rebate;
	private int clicks;
	private double price;
	private String details;
	private int num;
	private String pic;
	
	
	
	
	public String getPic() {
		return pic;
	}
	public void setPic(String pic) {
		this.pic = pic;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		
		this.details = details;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
	}
	public int getRebate() {
		return rebate;
	}
	public void setRebate(int rebate) {
		this.rebate = rebate;
	}
	public int getClicks() {
		return clicks;
	}
	public void setClicks(int clicks) {
		this.clicks = clicks;
	}
	@Override
	public String toString() {
		return "Dessert [id=" + id + ", name=" + name + ", type=" + type + ", time=" + time + ", rebate=" + rebate
				+ ", clicks=" + clicks + ", price=" + price + ", details=" + details + ", num=" + num + ", pic=" + pic
				+ "]";
	}
	

}
