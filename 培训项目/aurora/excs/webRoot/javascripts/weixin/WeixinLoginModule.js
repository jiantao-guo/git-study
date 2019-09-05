hec.service("WeixinLoginService", [
    "HecService", 
    '$AuHttp',
function (hecS, auHttp) {
        return {
            /**
             * login：用户登陆
             * 参数：
             * user_name：用户名
             * ticket：微信登陆票据
             * 返回值：无
             */
            login: function (option) {
                return auHttp.request({
                    url: hecS.getUrl('login'),
                    para: {
                        user_name: option.user_name,
                        ticket: option.ticket
                    }
                });
            }
        }
    }]);
hec.controller('WeixinLoginCtrl', [
	'$scope',
	'$state',
	'$timeout',
	'WeixinLoginService',
	function($scope, $state, $timeout, weixinLoginS){

		function login(){
			weixinLoginS
			.login({
				user_name: $scope.publicConfig.loginInfo.userName,
				ticket: $scope.publicConfig.loginInfo.ticket
			})
			.then(function (resp){
				//alert('go home.main...');
				$state.go("home.main", {}, {relative:false});				
			});
		};

		function __init(){
			 //alert(' WeixinLoginCtrl -- __init ');
			$timeout(login, 1000);
		};

		//__init();

	}]);


	//alert('WeixinLoginModule.js end!');

