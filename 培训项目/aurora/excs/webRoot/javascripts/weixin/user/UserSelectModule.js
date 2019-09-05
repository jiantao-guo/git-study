hec.service('UserSelectService', [
	'$AuHttp',
	'HecService', 
	function(auHttp, hecS){
		return {
			queryEmployeeDetail: function (option) {
	            opt = option || {};
	            return auHttp.request({
	                url: hecS.getUrl('employee_detail') + '?pagesize=' + ( opt.pagesize || hecS.resultLength) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
	                para: opt.para
	            }); 
	        }, 
	        /**
	         * employee_list：员工列表查询
	         * 参数：
	         * exp_emp_name（可选）：员工姓名
	         * 返回值：
	         * exp_emp_id：员工ID
	         * exp_emp_name：员工姓名
	         * exp_emp_org_info：员工组织架构信息
	         */
	        queryEmployeeList: function (option) {
	            opt = option || {};
	            return auHttp.request({
	                url: hecS.getUrl('employee_list') + '?pagesize=' + ( opt.pagesize || hecS.resultLength) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
	                para: opt.para
	            });
	        }
		};
	}]);
	
hec.controller('UserSelectController', [ 
	'$scope',
	'$rootScope',
	'$stateParams',
	'$ionicPopup',
	'$state',
	'UserSelectService',
	function($scope, $rootScope, $stateParams, $ionicPopup,  $state, userSelectS){
		
		$scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam){
			if(toState.name == 'user.selectuser'){
				$rootScope.forceSetTitle("员工选择");
			}
	    });

		$scope.config = {
			hasSelectdUserIds: [],
			canMulti: false,
			queryStr: '',

			users: [],
			currentSelectedIds: [],

			status_loading: false,
			status_loaded: false,

			returnSelectTimes: 0
		};

		$scope.searchInputOnKeyup = function (e){
			/*alert(JSON.stringify(e));
			alert(window.event);
			alert(e.keyCode);
			alert(e.which);			
			alert(keycode);*/
			var keycode = window.event ? e.keyCode : e.which;
            if(keycode==13){
                $scope.queryUser();
                return true;
            }
            return false;
		};

		$scope.cancel = function(){
			$scope.publicConfig.selectedUsers = null;
			//$scope.$ionicGoBack();
			$scope.publicFuns.goBack(null, $scope);
		};

		$scope.selectOk = function(){
			$scope.publicConfig.selectedUsers = angular.copy($scope.config.currentSelectedIds);
			$scope.config.currentSelectedIds = [];
			// $scope.$ionicGoBack();
			$scope.publicConfig.returnSelectTimes++;
			$scope.publicFuns.goBack(null, $scope);
		};

		$scope.selectUser = function(index){
			var item = $scope.config.users[index];

			// 临时跳转到用户令人信息界面，仅用于测试
			/*if(index == 0){
				$state.go('user.info', {
					exp_emp_id: item.exp_emp_id, 
					user_id: null
				});
				return;
			};*/

			// 判断用户是否已经添加（config.hasSelectdUserIds）
			for(var i = 0; i < $scope.config.hasSelectdUserIds.length; i++){
				if(item.exp_emp_id == $scope.config.hasSelectdUserIds[i]){
					//$scope.config.hasSelectdUserIds[i].selected = true;
					$scope.config.users[index].selected = true;
					var str = "用户 #username# 已经添加!".replace(/#username#/,item.exp_emp_name);
					item.cannotSelectSecond = true;
					$ionicPopup.alert({
						title: '提示',
						template: str
					});
					return;
				};
			};

			if($scope.config.canMulti){
				// item.selected = !item.selected;
				if(item.selected){
					item.selected = false;
					__deleteSelectedId(item.exp_emp_id);
				}else{
					item.selected = true;
					$scope.config.currentSelectedIds.push(item);
				}
			}else{
				if(item.selected){
					item.selected = false;
					return;
				};
				if($scope.config.currentSelectedIds.length > 0){
					__clearSelected();
				};
				$scope.config.users[index].selected = true;
				$scope.config.currentSelectedIds = [];
				$scope.config.currentSelectedIds.push(angular.copy($scope.config.users[index]));
			};

		};

		function __deleteSelectedId(userId){
			var ids = $scope.config.currentSelectedIds;
			for(var i = 0; i < ids.length; i++){
				if(ids[i].exp_emp_id == userId){
					var temp = [];
					temp = ids.slice(0, i).concat(ids.slice(i+1));
					$scope.config.currentSelectedIds = temp;
				}
			}
		};

		function __clearSelected(){
			for(var i = 0; i < $scope.config.users.length; i++){
				$scope.config.users[i].selected = false;
			}
		};

		$scope.queryUser = function (){
			//alert("queryUser  "+ $scope.config.queryStr);
			$scope.config.status_loading = true;
			$scope.config.status_loaded = false;
	        var params = {
	            exp_emp_name: $scope.config.queryStr
	        };
	        delete $scope.config.users;
	        userSelectS.queryEmployeeList({para: params}).then(function (resp){
	            if(resp.data){
	            	//alert(JSON.stringify(resp.data));	                
	                $scope.config.users = resp.data;	                					
	            }else{
	            	//alert("no data:  "+ JSON.stringify(resp));
	            	$scope.config.users = [];
	            }
	            $scope.config.status_loading = false;
	            $scope.config.status_loaded = true;
	        });
	    };

		function __init(){
			$scope.publicConfig.selectedUsers = null;
			var ids = $stateParams.hasUserIds;
			var multi = $stateParams.canMulti;
			if(multi && multi != "false"){
				$scope.config.canMulti = true;
			};
			if(ids && ids!=""){
				$scope.config.hasSelectdUserIds = JSON.parse(ids);
			};
			$scope.queryUser();
		};

		__init();

	}]);