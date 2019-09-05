package org.hzero.train.order.domain.repository;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.mybatis.base.BaseRepository;
import org.hzero.train.order.domain.entity.HodrCompany;

/**
 * @description:公司资源库
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public interface HodrCompanyRepository extends BaseRepository<HodrCompany> {
    Page<HodrCompany> getCorp(String corpName,String corpNumber,PageRequest pageRequest);
}
