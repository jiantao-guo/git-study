package com.hand.infra.repository.impl;

import com.hand.domain.DTO.OrderDTO;
import com.hand.domain.repository.ExportRepository;
import com.hand.infra.mapper.ExportMapper;
import io.choerodon.mybatis.pagehelper.PageHelper;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ExportRepositoryImpl extends BaseRepositoryImpl<OrderDTO> implements ExportRepository {

    @Autowired
    private ExportMapper exportMapper;

    public ExportRepositoryImpl(ExportMapper exportMapper) {
        this.exportMapper = exportMapper;
    }

    @Override
    public List<OrderDTO> exportOrder(OrderDTO orderDTO, ExportParam exportParam) {
//        List<OrderDTO> list = PageHelper.doPageAndSort(pageRequest, () -> exportMapper.exportOrder(orderDTO));
        List<OrderDTO> list = exportMapper.exportOrder(orderDTO);

        return list;
    }
}
