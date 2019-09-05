package com.hand.order.domain.repository;

import com.hand.order.domain.entity.Company;
import org.hzero.mybatis.base.BaseRepository;

import java.util.List;

/**
 * 公司资源库
 *
 * @author pigg 2019-08-05
 */
public interface CompanyRepository extends BaseRepository<Company> {

    List<Company> listCompany(String companyNumber,String companyName);

}
