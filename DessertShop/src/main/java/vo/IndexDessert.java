package vo;

import java.util.List;

import entity.Dessert;

public class IndexDessert {
	
	private List<Dessert> bigDessert;
	private List<Dessert> hotDessert;
	private List<Dessert> newDessert;
	private List<Dessert> cheapDessert;
	private List<Dessert> clicksDessert;
	private List<Dessert> expensiveDessert;
	
	public List<Dessert> getClicksDessert() {
		return clicksDessert;
	}
	public void setClicksDessert(List<Dessert> clicksDessert) {
		this.clicksDessert = clicksDessert;
	}
	public List<Dessert> getExpensiveDessert() {
		return expensiveDessert;
	}
	public void setExpensiveDessert(List<Dessert> expensiveDessert) {
		this.expensiveDessert = expensiveDessert;
	}
	public List<Dessert> getBigDessert() {
		return bigDessert;
	}
	public void setBigDessert(List<Dessert> bigDessert) {
		this.bigDessert = bigDessert;
	}
	public List<Dessert> getHotDessert() {
		return hotDessert;
	}
	public void setHotDessert(List<Dessert> hotDessert) {
		this.hotDessert = hotDessert;
	}
	public List<Dessert> getNewDessert() {
		return newDessert;
	}
	public void setNewDessert(List<Dessert> newDessert) {
		this.newDessert = newDessert;
	}
	public List<Dessert> getCheapDessert() {
		return cheapDessert;
	}
	public void setCheapDessert(List<Dessert> cheapDessert) {
		this.cheapDessert = cheapDessert;
	}
	

}
