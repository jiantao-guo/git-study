function new_bm_map(name) {
	return new CompositeMap("bm", 'http://www.aurora-framework.org/schema/bm',
			name);
}

function create_std_query_field() {
	var qf = new_bm_map('query-field');
	qf.name = 'authority_flag';
	qf.queryexpression = '(${@authority_flag}='
			+ "'"
			+ "Y"
			+ "'"
			+ 'and exists (select 1 from aut_trx_user_authorize a1,aut_owner_user_authorize a2 where a1.trx_category = ${@trx_category} and a1.trx_id = ${:@trx_id}  and trunc(sysdate) between a1.start_date and nvl(a1.end_date,trunc(sysdate)) and a1.user_id = a2.owner_user_id and a1.trx_category = a2.trx_category  and a2.authorized_user_id = ${/session/@user_id} and trunc(sysdate) between a2.start_date and nvl(a2.end_date,trunc(sysdate))))';
	$this.addQueryField(qf.getData()); // get it's java type...
}

function create_doc_query_field() {
	var qf = new_bm_map('query-field');
	qf.name = 'authority_flag';
	qf.queryexpression = '(${@authority_flag}='
			+ "'"
			+ "Y"
			+ "'"
			+ 'and t1.owner_user_id IN (SELECT owner_user_id FROM aut_owner_user_authorize t  WHERE authorized_user_id = ${/session/@user_id} AND t.trx_category=${@trx_category} AND trunc(sysdate) BETWEEN t.start_date AND NVL(t.end_date,trunc(sysdate))))';
	$this.addQueryField(qf.getData()); // get it's java type...
}

create_std_query_field();
