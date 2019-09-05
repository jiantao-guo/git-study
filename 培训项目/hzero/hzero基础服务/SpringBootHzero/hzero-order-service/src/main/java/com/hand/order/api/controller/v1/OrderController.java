package com.hand.order.api.controller.v1;

import com.hand.order.api.dto.HodrExportDto;
import com.hand.order.app.service.OrderService;
import com.hand.order.config.SwaggerApiConfig;
import com.hand.order.domain.entity.OrderEntity;
import com.hand.order.domain.repository.OrderRepository;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hzero.core.util.Results;
import org.hzero.export.annotation.ExcelExport;
import org.hzero.export.vo.ExportParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Api(tags = SwaggerApiConfig.ORDERS)
@RestController
@RequestMapping("/v1/orders")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderService orderService;
    @ApiOperation(value = "查询订单信息")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping("/selectOrder")
    public List<OrderEntity> getOrder(String companyName,
                                      String customerName,
                                      String orderNumber,
                                      String itemCode,
                                      String orderStatues){
        return orderRepository.getOrder(companyName,customerName,orderNumber,itemCode,orderStatues);
    }

    @ApiOperation(value = "导出订单信息")
    @Permission(level = ResourceLevel.ORGANIZATION)
    @GetMapping("/exportOrder")
    @ExcelExport(HodrExportDto.class)
    public ResponseEntity exportOrder(HodrExportDto hodrExportDto, ExportParam exportParam,HttpServletResponse response){
        List<HodrExportDto> list=orderRepository.exportOrder(hodrExportDto,exportParam);
        return Results.success(list);

    }
    @ApiOperation(value = "新增头信息")
    @Permission(level = ResourceLevel.ORGANIZATION)
    @PostMapping("/addOrder")
    public ResponseEntity<OrderEntity> addOrder(OrderEntity orderEntity){
        return Results.success(orderService.addOrder(orderEntity));
    }

    @ApiOperation(value = "修改订单信息")
    @Permission(level = ResourceLevel.ORGANIZATION)
    @PutMapping("/updateOrder")
    public ResponseEntity<OrderEntity> updateOrder(OrderEntity orderEntity){
        return Results.success(orderService.updateOrder(orderEntity));
    }
    @ApiOperation(value = "删除订单信息")
    @Permission(level = ResourceLevel.ORGANIZATION)
    @DeleteMapping("/deleteOrder")
    public ResponseEntity<Boolean> deleteOrder(OrderEntity orderEntity){
//        return orderRepository.delete(orderEntity);
        return Results.success(orderService.deleteOrder(orderEntity));
    }



}
