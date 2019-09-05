package com.hand.order.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.service.Tag;
import springfox.documentation.spring.web.plugins.Docket;

/**
 * Swagger Api 描述配置
 */
@Configuration
public class SwaggerApiConfig {
    public static final String COMPANYS = "companys";
    public static final String CUSTOMER = "customers";
    public static final String ORDERS = "orders";
    public static final String Item = "item";


    @Autowired
    public SwaggerApiConfig(Docket docket) {
        docket.tags(
                new Tag(COMPANYS, "公司信息"),
                new Tag(CUSTOMER, "客户信息"),
                new Tag(ORDERS, "订单信息"),
                new Tag(Item, "物料信息")

        );
    }
}
