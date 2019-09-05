package org.hzero.train.order.app.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.hzero.boot.imported.app.service.IDoImportService;
import org.hzero.boot.imported.infra.validator.annotation.ImportService;
import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.app.service.HodrSoHeaderService;
import org.hzero.train.order.domain.repository.HodrSoHeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

@ImportService(templateCode = "HZERO.ORDER")
public class ImportServiceImpl implements IDoImportService {

    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private HodrSoHeaderService hodrSoHeaderService;

    @Override
    public Boolean doImport(String data) {
        HodrExportDto hodrExportDto;
        try {
            hodrExportDto = objectMapper.readValue(data, HodrExportDto.class);
        } catch (IOException e) {
            // 失败
            return false;
        }
        hodrSoHeaderService.insertFromExport(hodrExportDto);
        // 成功
        return true;
    }
}