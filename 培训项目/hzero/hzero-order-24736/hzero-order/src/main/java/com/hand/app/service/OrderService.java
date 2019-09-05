package com.hand.app.service;

import com.hand.domain.DTO.OrderDTO;

import java.util.List;

public interface OrderService {

    List<OrderDTO> exportOrder();
}
