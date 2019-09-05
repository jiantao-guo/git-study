package com.hand.infra.repository.impl;

import com.hand.infra.mapper.SoHeaderMapper;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import com.hand.domain.entity.SoHeader;
import com.hand.domain.repository.SoHeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * 销售订单头 资源库实现
 *
 * @author pigg 2019-08-05
 */
@Component
public class SoHeaderRepositoryImpl extends BaseRepositoryImpl<SoHeader> implements SoHeaderRepository {

    @Autowired
    private final SoHeaderMapper soHeaderMapper;

    public SoHeaderRepositoryImpl(SoHeaderMapper soHeaderMapper) {
        this.soHeaderMapper = soHeaderMapper;
    }

    @Override
    public Boolean UpdateStatus() {
        return soHeaderMapper.updateStatus();
    }
}
