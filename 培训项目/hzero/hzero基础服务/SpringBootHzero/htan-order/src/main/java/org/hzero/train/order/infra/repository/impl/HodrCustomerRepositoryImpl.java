package org.hzero.train.order.infra.repository.impl;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.PageHelper;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.hzero.mybatis.util.Sqls;
import org.hzero.train.order.domain.entity.HodrCustomer;
import org.hzero.train.order.domain.repository.HodrCustomerRepository;
import org.hzero.train.order.infra.mapper.HodrCustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static org.hzero.mybatis.domian.Condition.builder;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@Component
public class HodrCustomerRepositoryImpl extends BaseRepositoryImpl<HodrCustomer> implements HodrCustomerRepository {
    @Autowired
    private HodrCustomerMapper hodrCustomerMapper;
    @Override
    public Page<HodrCustomer> getCustomer(String customerName, String customerNumber, Long corpId, PageRequest pageRequest) {
        return PageHelper.doPage(pageRequest, () -> hodrCustomerMapper.selectByCondition(builder(HodrCustomer.class).andWhere(
                Sqls.custom().andLike("customerNumber", customerNumber, !"".equals(customerNumber))
                        .andLike("customerName", customerName, !"".equals(customerName))
                        .andEqualTo("companyId",corpId, !"".equals(corpId) || corpId!=null)
                ).build()
                )
        );
    }
}
