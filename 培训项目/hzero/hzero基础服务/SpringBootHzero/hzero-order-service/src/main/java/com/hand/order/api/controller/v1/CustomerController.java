package com.hand.order.api.controller.v1;

import com.hand.order.config.SwaggerApiConfig;
import com.hand.order.domain.entity.Customer;
import com.hand.order.domain.repository.CustomerRepository;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hzero.core.base.BaseController;
import org.hzero.core.util.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(tags = SwaggerApiConfig.CUSTOMER)
@RestController("CustomerController.v1")
@RequestMapping("/v1/{organizationId}/customers")
public class CustomerController extends BaseController {
    @Autowired
    private CustomerRepository customerRepository;

    @ApiOperation(value = "查询客户")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping("/getCustomer")
    public ResponseEntity<List<Customer>> getCustomer(@PathVariable Long organizationId,String customerNumber, String customerName){
        return Results.success(customerRepository.getCustomer(customerNumber,customerName));
    }
}
