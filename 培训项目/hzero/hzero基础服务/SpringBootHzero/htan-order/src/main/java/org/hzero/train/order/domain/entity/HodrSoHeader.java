package org.hzero.train.order.domain.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.choerodon.mybatis.annotation.ModifyAudit;
import io.choerodon.mybatis.annotation.VersionAudit;
import io.choerodon.mybatis.domain.AuditDomain;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.validator.constraints.Length;
import org.hzero.boot.platform.lov.annotation.LovValue;
import org.hzero.core.util.Regexs;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

/**
 * @description:销售订单头
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@ApiModel("销售订单头")
@ModifyAudit
@VersionAudit
@Table(name="hodr_so_header")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HodrSoHeader extends AuditDomain {
    @Id
    @GeneratedValue
    @Column(name = "so_header_id")
    private Long id;
    @Length(max = 60)
    @NotBlank
    @Pattern(regexp = Regexs.CODE, message = "htdo.warn.numberFormatIncorrect") // 格式控制
    @ApiModelProperty("订单编号")
    private String orderNumber;
    @NotNull
    @ApiModelProperty("公司id")
    private Long companyId;
    @NotNull
    @ApiModelProperty("客户id")
    private Long customerId;
    @NotNull
    @Pattern(regexp = Regexs.DATE, message = "htdo.warn.dateFormatIncorrect") // 格式控制
    @ApiModelProperty("订单日期")
    private Date orderDate;
    @NotBlank
    @ApiModelProperty("订单状态")
    @LovValue(lovCode = "HZERO.ORDER")
    private String orderStatus;
    @Transient
    private String orderStatusMeaning;

    @Transient
    @ApiModelProperty("订单金额")
    private BigDecimal orderAmount;
    @Transient
    @ApiModelProperty("公司名称")
    private String companyName ;
    @Transient
    @ApiModelProperty("客户名称")
    private String customerName;

    public void generateNumber() {
        this.orderNumber = UUID.randomUUID().toString().replace("-", "");
    }

    public Long getId() {
        return id;
    }

    public HodrSoHeader setId(Long id) {
        this.id = id;
        return this;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public HodrSoHeader setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
        return this;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public HodrSoHeader setCompanyId(Long companyId) {
        this.companyId = companyId;
        return this;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public HodrSoHeader setCustomerId(Long customerId) {
        this.customerId = customerId;
        return this;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public HodrSoHeader setOrderDate(Date orderDate) {
        this.orderDate = orderDate;
        return this;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public HodrSoHeader setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
        return this;
    }

    public BigDecimal getOrderAmount() {
        return orderAmount;
    }

    public HodrSoHeader setOrderAmount(BigDecimal orderAmount) {
        this.orderAmount = orderAmount.setScale(2,BigDecimal.ROUND_HALF_UP);
        return this;
    }

    public String getCompanyName() {
        return companyName;
    }

    public HodrSoHeader setCompanyName(String companyName) {
        this.companyName = companyName;
        return this;
    }

    public String getCustomerName() {
        return customerName;
    }

    public HodrSoHeader setCustomerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public String getOrderStatusMeaning() {
        return orderStatusMeaning;
    }

    public HodrSoHeader setOrderStatusMeaning(String orderStatusMeaning) {
        this.orderStatusMeaning = orderStatusMeaning;
        return this;
    }

}
