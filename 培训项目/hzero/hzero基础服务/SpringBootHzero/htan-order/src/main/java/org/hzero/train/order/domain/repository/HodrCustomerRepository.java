package org.hzero.train.order.domain.repository;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.mybatis.base.BaseRepository;
import org.hzero.train.order.domain.entity.HodrCustomer;

/**
 * @description:客户资源库
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrCustomerRepository extends BaseRepository<HodrCustomer> {
    Page<HodrCustomer> getCustomer(String customerName, String customerNumber,Long corpId,PageRequest pageRequest);
}
