package org.hzero.train.order.domain.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.choerodon.mybatis.annotation.ModifyAudit;
import io.choerodon.mybatis.annotation.VersionAudit;
import io.choerodon.mybatis.domain.AuditDomain;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Length;
import org.hzero.core.util.Regexs;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@ApiModel("客户主数据")
@ModifyAudit
@VersionAudit
@Table(name="hodr_customer")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HodrCustomer extends AuditDomain {
    @Id
    @GeneratedValue
    @Column(name = "customer_id")
    private Long id;
    @Length(max = 60)
    @NotBlank
    @Pattern(regexp = Regexs.CODE, message = "htdo.warn.numberFormatIncorrect") // 格式控制
    @ApiModelProperty("客户编号")
    private String customerNumber;
    @NotNull
    @ApiModelProperty("公司id")
    private Long companyId;
    @ApiModelProperty("客户名称")
    private String customerName;
    @ApiModelProperty("启用标志")
    private Integer enabledFlag;

    public Long getId() {
        return id;
    }

    public HodrCustomer setId(Long id) {
        this.id = id;
        return this;
    }

    public String getCustomerNumber() {
        return customerNumber;
    }

    public HodrCustomer setCustomerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
        return this;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public HodrCustomer setCompanyId(Long companyId) {
        this.companyId = companyId;
        return this;
    }

    public String getCustomerName() {
        return customerName;
    }

    public HodrCustomer setCustomerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public Integer getEnabledFlag() {
        return enabledFlag;
    }

    public HodrCustomer setEnabledFlag(Integer enabledFlag) {
        this.enabledFlag = enabledFlag;
        return this;
    }
}
