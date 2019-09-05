package com.hand.app.service.impl;


import com.hand.domain.entity.SoHeader;
import com.hand.domain.repository.SoHeaderRepository;
import org.hzero.boot.scheduler.infra.annotation.JobHandler;
import org.hzero.boot.scheduler.infra.enums.ReturnT;
import org.hzero.boot.scheduler.infra.handler.IJobHandler;
import org.hzero.boot.scheduler.infra.tool.SchedulerTool;
import org.hzero.mybatis.util.Sqls;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

import static org.hzero.mybatis.domian.Condition.builder;

@JobHandler("orderJob")
public class OrderJobImpl implements IJobHandler {

    @Autowired
    private SoHeaderRepository soHeaderRepository;
    @Override
    public ReturnT execute(Map<String, String> map, SchedulerTool tool) {
//        // 刷新任务进度及描述
//        tool.updateProgress(50, "任务执行中...");
//        // 任务日志记录
//        tool.info("示例任务执行成功！");


        Boolean isUpdate = soHeaderRepository.UpdateStatus();
        System.out.println("+++++++++++++++++++调度测试map name="+map.get("name")+"isUpdate="+isUpdate);

        return ReturnT.SUCCESS;
    }
}
