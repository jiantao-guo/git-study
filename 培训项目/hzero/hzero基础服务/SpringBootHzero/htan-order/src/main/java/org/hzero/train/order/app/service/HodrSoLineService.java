package org.hzero.train.order.app.service;

import org.hzero.train.order.api.dto.HodrSoLineDto;
import org.hzero.train.order.domain.entity.HodrSoLine;

import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrSoLineService {
    /**
     * 新增行
     * @param hodrDto
     * @return
     */
    Boolean createHodrLine(HodrSoLineDto hodrDto);

    /**
     * 更新行
     * @param line
     * @return
     */
    void updateHodrLine(HodrSoLine line);


    Boolean deleteHodrLine(List<HodrSoLine> lines);



}
