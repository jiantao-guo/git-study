package com.hand.infra.repository.impl;

import com.hand.infra.mapper.ItemMapper;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import com.hand.domain.entity.Item;
import com.hand.domain.repository.ItemRepository;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 物料 资源库实现
 *
 * @author pigg 2019-08-05
 */
@Component
public class ItemRepositoryImpl extends BaseRepositoryImpl<Item> implements ItemRepository {

    private final ItemMapper itemMapper;

    public ItemRepositoryImpl(ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    @Override
    public List<Item> listItem(String itemCode, String itemDescription) {
        return itemMapper.selectItem(itemCode, itemDescription);
    }
}
