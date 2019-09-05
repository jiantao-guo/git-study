package com.hand.api.controller.v1;

import org.hzero.core.util.Results;
import org.hzero.core.base.BaseController;
import com.hand.domain.entity.Customer;
import com.hand.domain.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.hzero.mybatis.helper.SecurityTokenHelper;

import io.choerodon.core.domain.Page;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.mybatis.pagehelper.annotation.SortDefault;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import io.choerodon.mybatis.pagehelper.domain.Sort;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.ApiOperation;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 客户 管理 API
 *
 * @author pigg 2019-08-05
 */
@RestController("customerSiteController.v1")
@RequestMapping("/v1/customers")
public class CustomerController extends BaseController {

    @Autowired
    private CustomerRepository customerRepository;

    //    @ApiOperation(value = "客户列表")
//    @Permission(level = ResourceLevel.SITE)
//    @GetMapping
//    public ResponseEntity<Page<Customer>> list(Customer customer, @ApiIgnore @SortDefault(value = Customer.FIELD_CUSTOMER_ID,
//            direction = Sort.Direction.DESC) PageRequest pageRequest) {
//        Page<Customer> list = customerRepository.pageAndSort(pageRequest, customer);
//        return Results.success(list);
//    }
    @ApiOperation(value = "客户查询")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping
    public List<Customer> listCustomer(String customerName) {
        return customerRepository.listCustomer(customerName);

    }

    @ApiOperation(value = "客户明细")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping("/{customerId}")
    public ResponseEntity<Customer> detail(@PathVariable Long customerId) {
        Customer customer = customerRepository.selectByPrimaryKey(customerId);
        return Results.success(customer);
    }

    @ApiOperation(value = "创建客户")
    @Permission(level = ResourceLevel.SITE)
    @PostMapping
    public ResponseEntity<Customer> create(@RequestBody Customer customer) {
        validObject(customer);
        customerRepository.insertSelective(customer);
        return Results.success(customer);
    }

    @ApiOperation(value = "修改客户")
    @Permission(level = ResourceLevel.SITE)
    @PutMapping
    public ResponseEntity<Customer> update(@RequestBody Customer customer) {
        SecurityTokenHelper.validToken(customer);
        customerRepository.updateByPrimaryKeySelective(customer);
        return Results.success(customer);
    }

    @ApiOperation(value = "删除客户")
    @Permission(level = ResourceLevel.SITE)
    @DeleteMapping
    public ResponseEntity<?> remove(@RequestBody Customer customer) {
        SecurityTokenHelper.validToken(customer);
        customerRepository.deleteByPrimaryKey(customer);
        return Results.success();
    }

}
