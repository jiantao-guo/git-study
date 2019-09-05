package org.hzero.train.order.domain.repository;

import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.BaseRepository;
import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.domain.entity.HodrSoLine;

import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrSoLineRepository extends BaseRepository<HodrSoLine> {
    List<HodrSoLine> getLineByHeaderId(Long headerId);


    List<HodrExportDto> exportByParam(ExportParam exportParam);
}
