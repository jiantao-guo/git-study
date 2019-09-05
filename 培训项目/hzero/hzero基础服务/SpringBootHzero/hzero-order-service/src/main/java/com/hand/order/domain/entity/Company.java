package com.hand.order.domain.entity;

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
 * 公司
 *
 * @author pigg 2019-08-05
 */
@ApiModel("公司")
@VersionAudit
@ModifyAudit
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Table(name = "hodr_company")
public class Company extends AuditDomain {
    @ApiModelProperty("表ID，主键，供其他表做外键")
    @Id
    @GeneratedValue
    private Long companyId;
    @ApiModelProperty(value = "公司编号",required = true)
    @NotBlank
    private String companyNumber;
    @ApiModelProperty(value = "公司名称",required = true)
    @NotBlank
    private String companyName;
    @ApiModelProperty(value = "启用标识",required = true)
    @NotNull
    private Integer enabledFlag;


    /**
     * @return 表ID，主键，供其他表做外键
     */
	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}
    /**
     * @return 公司编号
     */
	public String getCompanyNumber() {
		return companyNumber;
	}

	public void setCompanyNumber(String companyNumber) {
		this.companyNumber = companyNumber;
	}
    /**
     * @return 公司名称
     */
	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
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
