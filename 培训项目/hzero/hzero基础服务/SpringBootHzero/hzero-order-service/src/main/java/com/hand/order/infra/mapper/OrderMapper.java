package com.hand.order.infra.mapper;

import com.hand.order.api.dto.HodrExportDto;
import com.hand.order.domain.entity.OrderEntity;
import io.choerodon.mybatis.common.BaseMapper;

import java.util.List;

public interface OrderMapper extends BaseMapper<OrderEntity> {
    List<OrderEntity> selectOrder(String companyName,
                                  String customerName,
                                  String orderNumber,
                                  String itemCode,
                                  String orderStatues
    );
    List<HodrExportDto> selectExportOrder(HodrExportDto hodrExportDto);

}
