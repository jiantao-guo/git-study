package org.hzero.train.order.domain.repository;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.BaseRepository;
import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.domain.entity.HodrSoHeader;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrSoHeaderRepository extends BaseRepository<HodrSoHeader> {
    /**
     * 分页查询
     * @param pageRequest
     * @return
     */
    Page<HodrSoHeader> pageHeader(Long companyId,Long customerId,Long itemId,String orderNumber,String orderStatus,PageRequest pageRequest);


    HodrSoHeader getHeader(Long headerId);

    HodrSoHeader queryByCond(HodrSoHeader header);

    List<HodrExportDto> exportHordOrder(HttpServletResponse response,ExportParam exportParam, PageRequest pageRequest);

}
