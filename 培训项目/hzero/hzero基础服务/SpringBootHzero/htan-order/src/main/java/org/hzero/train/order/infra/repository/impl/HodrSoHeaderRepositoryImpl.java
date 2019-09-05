package org.hzero.train.order.infra.repository.impl;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.PageHelper;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.boot.platform.lov.annotation.ProcessLovValue;
import org.hzero.core.base.BaseConstants;
import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.domain.entity.HodrSoHeader;
import org.hzero.train.order.domain.entity.HodrSoLine;
import org.hzero.train.order.domain.repository.HodrSoHeaderRepository;
import org.hzero.train.order.infra.mapper.HodrSoHeaderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@Component
public class HodrSoHeaderRepositoryImpl extends BaseRepositoryImpl<HodrSoHeader> implements HodrSoHeaderRepository {

    @Autowired
    private HodrSoHeaderMapper hodrSoHeaderMapper;

    @Override
    public Page<HodrSoHeader> pageHeader(Long companyId,Long customerId,Long itemId,String orderNumber,String orderStatus,PageRequest pageRequest) {
        return PageHelper.doPage(pageRequest, () -> hodrSoHeaderMapper.queryByCodition(null,companyId,customerId,itemId,orderNumber,orderStatus));
    }

    @Override
    public HodrSoHeader getHeader(Long headerId) {
        return hodrSoHeaderMapper.queryByCodition(headerId,null,null,null,"","").get(0);
    }

    @Override
    public HodrSoHeader queryByCond(HodrSoHeader header) {
        return hodrSoHeaderMapper.queryByCond(header);
    }

    @Override
    public List<HodrExportDto> exportHordOrder(HttpServletResponse response,ExportParam exportParam, PageRequest pageRequest) {
        List<HodrExportDto> hodrExportDtos = hodrSoHeaderMapper.exportHordOrder("HZERO.ORDER");
        return PageHelper.doPage(pageRequest, () ->hodrExportDtos);
    }

}
