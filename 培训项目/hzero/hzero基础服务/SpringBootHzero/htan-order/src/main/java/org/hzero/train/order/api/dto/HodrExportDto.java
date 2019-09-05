package org.hzero.train.order.api.dto;

import org.hzero.core.base.BaseConstants;
import org.hzero.export.annotation.ExcelColumn;
import org.hzero.export.annotation.ExcelSheet;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/6
 */
@ExcelSheet(zh = "销售订单导出", en = "Export of Sales Order")
public class HodrExportDto {
    @ExcelColumn(zh = "销售订单号", en = "orderNumber")
    private String orderNumber;
    @ExcelColumn(zh = "公司名称", en = "companyName")
    private String companyName;
    @ExcelColumn(zh = "客户名称", en = "customerName")
    private String customerName;
    @ExcelColumn(zh = "订单日期", en = "orderDate", pattern = BaseConstants.Pattern.DATE)
    private Date orderDate;
    @ExcelColumn(zh = "订单状态", en = "orderStatus")
    private String orderStatus;
    @ExcelColumn(zh = "订单金额", en = "orderAmount", pattern = BaseConstants.Pattern.TB_ONE_DECIMAL)
    private BigDecimal orderAmount;
    @ExcelColumn(zh = "行号", en = "lineNumber")
    private Integer lineNumber;
    @ExcelColumn(zh = "物料编码", en = "itemCode")
    private String itemCode;
    @ExcelColumn(zh = "物料描述", en = "itemDescription")
    private String itemDescription;
    @ExcelColumn(zh = "产品单位", en = "orderQuantityUom")
    private String orderQuantityUom;
    @ExcelColumn(zh = "数量", en = "orderQuantity")
    private BigDecimal orderQuantity;
    @ExcelColumn(zh = "销售单价", en = "unitSellingPrice")
    private BigDecimal unitSellingPrice;
    @ExcelColumn(zh = "行金额", en = "lineAmount", pattern = BaseConstants.Pattern.TB_ONE_DECIMAL)
    private BigDecimal lineAmount;
    @ExcelColumn(zh = "备注", en = "description")
    private String description;

    private String companyNumber;

    private String customerNumber;

    public String getOrderNumber() {
        return orderNumber;
    }

    public HodrExportDto setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public String getCompanyName() {
        return companyName;
    }

    public HodrExportDto setCompanyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public String getCustomerName() {
        return customerName;
    }

    public HodrExportDto setCustomerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public HodrExportDto setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public HodrExportDto setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
        return this;
    }

    public BigDecimal getOrderAmount() {
        return orderAmount;
    }

    public HodrExportDto setOrderAmount(BigDecimal orderAmount) {
        this.orderAmount = orderAmount;
        return this;
    }

    public Integer getLineNumber() {
        return lineNumber;
    }

    public HodrExportDto setLineNumber(Integer lineNumber) {
        this.lineNumber = lineNumber;
        return this;
    }

    public String getItemCode() {
        return itemCode;
    }

    public HodrExportDto setItemCode(String itemCode) {
        this.itemCode = itemCode;
        return this;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public HodrExportDto setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
        return this;
    }

    public String getOrderQuantityUom() {
        return orderQuantityUom;
    }

    public HodrExportDto setOrderQuantityUom(String orderQuantityUom) {
        this.orderQuantityUom = orderQuantityUom;
        return this;
    }

    public BigDecimal getOrderQuantity() {
        return orderQuantity;
    }

    public HodrExportDto setOrderQuantity(BigDecimal orderQuantity) {
        this.orderQuantity = orderQuantity;
        return this;
    }

    public BigDecimal getUnitSellingPrice() {
        return unitSellingPrice;
    }

    public HodrExportDto setUnitSellingPrice(BigDecimal unitSellingPrice) {
        this.unitSellingPrice = unitSellingPrice;
        return this;
    }

    public BigDecimal getLineAmount() {
        return lineAmount;
    }

    public HodrExportDto setLineAmount(BigDecimal lineAmount) {
        this.lineAmount = lineAmount;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public HodrExportDto setDescription(String description) {
        this.description = description;
        return this;
    }

    public String getCompanyNumber() {
        return companyNumber;
    }

    public HodrExportDto setCompanyNumber(String companyNumber) {
        this.companyNumber = companyNumber;
        return this;
    }

    public String getCustomerNumber() {
        return customerNumber;
    }

    public HodrExportDto setCustomerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
        return this;
    }
}
