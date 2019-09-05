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

/**
 * 客户
 *
 * @author pigg 2019-08-05
 */
@ApiModel("客户")
@VersionAudit
@ModifyAudit
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Table(name = "hodr_customer")
public class Customer extends AuditDomain {

    public static final String FIELD_CUSTOMER_ID = "customerId";
    public static final String FIELD_CUSTOMER_NUMBER = "customerNumber";
    public static final String FIELD_CUSTOMER_NAME = "customerName";
    public static final String FIELD_COMPANY_ID = "companyId";
    public static final String FIELD_ENABLED_FLAG = "enabledFlag";

    //
    // 业务方法(按public protected private顺序排列)
    // ------------------------------------------------------------------------------

    //
    // 数据库字段
    // ------------------------------------------------------------------------------


    @ApiModelProperty("表ID，主键，供其他表做外键")
    @Id
    @GeneratedValue
    private Long customerId;
    @ApiModelProperty(value = "客户编号", required = true)
    @NotBlank
    private String customerNumber;
    @ApiModelProperty(value = "客户名称", required = true)
    @NotBlank
    private String customerName;
    @ApiModelProperty(value = "公司ID", required = true)
    @NotNull
    private Long companyId;
    @ApiModelProperty(value = "启用标识", required = true)
    @NotNull
    private Integer enabledFlag;

    //
    // 非数据库字段
    // ------------------------------------------------------------------------------

    //
    // getter/setter
    // ------------------------------------------------------------------------------

    /**
     * @return 表ID，主键，供其他表做外键
     */
    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    /**
     * @return 客户编号
     */
    public String getCustomerNumber() {
        return customerNumber;
    }

    public void setCustomerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
    }

    /**
     * @return 客户名称
     */
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
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
     * @return 启用标识
     */
    public Integer getEnabledFlag() {
        return enabledFlag;
    }

    public void setEnabledFlag(Integer enabledFlag) {
        this.enabledFlag = enabledFlag;
    }

}
