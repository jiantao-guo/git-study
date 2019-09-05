package com.hand.infra.repository.impl;

import com.hand.infra.mapper.CompanyMapper;

import io.choerodon.core.domain.Page;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import org.hzero.mybatis.base.impl.BaseRepositoryImpl;
import com.hand.domain.entity.Company;
import com.hand.domain.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * 公司 资源库实现
 *
 * @author pigg 2019-08-05
 */
@Component
public class CompanyRepositoryImpl extends BaseRepositoryImpl<Company> implements CompanyRepository {

    private final CompanyMapper companyMapper;

    public CompanyRepositoryImpl(CompanyMapper companyMapper) {
        this.companyMapper = companyMapper;
    }

    @Override
    public List<Company> listCompany(String companyNumber, String companyName) {
        return companyMapper.selectCompany(companyNumber, companyName);
    }


//    @Override
//    public Page<Company> pageCompany(Company company, PageRequest pageRequest) {
//        return null;
//    }


//    @Override
//    public Page<Company> pageCompany(Company company, PageRequest pageRequest) {
//        return PageHelper.doPage(pageRequest,()-> companyMapper.selectCompany(company));
//    }
}
