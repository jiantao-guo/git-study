package com.hand.order.app.service;

import com.hand.order.domain.entity.OrderEntity;

public interface OrderService {
    /**
     * 创建订单
     * @param orderEntity
     * @return
     */
    OrderEntity addOrder(OrderEntity orderEntity);

    /**
     * 更新订单
     * @param orderEntity
     * @return
     */
    OrderEntity updateOrder(OrderEntity orderEntity);

    /**
     * 删除订单
     * @param orderEntity
     * @return
     */
    Boolean deleteOrder(OrderEntity orderEntity);
}
