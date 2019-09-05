package com.hand.order.infra.repository.impl;

import com.hand.order.domain.entity.Customer;
import com.hand.order.domain.repository.CustomerRepository;
import com.hand.order.infra.mapper.CustomerMapper;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.hzero.mybatis.util.Sqls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomerRepositoryImpl extends BaseRepositoryImpl<Customer> implements CustomerRepository {

    @Autowired
    private CustomerMapper customerMapper;


    @Override
    public List<Customer> getCustomer(String customerNumber, String customerName) {
        return customerMapper.selectByCondition(
                org.hzero.mybatis.domian.Condition.builder(Customer.class)
                        .where(
                                Sqls.custom().andLike("customerNumber",customerNumber,customerNumber!="").andLike("customerName",customerName,customerName!="")
                        ).build()
        );
    }
}
