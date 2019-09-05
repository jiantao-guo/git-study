package com.hand.app.service.impl;

import com.baidu.unbiz.fluentvalidator.ValidatorContext;
import com.baidu.unbiz.fluentvalidator.ValidatorHandler;
import org.hzero.boot.imported.infra.validator.annotation.ImportValidator;
import org.hzero.boot.imported.infra.validator.annotation.ImportValidators;

@ImportValidators({@ImportValidator(templateCode = "orderImportTest")})
public class ImportValidatorOrder extends ValidatorHandler<String> {

    @Override
    public boolean validate(ValidatorContext context, String data) {
        // 获取自定义参数
        //Map args = context.getAttribute(HimpBootConstants.ARGS, Map.class);
        System.out.println("数据校验:"+data);
        // do something
        return true;
    }

}
