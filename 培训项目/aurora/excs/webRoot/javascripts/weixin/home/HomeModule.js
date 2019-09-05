hec.service('HomeService', [
    '$AuHttp', 'HecService',
    function (auHttp, hecS) {
        return {
            /**
             * fun_list：用户九宫格功能列表查询
             * 参数：无
             * 返回值：
             * fun_code：功能代码
             * fun_name：功能名称
             * fun_icon：功能图标的class
             * fun_icon_count_url：功能图标右上角数量查询的URL
             * fun_url：功能跳转地址
             */
            queryFunList: function (option) {
                opt = option || {};
                return auHttp.request({
                    url: hecS.getUrl('fun_list') + '?pagesize=' + ( opt.pagesize || hecS.resultLength) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                    para: opt.para
                });
            },
            /**
             * queryFunIconCount：用户九宫格功能列表图标右上角的计数查询
             * option: {
             *      suffixUrl: '', // eg: modules/..../*.screen 、 antocru/.../*.bm
             * }
             * 参数：无
             * 返回值：
             *
             */
            queryFunIconCount: function (option){
                opt = option || {};
                return auHttp.request({
                    url: hecS.getUrlFromBase(option.suffixUrl),
                    para: opt.para
                });
            }
        }
    }])
.controller('HomeController', [ 
    '$scope',
    '$rootScope',
    '$ionicSlideBoxDelegate', 
    '$state',
    '$nineBlockDelegate',
    'HomeService',
    'HecService',
    function ($scope, $rootScope, $ionicSlideBoxDelegate, $state, $nineBlockDelegate, homeS, hecS) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParam){
            if(toState && fromState && fromState.name && toState.name && toState.name=="home.main"){
                if(fromState.name=="wfl.category.done" || fromState.name=="wfl.category.todo"){
                    $nineBlockDelegate.$getByHandle('fun-list').refreshTipCount();
                };
            };
        });

        $scope.goState = function (state) {
            console.log(state);
            if(!state){ return; };
            if(state == 'wfl.list.apply'){
                $rootScope.pageParams.wflListPage.category = "ALL";
                $rootScope.pageParams.wflListPage.query_url_name = "myapply_query_all";
                $rootScope.pageParams.wflListPage.todoOrDone = "APPLY";
                $state.go('wfl.list.tododoneapply');
            }else{
                $state.go(state);
            };
        }
        $scope.linein=0;
        $scope.pan=false;
        $scope.setLine=function(lineindex)
        {

            $scope.linein=lineindex;
            return false;

        }
        $scope.setlie=function(lielie,data)
        {
            if($scope.linein==0)
            {
                if(lielie==0)
                {
                    return true;

                }
                else if(lielie==2)
                {
                    if(data[$scope.linein][lielie-1].fun_name!=undefined)
                    {
                        return true;
                    }
                }
                else{
                    if(data[$scope.linein][lielie-1].fun_name!=undefined && data[$scope.linein][lielie+1].fun_name==undefined)
                    {
                        return true;
                    }

                }


            }
            else if($scope.linein==2)
            {
                if(lielie==0)
                {
                    if(data[$scope.linein-1][lielie+2].fun_name!=undefined && data[$scope.linein][lielie+1].fun_name==undefined)
                    {
                        return true;
                    }

                }
                else if(lielie==2)
                {
                    if(data[$scope.linein][lielie-1].fun_name!=undefined)
                    {
                        return true;
                    }
                }
                else{
                    if(data[$scope.linein][lielie-1].fun_name!=undefined && data[$scope.linein][lielie+1].fun_name==undefined)
                    {
                        return true;
                    }

                }
            }
            else{

                if(lielie==0)
                {

                    if(data[$scope.linein-1][lielie+2].fun_name!=undefined && data[$scope.linein][lielie+1].fun_name==undefined)
                    {

                        return true;
                    }
                }
                else if(lielie==2)
                {
                    if(data[$scope.linein][lielie-1].fun_name!=undefined && data[$scope.linein+1][lielie-2].fun_name==undefined)
                    {
                        return true;
                    }

                }
                else{
                    if(data[$scope.linein][lielie-1].fun_name!=undefined && data[$scope.linein][lielie+1].fun_name==undefined)
                    {
                        return true;
                    }

                }

            }
            return false;
        }
        $scope.refreshTipsCount = function(){
            $nineBlockDelegate.$getByHandle('fun-list').refreshTipCount();
        };

        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
            console.log(index);
        };
        $scope.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        $scope.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.config = {
            baseUrlName: ''
        };

        function __init(){
            //$scope.queryNineBlockData();
            $scope.config.baseUrlName = hecS.getHostName();
        };

        __init();

    }])

.directive('nineBlock', ['HomeService', function (homeS) {
    return {
        templateUrl: 'angular/template/nine-block.html',
        link: function ($scope, element, attrs) {
            homeS.queryFunList({
                _fetchall: true
            }).then(function (promise) {
                if(promise.data){
                    $scope.nineBlockData = promise.data;
                }
            });
        }
    }

}]);


 //   alert("HomeModule.js--end!");
