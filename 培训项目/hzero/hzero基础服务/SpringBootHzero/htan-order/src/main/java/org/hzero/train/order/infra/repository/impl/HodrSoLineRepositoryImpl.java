package org.hzero.train.order.infra.repository.impl;

import org.hzero.export.vo.ExportParam;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.hzero.mybatis.util.Sqls;
import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.domain.entity.HodrSoLine;
import org.hzero.train.order.domain.repository.HodrSoLineRepository;
import org.hzero.train.order.infra.mapper.HodrSoLineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

import static org.hzero.mybatis.domian.Condition.builder;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@Component
public class HodrSoLineRepositoryImpl extends BaseRepositoryImpl<HodrSoLine> implements HodrSoLineRepository {
    @Autowired
    private HodrSoLineMapper hodrSoLineMapper;


    @Override
    public List<HodrSoLine> getLineByHeaderId(Long headerId) {
        return hodrSoLineMapper.getLineByHeaderId(headerId);
    }

    @Override
    public List<HodrExportDto> exportByParam(ExportParam exportParam) {

        return null;
    }

}
