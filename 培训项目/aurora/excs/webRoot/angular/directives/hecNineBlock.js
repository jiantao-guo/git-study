hecModule.directive('hecNineBlock', [
	'$timeout',
	'$controller',
	'$AuHttp', 
	function($timeout, $controller, auHttp){
	return {
		restrict: 'E',
		scope: true,
		templateUrl: 'html/weixin/templates/hecNineBlock.html',
		compile: function (element){
			
			return {pre: preLink};

			function preLink($scope, $element, $attr){
				$scope.config = {
					delegateHandle: $attr.delegateHandle,
					baseUrl: $attr.baseUrl,
					nineDataRemoteUrl: $attr.nineDataRemoteUrl,
					nineDataRemote: [],
					nineDataLocal : $attr.nineDataLocal,
					fromRemote : $attr.fromRemote,
					nineBlockData: []
				};
				
				var nineBlockViewOptions = {
		            el: angular.element($element[0]),
		            delegateHandle: $attr.delegateHandle
		        }; 
		        $controller('$nineBlockCtrl', {
		            $scope: $scope,
		            nineBlockViewOptions: nineBlockViewOptions
		        }); 

				if($scope.config.fromRemote && $scope.config.fromRemote == 'true'){
					__getAndHandleNineDataFromRemote($scope);					
				}else if($scope.config.nineDataLocal){
					$scope.config.nineBlockData = __handleNineBlockData($scope, $scope.config.nineDataLocal);
				};

				$scope.refreshTipsCount = function(){
					console.log('directive-hecNineBlock: refreshTipsCount');
					var rows = $scope.config.nineBlockData;
					if(!rows || rows.length==0)
						return;
					for (var i = 0; i < rows.length; i++) {
						var row = rows[i];
						for (var j = 0; j < row.length; j++) {
							var cell = row[j];
							if(cell.needGotCount){
								delete cell.hasGotCount;
								delete cell.count_number;
								__handleCountQueryUrl(cell, $scope.config.baseUrl);	
							};
						};
					};
				};

			};

			function __getAndHandleNineDataFromRemote($scope){
				var config = $scope.config;
				// 获取九宫格基本数据
	            var option = {_fetchall: true, pagesize: 12};
	            var fun_list_url = config.baseUrl + '/' + config.nineDataRemoteUrl;
	            auHttp.request({
	                url:  fun_list_url + '?pagesize='+option.pagesize+'&pagenum=' + (option.pagenum || 1) + '&_fetchall=' + (option._fetchall || 'false') + '&_autocount=' + (option.autocount || 'true'),
	                para: option.para
	            }).then(function (resp){
	            	var data = resp.data;
	                if(!data || !data.length || data.length == 0){
	                    return;
	                }
	                $scope.config.nineBlockData = data;
	                __handleNineBlockData($scope, $scope.config.nineBlockData);
	            });
			};

			function __handleNineBlockData($scope, dataRemoteOrLocal){
				var data = dataRemoteOrLocal;
				var newData = [];
                if(data.length > 12){
                    newData = data.slice(0, 12);
                }else if(data.length <9){
                    newData = data;
                    for (var i = newData.length; i <= 8; i++) {
                        newData[i] = {};
                        //var a = $scope.config.nineBlockData;
                    };
                }else if(data.length > 9 && data.length < 12){
                    newData = data;
                    for (var i = newData.length; i <= 11; i++) {
                        newData[i] = {};
                        //var a = $scope.config.nineBlockData;
                    };
                }else if(data.length == 9 || data.length == 12){
                    newData = data;
                }

                $scope.config.nineBlockData = [];
                var currentLine = -1, currentCell = -1;
                for (var i = 0; i < newData.length; i++) {
                    currentCell++;
                    if(i%3==0){
                        currentCell = 0;
                        currentLine++;
                        $scope.config.nineBlockData[currentLine] = [];
                    }
                    $scope.config.nineBlockData[currentLine][currentCell]=newData[i];
                    
                    __handleCountQueryUrl($scope.config.nineBlockData[currentLine][currentCell], $scope.config.baseUrl);
                };
			};

			function __handleCountQueryUrl(item, baseUrl){
				// 处理九宫格 每个图标的个数提示
				item.needGotCount = false;
	            if(!item.fun_icon_count_url){
	                return;
	            }
	            item.needGotCount = true;
	            // item.hasGotCount = false;
	            auHttp.request({
	            	url: baseUrl + '/' + item.fun_icon_count_url
                })
                .then(function (resp){
                    if(resp.data){
                        if(resp.data.length){
                           item.count_number = resp.data[0].count_number;                                
                        }else{
                            item.count_number = resp.data.count_number;
                        }
                    }else{
                        item.count_number = '!';
                    }
                    //alert(JSON.stringify(item));
                    $timeout(function(){
                    	item.hasGotCount = true;
                    }, 500);                    
            	});
			};

		}
	};
}]);