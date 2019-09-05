package com.hand.order.api.controller.v1;

import com.hand.order.config.SwaggerApiConfig;
import com.hand.order.domain.entity.ItemEntity;
import com.hand.order.domain.repository.ItemRepository;
import io.choerodon.core.iam.ResourceLevel;
import io.choerodon.swagger.annotation.Permission;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.hzero.core.util.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(tags = SwaggerApiConfig.Item)
@RestController
@RequestMapping("/v1/{organizationId}/Item")
public class ItemController {
    @Autowired
    private ItemRepository itemRepository;

    @ApiOperation(value = "查询物料")
    @Permission(level = ResourceLevel.SITE)
    @GetMapping("/getItem")
    public ResponseEntity<List<ItemEntity>> getItem(@PathVariable Long organizationId,
                                                     String itemCode){
        return Results.success(itemRepository.getItem(itemCode));
    }

}
