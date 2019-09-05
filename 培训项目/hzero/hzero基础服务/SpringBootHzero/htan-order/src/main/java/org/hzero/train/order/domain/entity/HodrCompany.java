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
@ApiModel("公司主数据")
@ModifyAudit
@VersionAudit
@Table(name="hodr_company")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HodrCompany extends AuditDomain {
    @Id
    @GeneratedValue
    @Column(name = "company_id")
    private Long id;
    @Length(max = 60)
    @NotBlank
    @Pattern(regexp = Regexs.CODE, message = "htdo.warn.numberFormatIncorrect") // 格式控制
    @ApiModelProperty("公司编号")
    private String companyNumber;
    @ApiModelProperty("公司名称")
    private String companyName;
    @ApiModelProperty("启用标志")
    private Integer enabledFlag;

    public Long getId() {
        return id;
    }

    public HodrCompany setId(Long id) {
        this.id = id;
        return this;
    }

    public String getCompanyNumber() {
        return companyNumber;
    }

    public HodrCompany setCompanyNumber(String companyNumber) {
        this.companyNumber = companyNumber;
        return this;
    }

    public String getCompanyName() {
        return companyName;
    }

    public HodrCompany setCompanyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public Integer getEnabledFlag() {
        return enabledFlag;
    }

    public HodrCompany setEnabledFlag(Integer enabledFlag) {
        this.enabledFlag = enabledFlag;
        return this;
    }
}
