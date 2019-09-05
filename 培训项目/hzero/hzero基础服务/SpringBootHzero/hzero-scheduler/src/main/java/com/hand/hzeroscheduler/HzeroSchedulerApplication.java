package com.hand.hzeroscheduler;

import org.hzero.autoconfigure.scheduler.EnableHZeroScheduler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableHZeroScheduler
@EnableDiscoveryClient
@SpringBootApplication
public class HzeroSchedulerApplication {

    public static void main(String[] args) {
        SpringApplication.run(HzeroSchedulerApplication.class, args);
    }

}
