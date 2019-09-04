package vo;

import java.util.List;

import entity.Dessert;


public class Page {
	private int pageNo;// 当前第几页
	private int totalPage;// 总页数

	private int pageCount;// 总条数

	private List<Dessert> list;// 商品集合

	
	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public List<Dessert> getList() {
		return list;
	}

	public void setList(List<Dessert> list) {
		this.list = list;
	}

	@Override
	public String toString() {
		return "Page [pageNo=" + pageNo + ", totalPage=" + totalPage + ", pageCount=" + pageCount + ", list=" + list
				+ "]";
	}
	
	public Page(int pageNo, int totalPage, int pageCount, List<Dessert> list) {
		super();
		this.pageNo = pageNo;
		this.totalPage = totalPage;
		this.pageCount = pageCount;
		this.list = list;
	}

	public Page() {
		super();
	}

	

}
