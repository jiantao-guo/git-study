hecModule.service('$AuHttp', ['$http', '$q', '$filter', '$ionicPopup', function ($http, $q, $filter, $ionicPopup) {
    return {
        request: request
    }
    function request(opt) {
        var delay = $q.defer();
        //alert(JSON.stringify(opt));
        $http.post(
            opt.url,
            "_request_data=" + encodeURIComponent( $filter('json')({parameter: opt.para}) ), 
            {headers: {"Content-Type": "application/x-www-form-urlencoded"}}
        ) 
        .success(function (data, status, headers, config) {
            //alert(JSON.stringify(data));
            /*alert(status);
            alert(JSON.stringify(headers));
            alert(JSON.stringify(config));*/
            // alert('success');
            var resultData = null;
            if (data.success) {
                if (data && data.result) {
                    if (data.result.record) {
                        if (data.result.record.length) {
                            resultData = data.result.record;
                        } else {
                            resultData = [];
                            resultData.push(data.result.record);
                        }
                    }
                }
                delay.resolve({
                    data: resultData,
                    status: status,
                    headers: headers,
                    config: config,
                    response: data
                });
            }else {
                var msgBox;
                if(angular.isString(data)&&data.indexOf('login')>=0){
                    msgBox = $ionicPopup.alert({
                        title: '错误',
                        template: 'session超时'
                    });
                }else{
                    msgBox = $ionicPopup.alert({
                        title: '错误',
                        template: data.error.message
                    });
                };
                

                delay.reject({
                    data: resultData,
                    status: status,
                    headers: headers,
                    config: config,
                    response: data,
                    msgBox: msgBox
                });
            }
        })
        .error(function (data, status, headers, config) {
            alert(status+" --- "+JSON.stringify(headers)+" --- "+JSON.stringify(config));
            var msgBox = $ionicPopup.alert({
                title: '错误',
                template: '请求失败'
            });
            
            
            /*console.log(data);
            console.log(status);
            console.log(headers);
            console.log(config);*/

            delay.reject({
                data: data,
                status: status,
                headers: headers,
                config: config,
                resp: data,
                msgBox: msgBox
            });
        });
        return delay.promise;
    }
}]);