hec.service('UserInfoService', ['$AuHttp', 'HecService', function(auHttp, hecS){
	return {
		/**
         * queryUserInfo：查询用户明细信息
         * 参数：(以下两个必须有一个)
         * 		@user_id：用户ID
         * 		@exp_emp_id: 员工ID
         * 返回值：JSON对象 
         *		其格式参照：UserController中 $scope.config.userInfo 的格式
         */
		queryUserInfo: function(options){
			var opt = options || {};

            return auHttp.request({
                url: hecS.getUrl('employee_detail'),
                para: opt.para
            });
		}
	};
}])


.controller('UserInfoController', [
	'$scope',
	'$rootScope',
	'$stateParams', 
	'UserInfoService', 
	function($scope, $rootScope, $stateParams, userInfoS){

	$scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam){
		if(toState.name == 'user.info'){
			$rootScope.forceSetTitle("员工信息");
		}
    });
	
	$scope.config = {

		userInfo: {
			exp_emp_id: 0,	 // 员工ID
			exp_emp_name: '员工信息', // 员工姓名
			exp_emp_code: 0,  // 员工代码
			exp_emp_mobile: 0, // 员工手机号
			exp_emp_email: '暂无', 
			exp_emp_weixin: '暂无', //员工微信号
			exp_emp_weixin_avatar: '',  // 员工微信头像
			user_id: 0,
			user_name: '暂无',
			
			exp_company_name: '暂无',
			exp_unit_name: '暂无',
			exp_position_name: '暂无'
		}

	};

	$scope.init = function(){
		/*
		 *	加载用户信息至 $scope.config.userInfo
		 */
		var user_id = $stateParams.user_id,
			exp_emp_id = $stateParams.exp_emp_id;
		loadUserInfo(user_id, exp_emp_id);


	};

	$scope.init();



	/**
	 *
	 *	内部方法或属性
	 *
	 */

	 function loadUserInfo(user_id, exp_emp_id){
	 	var para = {
	 		user_id: user_id, 
	 		exp_emp_id: exp_emp_id
	 	};
	 	userInfoS.queryUserInfo({para: para})
	 		 .then(function (resp){
	 		 	if(resp.data){
	 		 		angular.extend($scope.config.userInfo, resp.data[0]);	 		 		
	 		 	}
	 		 });
	 }



}]);

