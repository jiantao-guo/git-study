package com.hand.infra.mapper;

import com.hand.domain.DTO.OrderDTO;
import com.hand.domain.entity.Order;
import io.choerodon.mybatis.common.BaseMapper;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.export.vo.ExportParam;

import java.util.List;

public interface OrderMapper extends BaseMapper<Order> {
    List<Order> selectOrder(String companyName, String customerName, String orderNumber, String itemCode, String orderStatues);

}
