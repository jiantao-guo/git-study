package com.hand.order.api.dto;

import org.hzero.export.annotation.ExcelColumn;
import org.hzero.export.annotation.ExcelSheet;

import javax.persistence.Id;
import java.util.Date;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/6
 */
@ExcelSheet(zh = "销售订单导出", en = "Export of Sales Order")
public class HodrExportDto {
    @Id
    @ExcelColumn(zh = "销售订单号",en = "orderNumber")
    private String orderNumber;
    @ExcelColumn(zh = "公司名称",en = "companyName")
    private String companyName;
    @ExcelColumn(zh = "客户名称",en = "customerName")
    private String customerName;
    @ExcelColumn(zh = "订单日期",en = "orderDate")
    private Date orderDate;
    @ExcelColumn(zh = "订单状态",en = "orderStatus")
    private String orderStatus;
    @ExcelColumn(zh = "订单金额",en = "orderAmount")
    private Double orderAmount;
    @ExcelColumn(zh = "行号",en = "lineNumber")
    private int lineNumber;
    @ExcelColumn(zh = "物料编码",en = "itemCode")
    private String itemCode;
    @ExcelColumn(zh = "物料描述",en = "itemDescription")
    private String itemDescription;
    @ExcelColumn(zh = "产品单位",en = "orderQuantityUom")
    private String orderQuantityUom;
    @ExcelColumn(zh = "数量",en = "orderQuantity")
    private String orderQuantity;
    @ExcelColumn(zh = "销售单价",en = "unitSellingPrice")
    private String unitSellingPrice;
    @ExcelColumn(zh = "行金额",en = "lineAmount")
    private Double lineAmount;
    @ExcelColumn(zh = "备注",en = "description")
    private String description;

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

    public Double getOrderAmount() {
        return orderAmount;
    }

    public void setOrderAmount(Double orderAmount) {
        this.orderAmount = orderAmount;
    }

    public int getLineNumber() {
        return lineNumber;
    }

    public void setLineNumber(int lineNumber) {
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

    public String getOrderQuantity() {
        return orderQuantity;
    }

    public void setOrderQuantity(String orderQuantity) {
        this.orderQuantity = orderQuantity;
    }

    public String getUnitSellingPrice() {
        return unitSellingPrice;
    }

    public void setUnitSellingPrice(String unitSellingPrice) {
        this.unitSellingPrice = unitSellingPrice;
    }

    public Double getLineAmount() {
        return lineAmount;
    }

    public void setLineAmount(Double lineAmount) {
        this.lineAmount = lineAmount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "HodrExportDto{" +
                "orderNumber='" + orderNumber + '\'' +
                ", companyName='" + companyName + '\'' +
                ", customerName='" + customerName + '\'' +
                ", orderDate=" + orderDate +
                ", orderStatus='" + orderStatus + '\'' +
                ", orderAmount=" + orderAmount +
                ", lineNumber=" + lineNumber +
                ", itemCode='" + itemCode + '\'' +
                ", itemDescription='" + itemDescription + '\'' +
                ", orderQuantityUom='" + orderQuantityUom + '\'' +
                ", orderQuantity='" + orderQuantity + '\'' +
                ", unitSellingPrice='" + unitSellingPrice + '\'' +
                ", lineAmount=" + lineAmount +
                ", description='" + description + '\'' +
                '}';
    }
}
