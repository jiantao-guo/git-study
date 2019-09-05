package com.hand.order.app.service.impl;

import com.hand.order.domain.entity.OrderEntity;
import com.hand.order.domain.repository.OrderRepository;
import org.codehaus.jackson.map.ObjectMapper;
import org.hzero.boot.imported.app.service.IDoImportService;
import org.hzero.boot.imported.infra.validator.annotation.ImportService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Map;

@ImportService(templateCode = "TEST")
public class ImportServiceImpl implements IDoImportService {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
   private OrderRepository orderRepository;

    @Override
    public Boolean doImport(String data) {
       // 获取自定义参数
        Map<String, Object> args = getArgs();
        OrderEntity orderEntity;
        try {
            orderEntity = objectMapper.readValue(data, OrderEntity.class);
        } catch (IOException e) {
          // 失败
           return false;
       }
        orderRepository.insertSelective(orderEntity);
        // 成功
        return true;
    }
}
