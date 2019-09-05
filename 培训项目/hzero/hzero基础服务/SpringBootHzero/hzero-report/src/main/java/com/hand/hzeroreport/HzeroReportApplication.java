package com.hand.hzeroreport;

import org.hzero.autoconfigure.report.EnableHZeroReport;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableHZeroReport
@EnableDiscoveryClient
@SpringBootApplication
public class HzeroReportApplication {

    public static void main(String[] args) {
        SpringApplication.run(HzeroReportApplication.class, args);
    }

}
