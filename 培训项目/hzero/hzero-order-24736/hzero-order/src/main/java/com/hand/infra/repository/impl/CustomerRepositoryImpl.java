package com.hand.infra.repository.impl;

import com.hand.infra.mapper.CustomerMapper;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import com.hand.domain.entity.Customer;
import com.hand.domain.repository.CustomerRepository;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 客户 资源库实现
 *
 * @author pigg 2019-08-05
 */
@Component
public class CustomerRepositoryImpl extends BaseRepositoryImpl<Customer> implements CustomerRepository {


    private final CustomerMapper customerMapper;

    public CustomerRepositoryImpl(CustomerMapper customerMapper) {
        this.customerMapper = customerMapper;
    }

    @Override
    public List<Customer> listCustomer(String customerName) {
        return customerMapper.selectCustomer(customerName);
    }
}
