package org.hzero.train.order.app.service.impl;

import org.hzero.boot.scheduler.infra.annotation.JobHandler;
import org.hzero.boot.scheduler.infra.enums.ReturnT;
import org.hzero.boot.scheduler.infra.handler.IJobHandler;
import org.hzero.boot.scheduler.infra.tool.SchedulerTool;
import org.hzero.mybatis.util.Sqls;
import org.hzero.train.order.domain.entity.HodrSoHeader;
import org.hzero.train.order.domain.repository.HodrSoHeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

import static org.hzero.mybatis.domian.Condition.builder;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/7
 */
@JobHandler("HorderJob")
public class HzeroOrderJobImpl implements IJobHandler {

    @Autowired
    private HodrSoHeaderRepository hodrSoHeaderRepository;
    @Override
    public ReturnT execute(Map<String, String> map, SchedulerTool tool) {
        String params = map.get("params");
        List<HodrSoHeader> headers = hodrSoHeaderRepository.selectByCondition(
                builder(HodrSoHeader.class).where(
                        Sqls.custom().andEqualTo("orderStatus", params)
                ).build()
        );
        headers.stream().forEach(e->{
            System.out.println("定时任务:"+e.getOrderNumber()+"=============="+e.getOrderStatus()+"====================");
        });
//        headers.stream().forEach(e->{
//            e.setOrderStatus("CLOSED");
//            hodrSoHeaderRepository.updateByPrimaryKeySelective(e);
//        });
        return ReturnT.SUCCESS;
    }
}
