package com.hand.order.domain.repository;

import com.hand.order.api.dto.HodrExportDto;
import com.hand.order.domain.entity.OrderEntity;
import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.BaseRepository;

import java.util.List;

public interface OrderRepository extends BaseRepository<OrderEntity> {
    List<OrderEntity> getOrder(String companyName,
                               String customerName,
                               String orderNumber,
                               String itemCode,
                               String orderStatues
    );
    List<HodrExportDto> exportOrder(HodrExportDto hodrExportDto,
                                    ExportParam exportParam);


}
