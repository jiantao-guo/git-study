package com.hand.domain.entity;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonInclude;

import javax.validation.constraints.NotBlank;

import io.choerodon.mybatis.domain.AuditDomain;
import io.choerodon.mybatis.annotation.ModifyAudit;
import io.choerodon.mybatis.annotation.VersionAudit;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

/**
 * 销售订单头
 *
 * @author pigg 2019-08-05
 */
@ApiModel("销售订单头")
@VersionAudit
@ModifyAudit
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Table(name = "hodr_so_header")
public class SoHeader extends AuditDomain {

    public static final String FIELD_SO_HEADER_ID = "soHeaderId";
    public static final String FIELD_ORDER_NUMBER = "orderNumber";
    public static final String FIELD_COMPANY_ID = "companyId";
    public static final String FIELD_ORDER_DATE = "orderDate";
    public static final String FIELD_ORDER_STATUS = "orderStatus";
    public static final String FIELD_CUSTOMER_ID = "customerId";

    //
    // 业务方法(按public protected private顺序排列)
    // ------------------------------------------------------------------------------

    //
    // 数据库字段
    // ------------------------------------------------------------------------------


    @ApiModelProperty("表ID，主键，供其他表做外键")
    @Id
    @GeneratedValue
    private Long soHeaderId;
    @ApiModelProperty(value = "订单编号", required = true)
    @NotBlank
    private String orderNumber;
    @ApiModelProperty(value = "公司ID", required = true)
    @NotNull
    private Long companyId;
    @ApiModelProperty(value = "订单日期", required = true)
    @NotNull
    private Date orderDate;
    @ApiModelProperty(value = "", required = true)
    @NotBlank
    private String orderStatus;
    @ApiModelProperty(value = "", required = true)
    @NotNull
    private Long customerId;

    //
    // 非数据库字段
    // ------------------------------------------------------------------------------

    //
    // getter/setter
    // ------------------------------------------------------------------------------

    /**
     * @return 表ID，主键，供其他表做外键
     */
    public Long getSoHeaderId() {
        return soHeaderId;
    }

    public void setSoHeaderId(Long soHeaderId) {
        this.soHeaderId = soHeaderId;
    }

    /**
     * @return 订单编号
     */
    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    /**
     * @return 公司ID
     */
    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    /**
     * @return 订单日期
     */
    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
    }

    /**
     * @return
     */
    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    /**
     * @return
     */
    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

}
