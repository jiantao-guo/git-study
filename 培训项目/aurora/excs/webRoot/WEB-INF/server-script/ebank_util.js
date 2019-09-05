function EbankUtil() {

}

/**
 * 记录日志信息
 * 
 * option:
 * 
 * level:日志级别，可空，DEBUG，INFO，WARN，ERROR，FATAL，默认为DEBUG.
 * 
 * log_text:日志内容，非空.
 * 
 * p_ref_table:关联表，可空
 * 
 * p_ref_field:关联字段，可空
 * 
 * p_ref_id:关联ID，可空
 */
EbankUtil.prototype.log = function(option) {
	println(option.log_text);
	$bm('ebank.log').execute(option);
}

EbankUtil.prototype.dolock = function(ebankType) {
	$bm('ebank.dolock').execute({
		ebank_type : ebankType
	});
}

EbankUtil.prototype.unlock = function(ebankType) {
	$bm('ebank.unlock').execute({
		ebank_type : ebankType
	});
}

EbankUtil.prototype.paySendUpdateTrans = function(data) {
	for (var i = 0; i < data.length; i++) {
		if(data[i]._status == 'update'){
			$bm('ebank.update_trans_detail_commit').update(data[i]);
		}
	}
}

EbankUtil.prototype.paySendUpdateTransBatch = function(data) {
	for (var i = 0; i < data.length; i++) {
		if(data[i]._status == 'update'){
			$bm('ebank.update_trans_detail_batch').update(data[i]);
		}
	}
}

EbankUtil.prototype.getDate = function(){
	return $bm('ebank.get_date').queryAsMap().getChildren()[0].current_date;
}

EbankUtil.prototype.getTime = function(){
	return $bm('ebank.get_date').queryAsMap().getChildren()[0].current_time;
}