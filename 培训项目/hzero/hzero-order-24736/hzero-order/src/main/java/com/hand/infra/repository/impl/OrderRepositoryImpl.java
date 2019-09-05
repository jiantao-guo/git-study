package com.hand.infra.repository.impl;

import com.hand.domain.DTO.OrderDTO;
import com.hand.domain.entity.Order;
import com.hand.domain.repository.OrderRepository;
import com.hand.infra.mapper.OrderMapper;
import io.choerodon.mybatis.pagehelper.PageHelper;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrderRepositoryImpl extends BaseRepositoryImpl<Order> implements OrderRepository {

    private final OrderMapper orderMapper;

    public OrderRepositoryImpl(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @Override
    public List<Order> listOrder(String companyName, String customerName, String orderNumber, String itemCode, String orderStatues) {
        return orderMapper.selectOrder(companyName, customerName, orderNumber, itemCode, orderStatues);
    }


}
