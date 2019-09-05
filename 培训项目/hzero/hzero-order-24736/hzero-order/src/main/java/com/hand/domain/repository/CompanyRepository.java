package com.hand.domain.repository;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.mybatis.base.BaseRepository;
import com.hand.domain.entity.Company;

import java.util.List;

/**
 * 公司资源库
 *
 * @author pigg 2019-08-05
 */
public interface CompanyRepository extends BaseRepository<Company> {

    //    Page<Company> pageCompany(Company company, PageRequest pageRequest);
    List<Company> listCompany(String companyNumber, String companyName);

}
