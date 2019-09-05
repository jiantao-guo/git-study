package org.hzero.train.order.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.service.Tag;
import springfox.documentation.spring.web.plugins.Docket;

@Configuration
public class SwaggerApiConfig {
    public static final String HodrSoHeader = "HodrSoHeader";
    public static final String HodrSoLine = "HodrSoLine";
    public static final String HodrCompany = "HodrCompany";
    public static final String HodrCustomer = "HodrCustomer";
    public static final String HodrItem = "HodrItem";


    @Autowired
    public SwaggerApiConfig(Docket docket) {
        docket.tags(
                new Tag(HodrSoHeader, "销售订单头接口"),
                new Tag(HodrSoLine, "销售订单行接口"),
                new Tag(HodrCompany, "公司LOV接口"),
                new Tag(HodrCustomer, "客户LOV接口"),
                new Tag(HodrItem, "物料LOV接口")
        );
    }
}