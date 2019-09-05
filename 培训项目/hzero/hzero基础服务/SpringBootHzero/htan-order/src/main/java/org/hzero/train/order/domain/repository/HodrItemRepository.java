package org.hzero.train.order.domain.repository;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.mybatis.base.BaseRepository;
import org.hzero.train.order.domain.entity.HodrItem;

/**
 * @description:物料资源库
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrItemRepository extends BaseRepository<HodrItem> {
    Page<HodrItem> getItem(String itemCode, String itemDescription, PageRequest pageRequest);
}
