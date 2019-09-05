package com.hand.infra.mapper;

import com.hand.domain.entity.Customer;

import io.choerodon.mybatis.common.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 客户Mapper
 *
 * @author pigg 2019-08-05
 */
public interface CustomerMapper extends BaseMapper<Customer> {
    List<Customer> selectCustomer(@Param("customerName") String customerName);

    Customer selectCustomerByNumber(@Param("customerNumber") String customerNumber);



}
