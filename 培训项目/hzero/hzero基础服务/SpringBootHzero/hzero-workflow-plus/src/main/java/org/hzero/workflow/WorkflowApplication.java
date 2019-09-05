package org.hzero.workflow;

import org.hzero.autoconfigure.EnableHZeroWorkflow;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableHZeroWorkflow
@EnableDiscoveryClient
@SpringBootApplication
public class WorkflowApplication {

    public static void main(String[] args) {
        SpringApplication.run(WorkflowApplication.class, args);
    }
}


