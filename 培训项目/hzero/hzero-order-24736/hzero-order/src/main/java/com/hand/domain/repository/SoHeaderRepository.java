package com.hand.domain.repository;

import org.hzero.mybatis.base.BaseRepository;
import com.hand.domain.entity.SoHeader;

/**
 * 销售订单头资源库
 *
 * @author pigg 2019-08-05
 */
public interface SoHeaderRepository extends BaseRepository<SoHeader> {

    Boolean UpdateStatus();
}
