package com.hand.app.service.impl;

import com.hand.app.service.CompanyService;
import com.hand.domain.entity.Company;
import com.hand.infra.mapper.CompanyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 公司应用服务默认实现
 *
 * @author pigg 2019-08-05
 */
@Service
public class CompanyServiceImpl implements CompanyService {

//    @Autowired
//    private CompanyMapper companyMapper;
//
//
//    @Override
//    public Company selectCompany(String companyNumber, String companyName, Integer enabledFlag) {
//        Company company = companyMapper.queryCompany(companyNumber, companyName, enabledFlag);
//        return company;
//    }
//
//    @Override
//    public Company getCompanyByName(String companyName) {
//        Company company = companyMapper.getCompanyByName(companyName);
//        return company;
//    }
}
