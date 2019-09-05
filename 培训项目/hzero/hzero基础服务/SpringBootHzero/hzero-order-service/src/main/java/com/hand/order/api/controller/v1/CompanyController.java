package com.hand.order.api.controller.v1;

import com.hand.order.config.SwaggerApiConfig;
import com.hand.order.domain.entity.Company;
import com.hand.order.domain.entity.Customer;
import com.hand.order.domain.repository.CompanyRepository;
import com.hand.order.domain.repository.CustomerRepository;
import io.swagger.annotations.Api;
import org.hzero.core.base.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.ApiOperation;

import java.util.List;

/**
 * 公司 管理 API
 *
 * @author pigg 2019-08-05
 */
@Api(tags = SwaggerApiConfig.COMPANYS)
@RestController("CompanyController.v1")
@RequestMapping("/v1/{organizationId}/companys")
public class CompanyController extends BaseController {

    @Autowired
    private CompanyRepository companyRepository;

    @ApiOperation(value = "查询公司")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping("/selectCompanys")
    public List<Company> companyList(@PathVariable Long organizationId,String companyNumber, String companyName){
        return companyRepository.listCompany(companyNumber,companyName);
    }
}
