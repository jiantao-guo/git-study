package org.hzero.train.order.api.controller.v1;

import io.choerodon.core.domain.Page;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.mybatis.pagehelper.PageHelper;
import io.choerodon.mybatis.pagehelper.domain.PageRequest;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hzero.core.base.BaseController;
import org.hzero.core.util.Results;
import org.hzero.train.order.api.dto.HodrSoLineDto;
import org.hzero.train.order.app.service.HodrSoLineService;
import org.hzero.train.order.config.SwaggerApiConfig;
import org.hzero.train.order.domain.entity.HodrSoLine;
import org.hzero.train.order.domain.repository.HodrSoLineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@Api(tags = SwaggerApiConfig.HodrSoLine)
@RequestMapping("/v1/line")
@RestController("HodrSoLineController.v1")
public class HodrSoLineController extends BaseController {

    @Autowired
    private HodrSoLineService hodrSoLineService;

    @Autowired
    private HodrSoLineRepository hodrSoLineRepository;


    @Permission(level = ResourceLevel.ORGANIZATION)
    @ApiOperation(value = "行新增/更新接口")
    @PostMapping
    public ResponseEntity<Boolean> createUpdateLine(@RequestBody HodrSoLineDto hodrDto){
        return Results.success(hodrSoLineService.createHodrLine(hodrDto));
    }


    @Permission(level = ResourceLevel.ORGANIZATION)
    @ApiOperation(value = "行批量删除接口")
    @DeleteMapping
    public ResponseEntity<Boolean> batchDeleteLine(@RequestBody List<HodrSoLine> lines){
        return Results.success(hodrSoLineService.deleteHodrLine(lines));
    }


    @Permission(level = ResourceLevel.ORGANIZATION)
    @ApiOperation(value = "根据头id查询行详情")
    @GetMapping("/getByHeaderId/{headerId}")
    public ResponseEntity<Page<HodrSoLine>> pageLines(@PathVariable Long headerId, PageRequest pageRequest) {
        return Results.success(PageHelper.doPage(pageRequest, () -> hodrSoLineRepository.getLineByHeaderId(headerId)));
    }


}
