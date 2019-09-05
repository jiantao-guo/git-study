package com.hand.order.infra.repository.impl;

import com.hand.order.domain.entity.ItemEntity;
import com.hand.order.domain.repository.ItemRepository;
import com.hand.order.infra.mapper.ItemMapper;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import org.hzero.mybatis.domian.Condition;
import org.hzero.mybatis.util.Sqls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ItemRepositoryImpl extends BaseRepositoryImpl<ItemEntity> implements ItemRepository {

    @Autowired
    private ItemMapper itemMapper;
    @Override
    public List<ItemEntity> getItem(String itemCode) {
        return itemMapper.selectByCondition(
                Condition.builder(ItemEntity.class)
                .andWhere(
                        Sqls.custom().andLike("itemCode",itemCode,itemCode!="")

                ).build()
        );
    }
}
