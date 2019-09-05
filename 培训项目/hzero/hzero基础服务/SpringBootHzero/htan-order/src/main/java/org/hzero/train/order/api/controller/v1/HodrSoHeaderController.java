package org.hzero.train.order.api.controller.v1;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */

import io.choerodon.core.domain.Page;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hzero.boot.platform.lov.annotation.ProcessLovValue;
import org.hzero.core.base.BaseConstants;
import org.hzero.core.base.BaseController;
import org.hzero.core.util.Results;
import org.hzero.export.annotation.ExcelExport;
import org.hzero.export.vo.ExportParam;
import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.app.service.HodrSoHeaderService;
import org.hzero.train.order.config.SwaggerApiConfig;
import org.hzero.train.order.domain.entity.HodrSoHeader;
import org.hzero.train.order.domain.repository.HodrSoHeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 销售订单头接口
 */
@Api(tags = SwaggerApiConfig.HodrSoHeader)
@RestController("HodrSoHeaderController.v1")
@RequestMapping("/v1/header")
public class HodrSoHeaderController extends BaseController {
    @Autowired
    private HodrSoHeaderRepository hodrSoHeaderRepository;

    @Autowired
    private HodrSoHeaderService hodrSoHeaderService;


    @Permission(level = ResourceLevel.ORGANIZATION)
    @ApiOperation(value = "分页条件查询")
    @GetMapping("/getByCond")
    @ProcessLovValue(targetField = BaseConstants.FIELD_BODY)
    public ResponseEntity<Page<HodrSoHeader>> pageHeader(Long companyId,
                                                       Long customerId,
                                                       Long itemId,
                                                       String orderNumber,
                                                       String orderStatus, PageRequest pageRequest) {
        return Results.success(hodrSoHeaderRepository.pageHeader(companyId,customerId,itemId,orderNumber,orderStatus,pageRequest));
    }


    @Permission(level = ResourceLevel.ORGANIZATION)
    @ApiOperation(value = "整单删除")
    @DeleteMapping("/deleteById")
    public ResponseEntity<Boolean> deleteHeader(HodrSoHeader header) {
        return Results.success(hodrSoHeaderService.deleteHeader(header));
    }

    @Permission(level = ResourceLevel.ORGANIZATION)
    @ApiOperation(value = "根据id查询头详情")
    @GetMapping("/queryById/{headerId}")
    @ProcessLovValue(targetField = BaseConstants.FIELD_BODY)
    public ResponseEntity<HodrSoHeader> queryByIdHeader(@PathVariable Long headerId) {
        return Results.success(hodrSoHeaderRepository.getHeader(headerId));
    }

    @Permission(level = ResourceLevel.ORGANIZATION)
    @ApiOperation(value = "导出")
    @ExcelExport(value = HodrExportDto.class)
    @GetMapping("/export")
    public ResponseEntity export(ExportParam exportParam, HttpServletResponse response, PageRequest pageRequest) {
        List<HodrExportDto> list = hodrSoHeaderRepository.exportHordOrder(response,exportParam, pageRequest);
        return Results.success(list);
    }



}
