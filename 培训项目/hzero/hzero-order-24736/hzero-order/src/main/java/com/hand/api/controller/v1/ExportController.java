package com.hand.api.controller.v1;

import com.hand.domain.DTO.OrderDTO;
import com.hand.domain.repository.ExportRepository;
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

@RestController("exportSiteController.v1")
@RequestMapping("/v1/export")
public class ExportController extends BaseController {

    @Autowired
    private ExportRepository exportRepository;

    @ApiOperation(value = "导出订单")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping("/export")
    @ExcelExport(OrderDTO.class)
    public ResponseEntity exportOrder(OrderDTO orderDTO, ExportParam exportParam, HttpServletResponse response) {

        List<OrderDTO> list = exportRepository.exportOrder(orderDTO, exportParam);
        return Results.success(list);
    }
}
