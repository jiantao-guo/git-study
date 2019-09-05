package com.hand.infra.mapper;

import com.hand.domain.entity.SoLine;
import io.choerodon.mybatis.common.BaseMapper;

/**
 * 销售订单行Mapper
 *
 * @author pigg 2019-08-05
 */
public interface SoLineMapper extends BaseMapper<SoLine> {
    Boolean insertLine(SoLine soLine);

}
