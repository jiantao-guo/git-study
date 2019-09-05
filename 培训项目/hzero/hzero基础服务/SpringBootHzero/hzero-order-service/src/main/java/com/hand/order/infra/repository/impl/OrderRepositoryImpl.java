package com.hand.order.infra.repository.impl;

import com.hand.order.api.dto.HodrExportDto;
import com.hand.order.domain.entity.OrderEntity;
import com.hand.order.domain.repository.OrderRepository;
import com.hand.order.infra.mapper.OrderMapper;
import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public class OrderRepositoryImpl extends BaseRepositoryImpl<OrderEntity> implements OrderRepository {


    private final OrderMapper orderMapper;

    public OrderRepositoryImpl(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @Override
    public List<OrderEntity> getOrder(String companyName,
                                      String customerName,
                                      String orderNumber,
                                      String itemCode,
                                      String orderStatues) {
        return orderMapper.selectOrder(companyName,customerName,orderNumber,itemCode,orderStatues);
    }

    @Override
    public List<HodrExportDto> exportOrder(HodrExportDto hodrExportDto, ExportParam exportParam) {
        List<HodrExportDto> list =  orderMapper.selectExportOrder(hodrExportDto);
        System.out.println(list);
        return list;
    }


}
