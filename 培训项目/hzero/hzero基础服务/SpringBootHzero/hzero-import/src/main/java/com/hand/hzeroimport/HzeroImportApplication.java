package com.hand.hzeroimport;

import org.hzero.autoconfigure.imported.EnableHZeroImport;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableHZeroImport
@EnableDiscoveryClient
@SpringBootApplication
public class HzeroImportApplication {

    public static void main(String[] args) {
        SpringApplication.run(HzeroImportApplication.class, args);
    }

}
