package com.hand.domain.repository;

import com.hand.domain.DTO.OrderDTO;
import com.hand.domain.entity.Order;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.BaseRepository;

import java.util.List;

public interface OrderRepository extends BaseRepository<Order> {
    List<Order> listOrder(String companyName, String customerName, String orderNumber, String itemCode, String orderStatues);

}
