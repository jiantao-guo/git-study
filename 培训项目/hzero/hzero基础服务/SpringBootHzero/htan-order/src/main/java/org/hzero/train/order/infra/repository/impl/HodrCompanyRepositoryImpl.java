package org.hzero.train.order.infra.repository.impl;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.PageHelper;
import io.choerodon.mybatis.pagehelper.Select;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.hzero.mybatis.util.Sqls;
import org.hzero.train.order.domain.entity.HodrCompany;
import org.hzero.train.order.domain.repository.HodrCompanyRepository;
import org.hzero.train.order.infra.mapper.HodrCompanyMapper;
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
public class HodrCompanyRepositoryImpl extends BaseRepositoryImpl<HodrCompany> implements HodrCompanyRepository {

    @Autowired
    private HodrCompanyMapper hodrCompanyMapper;

    @Override
    public Page<HodrCompany> getCorp(String corpName, String corpNumber, PageRequest pageRequest) {
        return PageHelper.doPage(pageRequest, () -> hodrCompanyMapper.selectByCondition(builder(HodrCompany.class).where(
                Sqls.custom()
                        .andLike("companyName", corpName,!"".equals(corpName))
                        .andLike("companyNumber", corpNumber,!"".equals(corpNumber))
                ).build()
                )
        );
    }
}
