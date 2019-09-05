// app module define code                         // 'hec-templates'

var hecModules = ['hec-ui', 'ngAnimate', 'ngIOS9UIWebViewPatch'];
var hec = angular.module('HecAPP', hecModules);

hec.constant('HecDefaults', {
    postOptions: {
        pagesize: 10,
        pagenum: 1,
        _fetchall: false,
        _autocount: true
    },
    handleTypes: {
        APPROVE: 'APPROVE',
        REJECT: 'REJECT',
        ADDHANDLER: 'ADDHANDLER',
        TRANSFER: 'TRANSFER',
        NOTIFY: 'NOTIFY'
    }
});

hec.run([
    '$ionicPlatform', '$location', '$ionicPopup',
    '$rootScope', '$state', '$ionicHistory',
    '$ionicNavBarDelegate', '$timeout',
    function ($ionicPlatform, $location, $ionicPopup, $rootScope, $state, $ionicHistory, $ionicNavBarDelegate, $timeout) {

        $rootScope.isListPage = function () {
            if ($state.current.name == 'wfl.list.done' || $state.current.name == 'wfl.list.todo' || $state.current.name == 'wfl.list.tododoneapply') {
                return true;
            } else {
                return false;
            }
        };

        $rootScope.$on('$stateChangeStart', stateChangeStart);

        $rootScope.pageParams = {
            wflListPage: {
                todoOrDone: '',
                category: '',
                query_url_name: ''
            }
        };

        $rootScope.isListPage = function () {
            if ($state.current.name == 'wfl.list.done' || $state.current.name == 'wfl.list.todo') {
                return true;
            } else {
                return false;
            }
        };

        $rootScope.forceSetTitle = function (title) {

            // $ionicNavBarDelegate.changeTitle(title, null);

            var navBarEles = document.querySelectorAll("div.nav-bar-block");
            if (navBarEles.length > 0) {
                for (var i = 0; i < navBarEles.length; i++) {
                    var ele = navBarEles[i].querySelector("div.title");
                    ele.innerText = title;
                    ele.innerHTML = title;
                    //ele.outerText = title;
                    //ele.outerHTML = title;
                }
            }
            document.title = title;
            $timeout(function () {
                document.title = title;
            }, 600);
            $timeout(function () {
                document.title = title;
            }, 1000);
            // console.log(document.querySelectorAll("div.nav-bar-block"));

            /*var navBarEles = document.querySelectorAll("div.nav-bar-block[nav-bar=entering]");
             if(!navBarEles){
             return;
             }
             for(var i = 0; i < navBarEles.length; i++){
             var ele = navBarEles[i].querySelector("div.title");
             ele.innerText = title;
             }
             navBarEles = document.querySelectorAll("div.nav-bar-block[nav-bar=active]");
             if(!navBarEles){
             return;
             }
             for(var i = 0; i < navBarEles.length; i++){
             var ele = navBarEles[i].querySelector("div.title");
             ele.innerText = title;
             }*/

        }

        function stateChangeStart(event, toState, toParams, fromState, fromParam) {
            //alert(window.event ? window.event.type : '...');
            if (window.event && window.event.type == 'popstate') {
                var bool = window.confirm('确定退出吗');
                if (bool) {
                    event.preventDefault();
                    hecCloseWindow();
                } else {
                    event.preventDefault();
                }
                ;
            }
            ;
        };

    }]);

