package com.hand.order.domain.repository;

import com.hand.order.domain.entity.ItemEntity;
import org.hzero.mybatis.base.BaseRepository;

import java.util.List;

public interface ItemRepository extends BaseRepository<ItemEntity> {
    List<ItemEntity> getItem(String itemCode);
}
