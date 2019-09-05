package com.hand.domain.repository;

import org.hzero.mybatis.base.BaseRepository;
import com.hand.domain.entity.Customer;

import java.util.List;

/**
 * 客户资源库
 *
 * @author pigg 2019-08-05
 */
public interface CustomerRepository extends BaseRepository<Customer> {
    List<Customer> listCustomer(String customerName);

}
