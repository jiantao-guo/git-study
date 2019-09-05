package com.hand.app.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hand.app.service.ImportExcelService;
import com.hand.domain.DTO.OrderImport;
//import com.hand.domain.repository.ImportRepository;
//import org.codehaus.jackson.map.ObjectMapper;
import org.hzero.boot.imported.app.service.IDoImportService;
import org.hzero.boot.imported.infra.validator.annotation.ImportService;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Map;

@ImportService(templateCode = "TEST")
public class ImportServiceImpl implements IDoImportService {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ImportExcelService importExcelService;

    @Override
    public Boolean doImport(String data) {

        Map<String, Object> args = getArgs();
        OrderImport orderImport = null;
        try {
            orderImport = objectMapper.readValue(data, OrderImport.class);
        } catch (IOException e) {
            // 失败
            return false;
        }
//        importRepository.insertSelective(orderImport);
        Boolean result=importExcelService.insertData(orderImport);
        // 成功
        return result;
//        return true;

    }
}
