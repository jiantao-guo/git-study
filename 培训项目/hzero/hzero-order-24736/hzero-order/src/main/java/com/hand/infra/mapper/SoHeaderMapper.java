package com.hand.infra.mapper;

import com.hand.domain.entity.SoHeader;
import io.choerodon.mybatis.common.BaseMapper;

/**
 * 销售订单头Mapper
 *
 * @author pigg 2019-08-05
 */
public interface SoHeaderMapper extends BaseMapper<SoHeader> {
    Boolean insertHeader(SoHeader soHeader);

    Boolean updateStatus();
}
