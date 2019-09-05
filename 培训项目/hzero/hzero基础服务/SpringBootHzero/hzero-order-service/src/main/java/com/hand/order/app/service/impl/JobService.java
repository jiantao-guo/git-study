package com.hand.order.app.service.impl;

import com.hand.order.domain.entity.OrderEntity;
import com.hand.order.domain.repository.OrderRepository;
import org.hzero.boot.scheduler.infra.annotation.JobHandler;
import org.hzero.boot.scheduler.infra.enums.ReturnT;
import org.hzero.boot.scheduler.infra.handler.IJobHandler;
import org.hzero.boot.scheduler.infra.tool.SchedulerTool;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

@JobHandler("order")
class DemoJob implements IJobHandler {


    @Override
    public ReturnT execute(Map<String, String> map, SchedulerTool tool) {

        System.out.println("执行成功");
        return ReturnT.SUCCESS;
    }
}
