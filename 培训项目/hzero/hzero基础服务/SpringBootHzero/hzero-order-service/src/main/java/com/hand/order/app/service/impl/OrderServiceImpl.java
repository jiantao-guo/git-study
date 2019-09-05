package com.hand.order.app.service.impl;

import com.hand.order.app.service.OrderService;
import com.hand.order.domain.entity.OrderEntity;
import com.hand.order.domain.repository.OrderRepository;
import io.choerodon.core.exception.CommonException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Override
    @Transactional(rollbackFor = Exception.class)
    public OrderEntity addOrder(OrderEntity orderEntity) {
        if (orderEntity.getSoHeaderId()!=null){
            updateOrder( orderEntity);
        }
        orderEntity.setOrderStatues("New");
        orderEntity.setOrderDate(new Date());
        orderRepository.insert(orderEntity);
        return orderEntity;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public OrderEntity updateOrder(OrderEntity orderEntity) {
        OrderEntity orderEntity1=orderRepository.selectByPrimaryKey(orderEntity);
        if (orderEntity1==null){
            throw new CommonException("order not find");
        }
        orderRepository.updateByPrimaryKey(orderEntity);
        return orderEntity;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean deleteOrder(OrderEntity orderEntity) {
        orderRepository.deleteByPrimaryKey(orderEntity);
        return Boolean.TRUE;
    }
}
