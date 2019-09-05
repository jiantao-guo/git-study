package com.hand.order.infra.mapper;


import com.hand.order.domain.entity.Company;
import io.choerodon.mybatis.common.BaseMapper;

import java.util.List;

/**
 * 公司Mapper
 *
 * @author pigg 2019-08-05
 */
public interface CompanyMapper extends BaseMapper<Company> {

    List<Company> selectCompany(String companyNumber,String companyName);

}
