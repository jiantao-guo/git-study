package com.hand.domain.repository;

import com.hand.domain.DTO.OrderDTO;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.BaseRepository;

import java.util.List;

public interface ExportRepository extends BaseRepository<OrderDTO> {

    List<OrderDTO> exportOrder(OrderDTO orderDTO, ExportParam exportParam);
}