hec.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$ionicConfigProvider',
    function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $stateProvider
            /*.state('weixinlogin', {
             url: '/weixinlogin',
             'templateUrl': 'html/weixin/weixinlogin.html'
             })*/
            .state('home', {
                url: '/home',
                abstract: true,
                'templateUrl': 'html/weixin/home/main.html'
            })
            .state('home.main', {
                url: '/main',
                views: {
                    'homeContent': {
                        'templateUrl': 'html/weixin/home/home.html'
                    }
                }
            })

            .state('wfl', {
                url: '/wfl',
                abstract: true,
                'templateUrl': 'html/weixin/wfl/main.html'
            })

            .state('wfl.category', {
                url: '/category/{todoOrDone}',
                abstract: true,
                views: {
                    'wflContent': {
                        'templateUrl': 'html/weixin/wfl/wfl_category.html'
                    }
                }
            })
            .state('wfl.category.todo', {
                url: 'todo',
                views: {
                    'tododoneContent': {
                        'templateUrl': 'html/weixin/wfl/wfl_category_tododone.html'
                    }
                }
            })
            .state('wfl.category.done', {
                url: 'done',
                views: {
                    'tododoneContent': {
                        'templateUrl': 'html/weixin/wfl/wfl_category_tododone.html'
                    }
                }
            })

            .state('wfl.list', {
                url: '/list', // /{todoOrDone}/{category}/{query_url_name}
                abstract: true,
                views: {
                    'wflContent': {
                        'templateUrl': 'html/weixin/wfl/list/wfl_list.html'
                    }
                }
            })
            .state('wfl.list.tododoneapply', {
                url: 'tododoneapply',
                views: {
                    'wflListContent': {
                        'templateUrl': 'html/weixin/wfl/list/wfl_list_tododone.html'
                    }
                }
            })

            .state('wfl.detail', {
                url: '/detail',
                abstract: true,
                views: {
                    'wflContent': {
                        'templateUrl': 'html/weixin/wfl/detail/abs_detail.html'
                    }
                }
            })
            .state('wfl.detail.docinfo', {        // funType: todo、done、apply
                url: '/docinfo/{ins_doc_category}/{ins_doc_hd_id}/{ins_id}/{fun_type}/{ins_rcpt_id}',
                views: {
                    'detailContent': {
                        'templateUrl': 'html/weixin/wfl/detail/wfl_detail_doc_info.html'
                    }
                }
            })
            .state('wfl.detail.docflow', { // 所需参数从 父 $scope.$parent.config 中取
                url: '/docflow/{ins_id}/{detailInfoToFlowTimes}',
                views: {
                    'detailContent': {
                        'templateUrl': 'html/weixin/wfl/detail/wfl_detail_doc_flow.html'
                    }
                }
            })
            .state('wfl.detail.attachment', {
                url: '/attachment',
                views: {
                    'detailContent': {
                        'templateUrl': 'html/weixin/wfl/detail/wfl_detail_doc_attachment.html'
                    }
                },
                params: {
                    exp_rep_type_desc: "",
                    exp_rep_hd_id: ""
                }
            })
            .state('wfl.handle', {
                // url: '/handle/{handleType}/{ids}/{insId}/{nodeId}',
                url: '/handle/{handleType}/{ids}/{insidNodeidArrayStr}',
                views: {
                    'wflContent': {
                        'templateUrl': 'html/weixin/wfl/handle/wfl_handle.html'
                    }
                }
            })

            .state('user', {
                url: '/user',
                abstract: true,
                templateUrl: 'html/weixin/user/abs_user.html'
            })
            .state('user.selectuser', {
                url: '/selectuser/{canMulti}/{hasUserIds}',
                views: {
                    'userContent': {
                        'templateUrl': 'html/weixin/user/user_selectuser.html'
                    }
                }
            })
            .state('user.info', {
                url: '/info/{exp_emp_id}/{user_id}',
                views: {
                    'userContent': {
                        'templateUrl': 'html/weixin/user/user_info.html'
                    }
                }
            });

        $urlRouterProvider
            .when('', '/home/main')
            .otherwise('/home/main');
    }]);

