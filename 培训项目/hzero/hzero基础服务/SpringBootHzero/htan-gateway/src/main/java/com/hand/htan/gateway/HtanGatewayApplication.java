package com.hand.htan.gateway;

import org.hzero.autoconfigure.gateway.EnableHZeroGateway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableHZeroGateway
@EnableDiscoveryClient
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class HtanGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(HtanGatewayApplication.class, args);
    }

}
