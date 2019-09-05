hec.service('TodoDoneCategoryService', [ 
    function () {

    }]);

hec.controller('TodoDoneCategoryCtrl', [ 
    '$scope',
    '$rootScope',
    '$state',
    'TodoDoneCategoryService',
    function($scope, $rootScope, $state, tododonecategoryS){
        console.log('-----------TodoDoneCategoryCtrl-------------');

        $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam){
            if(toState.name == 'wfl.category.done'){
                $rootScope.forceSetTitle('已审批');
            }
            if(toState.name == 'wfl.category.todo'){
                $rootScope.forceSetTitle('未审批');
            }
        });

        $scope.config = {
            categories: [
                //{
                //  category_desc: '全部',
                //  category: 'ALL',
                //  suffix_url_name: 'query_all'
                //},
                {
                    category_desc: '借款申请单',
                    category: 'PAYMENT_REQUISITION',
                    suffix_url_name: 'query_payment_requisition',
                    img_src: 'images/weixin/list_category_05.png'
                },
                {
                    category_desc: '费用申请单',
                    category: 'EXP_REQUISITION',
                    suffix_url_name: 'query_exp_requisition',
                    img_src: 'images/weixin/list_category_08.png'
                },
                {
                    category_desc: '费用报销单',
                    category: 'EXP_REPORT',
                    suffix_url_name: 'query_exp_report',
                    img_src: 'images/weixin/list_category_10.png'
                }
            ],
            isTodo: false,
            viewTitle: '分类',
            categoryTimes: 0
        };

        $scope.goListPage = function (item){
            console.log(item);
            var isTodo = $scope.config.isTodo;
            var todoOrDone = '';
            if(isTodo){
                todoOrDone = 'todo';
                var query_url_name = 'todo_' + item.suffix_url_name;
                $rootScope.list_query_url_name = query_url_name;
            }else{
                todoOrDone = 'done';
                var query_url_name = 'done_' + item.suffix_url_name;
                $rootScope.list_query_url_name = query_url_name;
            };

            $rootScope.pageParams.wflListPage.category = item.category;
            $rootScope.pageParams.wflListPage.query_url_name = query_url_name;
            $rootScope.pageParams.wflListPage.todoOrDone = todoOrDone;
            $state.go('wfl.list.tododoneapply');

        };

        $scope.allGoListPage = function (){
            var isTodo = $scope.config.isTodo;
            var todoOrDone = '';
            if(isTodo){
                todoOrDone = 'todo';
                var query_url_name = 'todo_query_all';
                $rootScope.list_query_url_name = query_url_name;
            }else{
                todoOrDone = 'done';
                var query_url_name = 'done_query_all';
                $rootScope.list_query_url_name = query_url_name;
            };

            $rootScope.pageParams.wflListPage.category = 'ALL';
            $rootScope.pageParams.wflListPage.query_url_name = query_url_name;
            $rootScope.pageParams.wflListPage.todoOrDone = todoOrDone;
            $state.go('wfl.list.tododoneapply');
        };

        function __init() {
            var stateName = $state.current.name;
            if (stateName == 'wfl.category.done') {
                $scope.config.isTodo = false;
                $scope.config.viewTitle = '已审批';
                $rootScope.forceSetTitle('已审批');
            } else if (stateName == 'wfl.category.todo') {
                $scope.config.isTodo = true;
                $scope.config.viewTitle = '未审批';
                $rootScope.forceSetTitle('未审批');
            }
            ;
        };

        __init();

    }]);
