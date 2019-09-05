package com.hand.domain.DTO;

//import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

public class OrderImport {
//    @Id
//    private Long orderId;
    private String orderNumber;
    private String companyNumber;
    private Date orderDate;
    private String orderStatus;
    private String customerNumber;
    private Long lineNumber;
    private String itemCode;
    private BigDecimal orderQuantity;
    private String orderQuantityUom;
    private BigDecimal unitSellingPrice;


//    public Long getOrderId() {
//        return orderId;
//    }
//
//    public void setOrderId(Long orderId) {
//        this.orderId = orderId;
//    }


    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getCompanyNumber() {
        return companyNumber;
    }

    public void setCompanyNumber(String companyNumber) {
        this.companyNumber = companyNumber;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getCustomerNumber() {
        return customerNumber;
    }

    public void setCustomerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
    }

    public Long getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(Long lineNumber) {
        this.lineNumber = lineNumber;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public BigDecimal getOrderQuantity() {
        return orderQuantity;
    }

    public void setOrderQuantity(BigDecimal orderQuantity) {
        this.orderQuantity = orderQuantity;
    }

    public String getOrderQuantityUom() {
        return orderQuantityUom;
    }

    public void setOrderQuantityUom(String orderQuantityUom) {
        this.orderQuantityUom = orderQuantityUom;
    }

    public BigDecimal getUnitSellingPrice() {
        return unitSellingPrice;
    }

    public void setUnitSellingPrice(BigDecimal unitSellingPrice) {
        this.unitSellingPrice = unitSellingPrice;
    }
}
