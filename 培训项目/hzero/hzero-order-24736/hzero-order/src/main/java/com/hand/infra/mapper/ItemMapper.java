package com.hand.infra.mapper;

import com.hand.domain.entity.Item;
import io.choerodon.mybatis.common.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 物料Mapper
 *
 * @author pigg 2019-08-05
 */
public interface ItemMapper extends BaseMapper<Item> {
    List<Item> selectItem(@Param("itemCode") String itemCode, @Param("itemDescription") String itemDescription);

    Item selectItemByCode(@Param("itemCode") String itemCode);


}
