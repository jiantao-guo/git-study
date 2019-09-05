package org.hzero.train.order.config;

import io.choerodon.core.swagger.ChoerodonRouteData;
import io.choerodon.swagger.annotation.ChoerodonExtraData;
import io.choerodon.swagger.swagger.extra.ExtraData;
import io.choerodon.swagger.swagger.extra.ExtraDataManager;

/**
 * 服务路由配置
 */
@ChoerodonExtraData
public class HorderExtraDataManager implements ExtraDataManager {

    @Override
    public ExtraData getData() {
        ChoerodonRouteData choerodonRouteData = new ChoerodonRouteData();
        choerodonRouteData.setName("hzod");
        choerodonRouteData.setPath("/order/**");
        choerodonRouteData.setServiceId("hzero-order");
        extraData.put(ExtraData.ZUUL_ROUTE_DATA, choerodonRouteData);
        return extraData;
    }
}