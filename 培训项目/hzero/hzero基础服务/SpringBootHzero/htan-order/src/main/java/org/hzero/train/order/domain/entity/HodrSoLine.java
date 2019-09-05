package org.hzero.train.order.domain.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.choerodon.mybatis.annotation.ModifyAudit;
import io.choerodon.mybatis.annotation.VersionAudit;
import io.choerodon.mybatis.domain.AuditDomain;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

/**
 * @description:销售订单行
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@ApiModel("销售订单行")
@ModifyAudit
@VersionAudit
@Table(name="hodr_so_line")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HodrSoLine extends AuditDomain {
    @Id
    @GeneratedValue
    @Column(name = "so_line_id")
    private Long id;
    @NotNull
    @ApiModelProperty("订单头ID")
    private Long soHeaderId;
    @NotNull
    @ApiModelProperty("行号")
    private Integer lineNumber;
    @NotNull
    @ApiModelProperty("产品id")
    private Long itemId;
    @NotBlank
    @Length(max = 60)
    @ApiModelProperty("产品单位")
    private String orderQuantityUom;
    @NotNull
    @ApiModelProperty("数量")
    private BigDecimal orderQuantity;
    @NotNull
    @ApiModelProperty("销售单价")
    private BigDecimal unitSellingPrice;
    @ApiModelProperty("备注")
    private String description;

    @Transient
    @ApiModelProperty("行金额")
    private BigDecimal lineAmount;

    @Transient
    @ApiModelProperty("物料描述")
    private String itemDescription;

    @Transient
    @ApiModelProperty("物料编码")
    private String itemCode;

    public Long getId() {
        return id;
    }

    public HodrSoLine setId(Long id) {
        this.id = id;
        return this;
    }

    public Long getSoHeaderId() {
        return soHeaderId;
    }

    public HodrSoLine setSoHeaderId(Long soHeaderId) {
        this.soHeaderId = soHeaderId;
        return this;
    }

    public Integer getLineNumber() {
        return lineNumber;
    }

    public HodrSoLine setLineNumber(Integer lineNumber) {
        this.lineNumber = lineNumber;
        return this;
    }

    public Long getItemId() {
        return itemId;
    }

    public HodrSoLine setItemId(Long itemId) {
        this.itemId = itemId;
        return this;
    }

    public String getOrderQuantityUom() {
        return orderQuantityUom;
    }

    public HodrSoLine setOrderQuantityUom(String orderQuantityUom) {
        this.orderQuantityUom = orderQuantityUom;
        return this;
    }

    public BigDecimal getOrderQuantity() {
        return orderQuantity;
    }

    public HodrSoLine setOrderQuantity(BigDecimal orderQuantity) {
        this.orderQuantity = orderQuantity;
        return this;
    }

    public BigDecimal getUnitSellingPrice() {
        return unitSellingPrice;
    }

    public HodrSoLine setUnitSellingPrice(BigDecimal unitSellingPrice) {
        this.unitSellingPrice = unitSellingPrice;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public HodrSoLine setDescription(String description) {
        this.description = description;
        return this;
    }

    public BigDecimal getLineAmount() {
        return lineAmount;
    }

    public HodrSoLine setLineAmount(BigDecimal lineAmount) {
        this.lineAmount = lineAmount.setScale(2,BigDecimal.ROUND_HALF_UP);
        return this;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public HodrSoLine setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
        return this;
    }

    public String getItemCode() {
        return itemCode;
    }

    public HodrSoLine setItemCode(String itemCode) {
        this.itemCode = itemCode;
        return this;
    }
}
