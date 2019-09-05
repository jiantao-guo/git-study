package com.hand.infra.mapper;

import com.hand.domain.DTO.OrderDTO;
import io.choerodon.mybatis.common.BaseMapper;

import java.util.List;

public interface ExportMapper extends BaseMapper<OrderDTO> {
    List<OrderDTO> exportOrder(OrderDTO orderDTO);
}
