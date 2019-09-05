package org.hzero.train.order.app.service.impl;

import com.baidu.unbiz.fluentvalidator.ValidatorContext;
import com.baidu.unbiz.fluentvalidator.ValidatorHandler;
import org.hzero.boot.imported.infra.validator.annotation.ImportValidator;
import org.hzero.boot.imported.infra.validator.annotation.ImportValidators;

@ImportValidators({
        @ImportValidator(templateCode = "HZERO.ORDER")
})
public class ValidatorService extends ValidatorHandler<String> {
    @Override
    public boolean validate(ValidatorContext context, String s) {
        System.out.println("数据校验：" + context);
        // do something
        //需要校验每个必输字段不为空即可
        return true;
    }
}