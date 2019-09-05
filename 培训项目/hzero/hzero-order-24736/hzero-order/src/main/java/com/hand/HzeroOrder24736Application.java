package com.hand;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import io.choerodon.resource.annoation.EnableChoerodonResourceServer;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableChoerodonResourceServer
@EnableDiscoveryClient
@SpringBootApplication
public class HzeroOrder24736Application {

    public static void main(String[] args) {
        SpringApplication.run(HzeroOrder24736Application.class, args);
    }
}


