package com.hand.api.controller.v1;

import com.hand.domain.DTO.OrderDTO;
import com.hand.domain.entity.Order;
import com.hand.domain.repository.ExportRepository;
import com.hand.domain.repository.OrderRepository;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.ApiOperation;
import org.hzero.core.base.BaseController;
import org.hzero.core.util.Results;
import org.hzero.export.annotation.ExcelExport;
import org.hzero.export.vo.ExportParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController("orderSiteController.v1")
@RequestMapping("/v1/orders")
public class OrderController extends BaseController {

    @Autowired
    private OrderRepository orderRepository;


    @ApiOperation(value = "查询订单")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping
    public List<Order> listOrder(String companyName, String customerName, String orderNumber, String itemCode, String orderStatues) {

        return orderRepository.listOrder(companyName, customerName, orderNumber, itemCode, orderStatues);
    }


}
