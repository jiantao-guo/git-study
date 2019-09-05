package org.hzero.train.order.app.service.impl;

import org.hzero.mybatis.helper.SecurityTokenHelper;
import org.hzero.train.order.api.dto.HodrSoLineDto;
import org.hzero.train.order.app.service.HodrSoLineService;
import org.hzero.train.order.domain.entity.HodrSoLine;
import org.hzero.train.order.domain.repository.HodrSoLineRepository;
import org.hzero.train.order.infra.mapper.HodrSoLineMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@Service
public class HodrSoLineServiceImpl implements HodrSoLineService {
    @Autowired
    private HodrSoLineRepository hodrSoLineRepository;
    @Autowired
    private HodrSoLineMapper hodrSoLineMapper;
    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean createHodrLine(HodrSoLineDto hodrDto) {
        List<HodrSoLine> lines = hodrDto.getLines();
        Long headerId = hodrDto.getHeaderId();
//        int count = hodrSoLineRepository.selectCountByCondition(
//                builder(HodrSoLine.class).where(
//                        Sqls.custom()
//                                .andEqualTo("soHeaderId", headerId, !"".equals(headerId))
//                ).build()
//        );
        Integer count = hodrSoLineMapper.getMaxLineNumber(headerId);
        for(HodrSoLine line:lines){
            if(line.getId()!=null){
                updateHodrLine(line);
            }
            count+=1;
            line.setLineNumber(count);
            line.setSoHeaderId(headerId);
            hodrSoLineRepository.insert(line);
        }
        return true;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateHodrLine(HodrSoLine line) {
        hodrSoLineRepository.updateByPrimaryKey(line);
    }



    @Override
    public Boolean deleteHodrLine(List<HodrSoLine> lines) {
//        List<HodrSoLine> lines = hodrSoLineMapper.selectByIds(ids);
//        List<HodrSoLine> lines = hodrSoLineMapper.selectByCondition(builder(HodrSoLine.class).andWhere(
//                Sqls.custom().andIn("id", ids, ids.size()>0)
//                ).build()
//        );
        lines.stream().forEach(e->{
            SecurityTokenHelper.validToken(e);
            hodrSoLineRepository.deleteByPrimaryKey(e);
        });
        return Boolean.TRUE;
//        return hodrSoLineRepository.batchDeleteByPrimaryKey(lines)>0?true:false;
    }

}
