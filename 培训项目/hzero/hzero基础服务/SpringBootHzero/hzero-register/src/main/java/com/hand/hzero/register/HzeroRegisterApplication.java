package com.hand.hzero.register;

import org.hzero.autoconfigure.register.EnableHZeroRegister;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;
import org.springframework.cloud.netflix.eureka.server.EurekaServerAutoConfiguration;
import org.springframework.context.annotation.Import;

@EnableHZeroRegister
@EnableEurekaServer
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@Import(EurekaServerAutoConfiguration.class)
public class HzeroRegisterApplication {

    public static void main(String[] args) {
        SpringApplication.run(HzeroRegisterApplication.class, args);
    }

}
