package com.hand.domain.DTO;

import org.hzero.export.annotation.ExcelColumn;
import org.hzero.export.annotation.ExcelSheet;

import javax.persistence.Id;
import java.math.BigDecimal;
import java.util.Date;

@ExcelSheet(zh = "订单数据", en = "Order record")
public class OrderDTO {
    @Id
    @ExcelColumn(zh = "订单Id", en = "order_Id")
    private Long orderId;
    @ExcelColumn(zh = "销售订单号", en = "order_number")
    private String orderNumber;
    @ExcelColumn(zh = "公司名称", en = "company_name")
    private String companyName;
    @ExcelColumn(zh = "客户名称", en = "customer_name")
    private String customerName;
    @ExcelColumn(zh = "订单日期", en = "order_date")
    private Date orderDate;
    @ExcelColumn(zh = "订单状态", en = "order_status")
    private String orderStatus;
    @ExcelColumn(zh = "订单金额", en = "order_amount")
    private double orderAmount;
    @ExcelColumn(zh = "行号", en = "line_number")
    private String lineNumber;
    @ExcelColumn(zh = "物料编码", en = "item_code")
    private String itemCode;
    @ExcelColumn(zh = "物料描述", en = "item_description")
    private String itemDescription;
    @ExcelColumn(zh = "产品单位", en = "order_quantity_uom")
    private String orderQuantityUom;
    @ExcelColumn(zh = "数量", en = "order_quantity")
    private BigDecimal orderQuantity;
    @ExcelColumn(zh = "销售单价", en = "unit_selling_price")
    private BigDecimal unitSellingPrice;
    @ExcelColumn(zh = "行金额", en = "line_amount")
    private BigDecimal lineAmount;

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

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(double orderAmount) {
        this.orderAmount = orderAmount;
    }

    public String getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(String lineNumber) {
        this.lineNumber = lineNumber;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getOrderQuantityUom() {
        return orderQuantityUom;
    }

    public void setOrderQuantityUom(String orderQuantityUom) {
        this.orderQuantityUom = orderQuantityUom;
    }

    public BigDecimal getOrderQuantity() {
        return orderQuantity;
    }

    public void setOrderQuantity(BigDecimal orderQuantity) {
        this.orderQuantity = orderQuantity;
    }

    public BigDecimal getUnitSellingPrice() {
        return unitSellingPrice;
    }

    public void setUnitSellingPrice(BigDecimal unitSellingPrice) {
        this.unitSellingPrice = unitSellingPrice;
    }

    public BigDecimal getLineAmount() {
        return lineAmount;
    }

    public void setLineAmount(BigDecimal lineAmount) {
        this.lineAmount = lineAmount;
    }
}
