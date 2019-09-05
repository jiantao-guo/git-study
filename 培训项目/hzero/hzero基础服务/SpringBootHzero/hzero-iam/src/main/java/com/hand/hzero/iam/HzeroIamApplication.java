package com.hand.hzero.iam;

//import io.choerodon.eureka.event.EurekaEventHandler;
import org.hzero.autoconfigure.iam.EnableHZeroIam;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
@EnableHZeroIam
@EnableDiscoveryClient
@SpringBootApplication
public class HzeroIamApplication {

    public static void main(String[] args) {
//        EurekaEventHandler.getInstance().init();
        SpringApplication.run(HzeroIamApplication.class, args);
    }

}
