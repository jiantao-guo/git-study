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
 * 物料
 *
 * @author pigg 2019-08-05
 */
@ApiModel("物料")
@VersionAudit
@ModifyAudit
@JsonInclude(value = JsonInclude.Include.NON_NULL)
@Table(name = "hodr_item")
public class Item extends AuditDomain {

    public static final String FIELD_ITEM_ID = "itemId";
    public static final String FIELD_ITEM_CODE = "itemCode";
    public static final String FIELD_ITEM_UOM = "itemUom";
    public static final String FIELD_ITEM_DESCRIPTION = "itemDescription";
    public static final String FIELD_SALEABLE_FLAG = "saleableFlag";
    public static final String FIELD_START_ACTIVE_DATE = "startActiveDate";
    public static final String FIELD_END_ACTIVE_DATE = "endActiveDate";
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
    private Long itemId;
    @ApiModelProperty(value = "物料编码", required = true)
    @NotBlank
    private String itemCode;
    @ApiModelProperty(value = "物料单位", required = true)
    @NotBlank
    private String itemUom;
    @ApiModelProperty(value = "物料描述", required = true)
    @NotBlank
    private String itemDescription;
    @ApiModelProperty(value = "可销售标识", required = true)
    @NotNull
    private Integer saleableFlag;
    @ApiModelProperty(value = "生效起始时间")
    private Date startActiveDate;
    @ApiModelProperty(value = "生效结束时间")
    private Date endActiveDate;
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
    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    /**
     * @return 物料编码
     */
    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    /**
     * @return 物料单位
     */
    public String getItemUom() {
        return itemUom;
    }

    public void setItemUom(String itemUom) {
        this.itemUom = itemUom;
    }

    /**
     * @return 物料描述
     */
    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    /**
     * @return 可销售标识
     */
    public Integer getSaleableFlag() {
        return saleableFlag;
    }

    public void setSaleableFlag(Integer saleableFlag) {
        this.saleableFlag = saleableFlag;
    }

    /**
     * @return 生效起始时间
     */
    public Date getStartActiveDate() {
        return startActiveDate;
    }

    public void setStartActiveDate(Date startActiveDate) {
        this.startActiveDate = startActiveDate;
    }

    /**
     * @return 生效结束时间
     */
    public Date getEndActiveDate() {
        return endActiveDate;
    }

    public void setEndActiveDate(Date endActiveDate) {
        this.endActiveDate = endActiveDate;
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
