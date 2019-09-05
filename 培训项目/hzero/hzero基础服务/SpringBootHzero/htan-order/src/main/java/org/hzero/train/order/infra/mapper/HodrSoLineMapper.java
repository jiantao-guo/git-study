package org.hzero.train.order.infra.mapper;

import io.choerodon.mybatis.common.BaseMapper;
import org.apache.ibatis.annotations.Param;
import org.hzero.train.order.domain.entity.HodrSoLine;

import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrSoLineMapper extends BaseMapper<HodrSoLine> {
    Integer getMaxLineNumber(Long headerId);

    List<HodrSoLine> getLineByHeaderId(Long headerId);
}
