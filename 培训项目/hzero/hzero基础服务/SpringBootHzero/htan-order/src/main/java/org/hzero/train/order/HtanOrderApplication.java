package org.hzero.train.order;

import io.choerodon.resource.annoation.EnableChoerodonResourceServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableDiscoveryClient // 启用注册中心客户端
@EnableChoerodonResourceServer // 开启资源认证、关闭 Security 安全认证
@SpringBootApplication
public class HtanOrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(HtanOrderApplication.class, args);
    }

}
