package org.hzero.train.order.api.dto;

import org.hzero.mybatis.domian.SecurityToken;
import org.hzero.train.order.domain.entity.HodrSoLine;

import java.util.List;

/**
 * @description:
 * @version: 1.0
 * @author: qinye, lin@hand-china.com
 * @Date: 2019/8/5
 */
public class HodrSoLineDto implements SecurityToken {
    private Long headerId;
    private List<HodrSoLine> lines;

    private String _token;

    public Long getHeaderId() {
        return headerId;
    }

    public HodrSoLineDto setHeaderId(Long headerId) {
        this.headerId = headerId;
        return this;
    }

    public List<HodrSoLine> getLines() {
        return lines;
    }

    public HodrSoLineDto setLines(List<HodrSoLine> lines) {
        this.lines = lines;
        return this;
    }

    @Override
    public String get_token() {
        return _token;
    }

    @Override
    public void set_token(String _token) {
        this._token = _token;
    }

    @Override
    public Class<? extends SecurityToken> associateEntityClass() {
        return HodrSoLine.class;
    }
}
