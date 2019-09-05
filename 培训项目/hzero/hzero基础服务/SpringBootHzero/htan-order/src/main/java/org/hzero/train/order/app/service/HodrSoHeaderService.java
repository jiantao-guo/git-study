package org.hzero.train.order.app.service;

import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.domain.entity.HodrSoHeader;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrSoHeaderService {

    /**
     * 新建头
     * @param header
     * @return
     */
    HodrSoHeader createHodrHeader(HodrSoHeader header);


    /**
     * 更新头
     * @param header
     * @return
     */
    HodrSoHeader updateHodrHeader(HodrSoHeader header);

    /**
     * 整单删除
     * @param header
     * @return
     */
    Boolean deleteHeader(HodrSoHeader header);


    Boolean insertFromExport(HodrExportDto hodrExportDto);
}
