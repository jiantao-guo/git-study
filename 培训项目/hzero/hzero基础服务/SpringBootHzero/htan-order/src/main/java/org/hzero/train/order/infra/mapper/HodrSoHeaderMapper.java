package org.hzero.train.order.infra.mapper;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.common.BaseMapper;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.export.vo.ExportParam;
import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.domain.entity.HodrSoHeader;

import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrSoHeaderMapper extends BaseMapper<HodrSoHeader> {
    List<HodrSoHeader> queryByCodition(Long headerId, Long companyId, Long customerId, Long itemId, String orderNumber, String orderStatus);


    List<HodrExportDto> exportHordOrder(String params);

    HodrSoHeader queryByCond(HodrSoHeader header);
}
