package com.hand.app.service;

import com.hand.domain.DTO.OrderImport;

public interface ImportExcelService {

    Boolean insertData(OrderImport orderImport);

}
