package com.hand.api.controller.v1;

import org.hzero.core.util.Results;
import org.hzero.core.base.BaseController;
import com.hand.domain.entity.SoHeader;
import com.hand.domain.repository.SoHeaderRepository;
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

/**
 * 销售订单头 管理 API
 *
 * @author pigg 2019-08-05
 */
@RestController("soHeaderSiteController.v1")
@RequestMapping("/v1/so-headers")
public class SoHeaderController extends BaseController {

    @Autowired
    private SoHeaderRepository soHeaderRepository;

    @ApiOperation(value = "销售订单头列表")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping
    public ResponseEntity<Page<SoHeader>> list(SoHeader soHeader, @ApiIgnore @SortDefault(value = SoHeader.FIELD_SO_HEADER_ID,
            direction = Sort.Direction.DESC) PageRequest pageRequest) {
        Page<SoHeader> list = soHeaderRepository.pageAndSort(pageRequest, soHeader);
        return Results.success(list);
    }

    @ApiOperation(value = "销售订单头明细")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping("/{soHeaderId}")
    public ResponseEntity<SoHeader> detail(@PathVariable Long soHeaderId) {
        SoHeader soHeader = soHeaderRepository.selectByPrimaryKey(soHeaderId);
        return Results.success(soHeader);
    }

    @ApiOperation(value = "创建销售订单头")
    @Permission(level = ResourceLevel.SITE)
    @PostMapping
    public ResponseEntity<SoHeader> create(@RequestBody SoHeader soHeader) {
        validObject(soHeader);
        soHeaderRepository.insertSelective(soHeader);
        return Results.success(soHeader);
    }

    @ApiOperation(value = "修改销售订单头")
    @Permission(level = ResourceLevel.SITE)
    @PutMapping
    public ResponseEntity<SoHeader> update(@RequestBody SoHeader soHeader) {
        SecurityTokenHelper.validToken(soHeader);
        soHeaderRepository.updateByPrimaryKeySelective(soHeader);
        return Results.success(soHeader);
    }

    @ApiOperation(value = "删除销售订单头")
    @Permission(level = ResourceLevel.SITE)
    @DeleteMapping
    public ResponseEntity<?> remove(@RequestBody SoHeader soHeader) {
        SecurityTokenHelper.validToken(soHeader);
        soHeaderRepository.deleteByPrimaryKey(soHeader);
        return Results.success();
    }

}
