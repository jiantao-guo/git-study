package org.hzero.train.order.infra.repository.impl;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.PageHelper;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.hzero.mybatis.util.Sqls;
import org.hzero.train.order.domain.entity.HodrItem;
import org.hzero.train.order.domain.repository.HodrItemRepository;
import org.hzero.train.order.infra.mapper.HodrItemMapper;
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
public class HodrItemRepositoryImpl extends BaseRepositoryImpl<HodrItem> implements HodrItemRepository {

    @Autowired
    private HodrItemMapper hodrItemMapper;


    @Override
    public Page<HodrItem> getItem(String itemCode, String itemDescription, PageRequest pageRequest) {
        return PageHelper.doPage(pageRequest, () -> hodrItemMapper.selectByCondition(builder(HodrItem.class).where(
                Sqls.custom()
                        .andLike("itemCode", itemCode,!"".equals(itemCode))
                        .andLike("itemDescription", itemDescription,!"".equals(itemDescription))
                ).build()
                )
        );
    }
}
