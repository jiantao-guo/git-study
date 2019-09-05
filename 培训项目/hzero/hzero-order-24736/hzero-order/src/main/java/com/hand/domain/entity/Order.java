package com.hand.domain.entity;


import javax.persistence.Id;
import java.util.Date;

public class Order {

    @Id
    private Long orderId;
    private String orderNumber;
    private String companyName;
    private String customerName;
    private Date orderDate;
    private String orderStatues;
    private double orderMoney;

    public double getOrderMoney() {
        return orderMoney;
    }

    public void setOrderMoney(double orderMoney) {
        this.orderMoney = orderMoney;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    public String getOrderStatues() {
        return orderStatues;
    }

    public void setOrderStatues(String orderStatues) {
        this.orderStatues = orderStatues;
    }


}
