package com.hand.order.domain.repository;

import com.hand.order.domain.entity.Customer;
import org.apache.ibatis.annotations.Param;
import org.hzero.mybatis.base.BaseRepository;
import org.springframework.stereotype.Controller;

import java.util.List;

/**
 * 客户资源库
 */
public interface CustomerRepository extends BaseRepository<Customer> {
    List<Customer> getCustomer(String customerNumber,String customerName);
}
