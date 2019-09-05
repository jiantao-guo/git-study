package org.hzero.train.order.api.controller.v1;

import io.choerodon.core.domain.Page;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hzero.core.base.BaseController;
import org.hzero.core.util.Results;
import org.hzero.train.order.config.SwaggerApiConfig;
import org.hzero.train.order.domain.entity.HodrCompany;
import org.hzero.train.order.domain.repository.HodrCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description:公司Lov接口
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@Api(tags = SwaggerApiConfig.HodrCompany)
@RestController("HodrCompanyController.v1")
@RequestMapping("/v1/conpamy")
public class HodrCompanyController extends BaseController {

    @Autowired
    private HodrCompanyRepository hodrCompanyRepository;

    @Permission(level = ResourceLevel.ORGANIZATION)
    @ApiOperation(value = "公司LOV测试")
    @GetMapping
    public ResponseEntity<Page<HodrCompany>> pageCorp(String companyName, String companyNumber, PageRequest pageRequest){
        return Results.success(hodrCompanyRepository.getCorp(companyName,companyNumber,pageRequest));
    }
}
