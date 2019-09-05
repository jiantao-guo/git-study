package com.hand.domain.repository;

import org.hzero.mybatis.base.BaseRepository;
import com.hand.domain.entity.Item;

import java.util.List;

/**
 * 物料资源库
 *
 * @author pigg 2019-08-05
 */
public interface ItemRepository extends BaseRepository<Item> {
    List<Item> listItem(String itemCode, String itemDescription);

}
