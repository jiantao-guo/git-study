package com.hand.infra.mapper;

import com.hand.domain.entity.Company;
import io.choerodon.mybatis.common.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 公司Mapper
 *
 * @author pigg 2019-08-05
 */
public interface CompanyMapper extends BaseMapper<Company> {

    List<Company> selectCompany(String companyNumber, String companyName);

    Company  getCompany(Long companyId);

//    Company queryCompany(String companyNumber,String companyName,Integer enabledFlag);

//    Company  getCompanyByName(String companyName);

    List<Company> getCompanyByNumber(String companyNumber,String companyName);

    Company selectByNumber(String companyNumber);



}
