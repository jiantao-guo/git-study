package com.hand.order.domain.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.choerodon.mybatis.annotation.ModifyAudit;
import io.choerodon.mybatis.annotation.VersionAudit;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@ApiModel("订单信息")
@VersionAudit
@ModifyAudit
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Table(name ="hodr_so_header")
public class OrderEntity {
    @Id
    @ApiModelProperty("订单ID")
    private Long soHeaderId;
    @Transient
    @ApiModelProperty("订单编号")
    private String orderNumber;
    @Transient
    @ApiModelProperty("公司名称")
    private String companyName;
    @Transient
    @ApiModelProperty("客户名称")
    private String customerName;
    @Transient
    @ApiModelProperty("订单日期")
    private Date orderDate;
    @Transient
    @ApiModelProperty("订单状态")
    private String orderStatues;
    @Transient
    @ApiModelProperty("订单金额")
    private String orderMoney;

    public Long getSoHeaderId() {
        return soHeaderId;
    }

    public void setSoHeaderId(Long soHeaderId) {
        this.soHeaderId = soHeaderId;
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

    public String getOrderMoney() {
        return orderMoney;
    }

    public void setOrderMoney(String orderMoney) {
        this.orderMoney = orderMoney;
    }

    @Override
    public String toString() {
        return "OrderEntity{" +
                "soHeaderId=" + soHeaderId +
                ", orderNumber='" + orderNumber + '\'' +
                ", companyName='" + companyName + '\'' +
                ", customerName='" + customerName + '\'' +
                ", orderDate=" + orderDate +
                ", orderStatues='" + orderStatues + '\'' +
                ", orderMoney='" + orderMoney + '\'' +
                '}';
    }
}
