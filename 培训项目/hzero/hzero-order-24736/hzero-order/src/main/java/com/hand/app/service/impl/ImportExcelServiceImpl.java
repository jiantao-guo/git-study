package com.hand.app.service.impl;


import com.hand.app.service.ImportExcelService;
import com.hand.domain.DTO.OrderImport;
import com.hand.domain.entity.*;
import com.hand.infra.mapper.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImportExcelServiceImpl implements ImportExcelService {

    @Autowired
    private CompanyMapper companyMapper;
    @Autowired
    private CustomerMapper customerMapper;
    @Autowired
    private SoHeaderMapper soHeaderMapper;
    @Autowired
    private SoLineMapper soLineMapper;
    @Autowired
    private ItemMapper itemMapper;

    @Override
    public Boolean insertData(OrderImport orderImport) {

        Company company = companyMapper.selectByNumber(orderImport.getCompanyNumber());
        Customer customer = customerMapper.selectCustomerByNumber(orderImport.getCustomerNumber());
        Item item = itemMapper.selectItemByCode(orderImport.getItemCode());

        SoHeader soHeader = new SoHeader();
        soHeader.setOrderNumber(orderImport.getOrderNumber());
        soHeader.setCompanyId(company.getCompanyId());
        soHeader.setOrderDate(orderImport.getOrderDate());
        soHeader.setOrderStatus(orderImport.getOrderStatus());
        soHeader.setCompanyId(customer.getCustomerId());

        Boolean isHeader = soHeaderMapper.insertHeader(soHeader);     // 插入soheader表

        SoLine soLine = new SoLine();
        Long soHeaderId = soHeader.getSoHeaderId();
        soLine.setSoHeaderId(soHeaderId);
        soLine.setLineNumber(orderImport.getLineNumber());
        soLine.setItemId(item.getItemId());
        soLine.setOrderQuantity(orderImport.getOrderQuantity());
        soLine.setOrderQuantityUom(orderImport.getOrderQuantityUom());
        soLine.setUnitSellingPrice(orderImport.getUnitSellingPrice());

        Boolean lineResult = soLineMapper.insertLine(soLine);    //  插入soline表

        return true;
    }
}