hec.controller('HecController', [
    '$scope',
    '$state',
    '$timeout',
    '$ionicNavBarDelegate',
    '$ionicHistory',
    '$ionicViewService',
    function ($scope, $state, $timeout, $ionicNavBarDelegate, $ionicHistory, $ionicViewService) {

        $scope.publicConfig = {
            // selectedUsers: []
            // handleOk: true/false

            handleTime: 0, // 用于配合微信返回按钮

            returnSelectTimes: 0,
            returnHandleTimes: 0,
            returnDetailTimes: 0,
            returnFlowToInfoTimes: 0
        };

        $scope.isWflListTododoneState = function () {
            if ($state.current.name == "wfl.list.tododoneapply") {
                return true;
            }
            return false;
        };

        $scope.publicFuns = {
            goBack: function (event, scope) {
                //window.history.back();
                $ionicHistory.goBack();
                /*event = event || window.event;
                 if(event.type && event.type == 'popstate'){
                 event.preventDefault();
                 $rootScope.$ionicGoBack();
                 }else{
                 if($ionicHistory.backView()){
                 $ionicHistory.goBack();
                 }else{
                 alert(" ----- no back view ----- ");
                 };
                 };*/


                // scope.$ionicGoBack();
                // $ionicHistory.goBack();
                /*$ionicHistory.nextViewOptions({
                 disableAnimate: true,
                 disableBack: true
                 });*/
                //$ionicHistory.goBack()
                //$ionicHistory.forwardView();
                //window.history.back();
                //$ionicNavBarDelegate.$getByHandle('HecBodyNavbar').back();
            }
        };
    }]);


