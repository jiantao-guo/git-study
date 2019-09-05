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
import java.util.Date;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@ApiModel("物料主数据")
@ModifyAudit
@VersionAudit
@Table(name="hodr_item")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HodrItem extends AuditDomain {
    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;
    @Length(max = 60)
    @NotBlank
    @Pattern(regexp = Regexs.CODE, message = "htdo.warn.numberFormatIncorrect") // 格式控制
    @ApiModelProperty("物料编码")
    @Length(max = 60)
    @NotBlank
    private String itemCode;
    @ApiModelProperty("物料单位")
    private String itemUom;
    @Length(max = 240)
    @NotBlank
    @ApiModelProperty("物料描述")
    private String itemDescription;
    @NotNull
    @ApiModelProperty("启用标志")
    private Integer enabledFlag;
    @NotNull
    @ApiModelProperty("可销售标志")
    private Integer saleableFlag;
    @ApiModelProperty("生效起始时间")
    private Date startActiveDate;
    @ApiModelProperty("生效结束时间")
    private Date endActiveDate;

    public Long getId() {
        return id;
    }

    public HodrItem setId(Long id) {
        this.id = id;
        return this;
    }

    public String getItemCode() {
        return itemCode;
    }

    public HodrItem setItemCode(String itemCode) {
        this.itemCode = itemCode;
        return this;
    }

    public String getItemUom() {
        return itemUom;
    }

    public HodrItem setItemUom(String itemUom) {
        this.itemUom = itemUom;
        return this;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public HodrItem setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
        return this;
    }

    public Integer getEnabledFlag() {
        return enabledFlag;
    }

    public HodrItem setEnabledFlag(Integer enabledFlag) {
        this.enabledFlag = enabledFlag;
        return this;
    }

    public Integer getSaleableFlag() {
        return saleableFlag;
    }

    public HodrItem setSaleableFlag(Integer saleableFlag) {
        this.saleableFlag = saleableFlag;
        return this;
    }

    public Date getStartActiveDate() {
        return startActiveDate;
    }

    public HodrItem setStartActiveDate(Date startActiveDate) {
        this.startActiveDate = startActiveDate;
        return this;
    }

    public Date getEndActiveDate() {
        return endActiveDate;
    }

    public HodrItem setEndActiveDate(Date endActiveDate) {
        this.endActiveDate = endActiveDate;
        return this;
    }
}
