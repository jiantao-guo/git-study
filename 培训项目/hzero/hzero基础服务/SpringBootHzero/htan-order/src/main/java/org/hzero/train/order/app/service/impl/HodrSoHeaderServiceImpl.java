package org.hzero.train.order.app.service.impl;

import io.choerodon.core.exception.CommonException;
import org.hzero.mybatis.helper.SecurityTokenHelper;
import org.hzero.mybatis.util.Sqls;
import org.hzero.train.order.api.dto.HodrExportDto;
import org.hzero.train.order.app.service.HodrSoHeaderService;
import org.hzero.train.order.domain.entity.*;
import org.hzero.train.order.domain.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import static org.hzero.mybatis.domian.Condition.builder;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
@Service
public class HodrSoHeaderServiceImpl implements HodrSoHeaderService {
    @Autowired
    private HodrSoHeaderRepository hodrSoHeaderRepository;

    @Autowired
    private HodrSoLineRepository hodrSoLineRepository;

    @Autowired
    private HodrCompanyRepository companyRepository;

    @Autowired
    private HodrCustomerRepository customerRepository;
    @Autowired
    private HodrItemRepository hodrItemRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public HodrSoHeader createHodrHeader(HodrSoHeader header) {
        if(header.getId()!=null){
            return updateHodrHeader(header);
        }
        header.generateNumber();
        header.setOrderStatus("NEW");
        header.setOrderDate(new Date());
        hodrSoHeaderRepository.insert(header);
        return header;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public HodrSoHeader updateHodrHeader(HodrSoHeader header) {
        HodrSoHeader exist = hodrSoHeaderRepository.selectByPrimaryKey(header);
        if (exist == null) {
            throw new CommonException("hzod.warn.header.notFound");
        }
        hodrSoHeaderRepository.updateByPrimaryKey(header);
        return header;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean deleteHeader(HodrSoHeader header) {
        SecurityTokenHelper.validToken(header);
        //删除行
        List<HodrSoLine> lines = hodrSoLineRepository.getLineByHeaderId(header.getId());
        lines.stream().forEach(e->{
            SecurityTokenHelper.validToken(e);
            hodrSoLineRepository.deleteByPrimaryKey(e);
        });
        //删除头
        hodrSoHeaderRepository.deleteByPrimaryKey(header);
        return Boolean.TRUE;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Boolean insertFromExport(HodrExportDto hodrExportDto) {
        System.out.println("导入临时数据order_number:"+hodrExportDto.getOrderNumber());
        System.out.println("导入临时数据line_number:"+hodrExportDto.getLineNumber());
        System.out.println("=================================1======================================");
        HodrCompany company=new HodrCompany();
        company.setCompanyNumber(hodrExportDto.getCompanyNumber());
        HodrCustomer customer=new HodrCustomer();
        customer.setCustomerNumber(hodrExportDto.getCustomerNumber());
        HodrItem hodrItem=new HodrItem();
        hodrItem.setItemCode(hodrExportDto.getItemCode());
        //获取公司和客户id
        HodrCompany hodrCompany = companyRepository.selectOne(company);
        HodrCustomer hodrCustomer = customerRepository.selectOne(customer);
        HodrItem item = hodrItemRepository.selectOne(hodrItem);

        String orderNumber = hodrExportDto.getOrderNumber();
        Long hodrCompanyId=null;
        if(hodrCompany!=null){
            hodrCompanyId = hodrCompany.getId();
        }
        System.out.println("=================================2=====================================");
        //判断头不存在
        List<HodrSoHeader> headers = hodrSoHeaderRepository.selectByCondition(
                builder(HodrSoHeader.class).where(
                        Sqls.custom().andEqualTo("orderNumber", orderNumber)
                        .andEqualTo("companyId",hodrCompanyId)
                ).build()
        );

        Long headerId=null;
        System.out.println("=================================11======================================");
        if(headers.size()<1){
            //设置头
            HodrSoHeader header=new HodrSoHeader();
            header.setCompanyId(hodrCompany.getId());
            header.setOrderStatus("NEW");
            header.setOrderStatusMeaning(hodrExportDto.getOrderStatus());
            header.setOrderDate(hodrExportDto.getOrderDate());
            header.setCustomerId(hodrCustomer.getId());
            header.setOrderNumber(hodrExportDto.getOrderNumber());
            hodrSoHeaderRepository.insert(header);
            System.out.println("=================================22======================================");
            HodrSoHeader hodrSoHeader = hodrSoHeaderRepository.selectOne(header);
            System.out.println("=================================33======================================");
            headerId=hodrSoHeader.getId();
        }else{
            headerId=headers.get(0).getId();
        }
        System.out.println("=================================headerId======================================");

        Integer lineNumber = hodrExportDto.getLineNumber();


        //校验行数据
        List<HodrSoLine> lines = hodrSoLineRepository.selectByCondition(
                builder(HodrSoLine.class).andWhere(
                        Sqls.custom().andEqualTo("soHeaderId", headerId)
                                .andEqualTo("lineNumber",lineNumber)
                ).build()
        );
        System.out.println("=================================3======================================");
        HodrSoLine line=new HodrSoLine();
        line.setSoHeaderId(headerId);
        line.setLineNumber(lineNumber);
        line.setItemId(item.getId());
        line.setOrderQuantity(hodrExportDto.getOrderQuantity());
        line.setUnitSellingPrice(hodrExportDto.getUnitSellingPrice());
        line.setOrderQuantityUom(hodrExportDto.getOrderQuantityUom());
        if(CollectionUtils.isEmpty(lines)){
            hodrSoLineRepository.insert(line);
        }else{
            line.setId(lines.get(0).getId());
            line.setObjectVersionNumber(lines.get(0).getObjectVersionNumber());
            hodrSoLineRepository.updateByPrimaryKeySelective(line);
        }
        System.out.println("=================================4======================================");
        return true;
    }
}