hec.service("HecService", ['HecDefaults', function (hecDefaults) {
    var hostName = "http://jklife.imwork.net";
    var resultLength = 10;
    var urls = {
        'home': hostName + '/' + '/weixin.html',
        'login': hostName + '/' + 'modules/weixin/sys/login.svc',
        'fun_list': hostName + '/' + 'autocrud/weixin.sys.sys_user_mobile_function_query/query',

        // 员工信息相关接口
        'employee_detail': hostName + '/' + 'modules/weixin/exp/exp_employee_detail_query.svc',
        'employee_list': hostName + '/' + 'autocrud/weixin.exp.exp_employee_list_query/query',

        // 待办、已办、我的申请 列表 相关接口
        'todo_query_all': hostName + '/' + 'autocrud/weixin.wfl.list.wfl_todo_query_all/query',
        'todo_query_exp_report': hostName + '/' + 'autocrud/weixin.wfl.list.wfl_todo_query_exp_report/query',
        'todo_query_exp_requisition': hostName + '/' + 'autocrud/weixin.wfl.list.wfl_todo_query_exp_requisition/query',
        'todo_query_payment_requisition': hostName + '/' + 'autocrud/weixin.wfl.list.wfl_todo_query_payment_requisition/query',

        'done_query_all': hostName + '/' + 'autocrud/weixin.wfl.list.wfl_done_query_all/query',
        'done_query_exp_report': hostName + '/' + 'autocrud/weixin.wfl.list.wfl_done_query_exp_report/query',
        'done_query_exp_requisition': hostName + '/' + 'autocrud/weixin.wfl.list.wfl_done_query_exp_requisition/query',
        'done_query_payment_requisition': hostName + '/' + 'autocrud/weixin.wfl.list.wfl_done_query_payment_requisition/query',

        'myapply_query_all': hostName + '/' + 'autocrud/weixin.wfl.WFL5010.wfl_instance_self_current/query',


        // 单据明细相关接口
        'approve_record_query': hostName + '/' + 'autocrud/weixin.wfl.wfl_approve_record_query/query',

        'detail_header_exp_report': hostName + '/' + 'autocrud/weixin.wfl.detail.wfl_detail_header_all/query',
        'detail_header_exp_requisition': hostName + '/' + 'autocrud/weixin.wfl.detail.wfl_detail_header_all/query',
        'detail_header_pay_requisition': hostName + '/' + 'autocrud/weixin.wfl.detail.wfl_detail_header_all/query',

        'detail_lines_exp_report': hostName + '/' + 'autocrud/weixin.wfl.detail.wfl_detail_lines_exp_report/query',
        'detail_lines_exp_requisition': hostName + '/' + 'autocrud/weixin.wfl.detail.wfl_detail_lines_exp_requisition/query',
        'detail_lines_pay_requisition': hostName + '/' + 'autocrud/weixin.wfl.detail.wfl_detail_lines_payment_requisition/query',

        'detail_attachment_list': hostName + '/' + 'autocrud/weixin.wfl.detail.wfl_attachment_list/query',
        // 费用报销类型的 计划付款行明细接口
        'exp_report_pmtplan_query': hostName + '/' + 'autocrud/weixin.wfl.detail.exp_report_pmtplan_schedules_query/query',

        // 流程预览相关接口
        'wfl_preview_record_init': hostName + '/' + 'autocrud/weixin.wfl.init_wfl_preview_record/batch_update',
        'wfl_preview_record_query': hostName + '/' + 'autocrud/weixin.wfl.wfl_preview_record_query/query',

        // 单据处理相关接口
        'approve': hostName + '/' + 'autocrud/db.sys_mobile_pkg.wfl_approve/batch_update',
        'commission': hostName + '/' + 'autocrud/db.sys_mobile_pkg.wfl_commission/batch_update',
        'notify': hostName + '/' + 'autocrud/db.sys_mobile_pkg.wfl_notify/batch_update',
        //'add_approver': hostName + '/' + 'autocrud/db.sys_mobile_pkg.wfl_add_approver/batch_update',
        'add_approver': hostName + '/' + 'modules/weixin/wfl/wfl_add_approver.svc',
        'cancel_workflow_instance': hostName + '/' + 'autocrud/wfl.wfl_back_instance/insert',
        'cancel_workflow_instance_done': hostName + '/' + 'autocrud/db.sys_mobile_pkg.wfl_back_to_pre_node/execute',
        'atm_download': hostName + '/' + 'atm_download.svc'
    };
    // 单据明细支持的单据类型：
    var detailSupportCategory = [
        'EXP_REPORT',
        'EXP_REQUISITION',
        'PAYMENT_REQUISITION'
    ];

    return {
        getParamsUrl: function (option) {
            var opt = angular.copy(hecDefaults.postOptions);
            angular.extend(opt, option);
            return 'pagesize=' + opt.pagesize + '&pagenum=' + opt.pagenum + '&_fetchall=' + opt._fetchall + '&_autocount=' + opt._autocount;
        },
        getHostName: function () {
            return hostName;
        },
        getCategoryDesc: function (category) {
            var desc = '';
            switch (category) {
                case'EXP_REPORT':
                    desc = "费用报销";
                    break;
                case 'EXP_REQUISITION':
                    desc = "费用申请";
                    break;
                case 'PAYMENT_REQUISITION':
                    desc = "借款申请";
                    break;
                case 'ALL':
                    desc = "全部";
                    break;
            }
            ;
            return desc;
        },
        getDetailLinesUrlTip: function (category) {
            switch (category) {
                case 'EXP_REPORT':
                    return 'detail_lines_exp_report';
                case 'EXP_REQUISITION':
                    return 'detail_lines_exp_requisition';
                case 'PAYMENT_REQUISITION':
                    return 'detail_lines_pay_requisition';
            }
        },
        getDetailHeaderUrlTip: function (category) {
            switch (category) {
                case 'EXP_REPORT':
                    return 'detail_header_exp_report';
                case 'EXP_REQUISITION':
                    return 'detail_header_exp_requisition';
                case 'PAYMENT_REQUISITION':
                    return 'detail_header_pay_requisition';
            }
        },
        getUrl: function (itfName) {
            //return contextPath + '/' + urls[itfName];
            return urls[itfName];
        },
        getUrlFromBase: function (itfName) {
            return hostName + '/' + itfName;
        },
        resultLength: resultLength,
        ifDetailSupport: function (workflow_category) {
            for (var i = detailSupportCategory.length - 1; i >= 0; i--) {
                if (detailSupportCategory[i] == workflow_category) {
                    return true;
                }
            }
            ;
            return false;
        },
        getNotSupportTip: function (workflow_category_name) {
            var tip = '暂不支持 ' + detailSupportCategory + '';
            return tip;
        }
    }
}]);
