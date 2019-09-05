hec.service('WflListTododoneService', [
    'HecService',
    '$AuHttp',
    'HecDefaults',
    function (hecS, auHttp, hecDefaults) { 

        return {
            queryListData: queryListData
        };
        function queryListData(options) {
            var opt = options || {};
            return auHttp.request({
                url: hecS.getUrl(opt.query_url_name) + '?' + hecS.getParamsUrl(opt),
                para: opt.para
            });
        };

    }
]);

hec.controller('WflListAbsoluteCtrl', ['$scope', function ($scope) {

    $scope.absConfig = {
        viewTitle: ''
    };

}]);

hec.controller('WflListTododoneCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$timeout',
    '$ionicPopup',
    '$ionicLoading',
    '$ionicScrollDelegate',
    '$ionicNavBarDelegate',
    'HecDefaults',
    'HecService',
    'WflListTododoneService',
    'WflHandleService',
    function ($scope, $rootScope, $state, $stateParams, $timeout, $ionicPopup, $ionicLoading, $ionicScrollDelegate, $ionicNavBarDelegate, hecDefaults, hecS, wflListTododoneS, WflHandleService) {

        $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParam) {
            if (toState && fromState && fromState.name && toState.name) {
                if (toState.name == "home.main" && fromState.name == "wfl.list.apply") {
                    $scope.__clearListItemsElementInner();
                    $scope.config.listData = [];
                }
            }
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParam) {
            if (toState && fromState && fromState.name && toState.name) {

                if (fromState.name == "wfl.category.done" || fromState.name == "wfl.category.todo" || fromState.name == "home.main") {
                    $scope.initParams();
                    if (fromState.name == "wfl.category.todo") {
                        setTodoDoneApply(true, false, false);
                        //$scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-todo');
                    }
                    ;
                    if (fromState.name == "wfl.category.done") {
                        setTodoDoneApply(false, true, false);
                        //$scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-done');
                    }
                    ;
                    if (fromState.name == "home.main") {
                        setTodoDoneApply(false, false, true);
                        $scope.config.query_url_name = 'myapply_query_all';
                        $scope.config.viewTitle = "我的申请";
                        //$scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-apply');
                    }
                    ;
                    console.log($scope.config.viewTitle);
                    $scope.reloadData();
                }
                ;
                if (fromState.name == "wfl.detail.docinfo" || fromState.name == "wfl.handle") {
                    var needRefresh = $scope.publicConfig.handleOk;
                    //alert(needRefresh);
                    if (needRefresh) {
                        $scope.unSelectAll();
                        $scope.reloadData();
                        delete $scope.publicConfig.handleOk;
                    }
                    ;
                }
                ;
                if (fromState.name == "wfl.approve") {

                }
                ;
                if (toState.name == "wfl.category.done" || toState.name == "wfl.category.todo" || toState.name == "home.main") {
                    // $scope.unSelectAll();
                    $scope.config.selectNum = 0;
                    $rootScope.rootConfig.selectCount = 0;
                    $scope.unSelectAll();
                    delete $scope.config.checkboxs;
                    $ionicScrollDelegate.scrollTop();
                }
                ;

            }
            ;
        });

        
        
        function setTodoDoneApply(todo, done, apply) {
            $scope.config.isTodo = todo;
            $scope.config.isDone = done;
            $scope.config.isApply = apply;
            $rootScope.newtitle = todo ? "未审批" : ( done ? "已审批" : "我的申请" );
        };

        $scope.hidePartOfAllButtons = function ($event) {
            if (!$event) {
                return;
            }
            var $target = angular.element($event.target);
            var attrs = $target[0].attributes;
            for (var i = (attrs.length - 1); i >= 0; i--) {
                var attr = attrs[i];
                if ((attr.name == "cound-switch")) {
                    $scope.config.showAllBottons = !$scope.config.showAllBottons;
                    return;
                }
                ;
            }
            $scope.config.showAllBottons = false;
        };

        $scope.onlyConfig = {
            showSideRight: true
        };

        $rootScope.rootConfig = {
            selectCount: 0,
            can_back_to_pre_node_flag: null
        };

        $scope.config = {
            isListPage: true,
            // 区分  待办事项  与  已办事项
            isTodo: false,
            isDone: false,
            isApply: false,

            /* 单据类型代码, 目前有以下几种 ：
             *  ALL                 全部类型
             *  PAYMENT_REQUISITION 借款申请
             *  EXP_REQUISITION     费用申请
             *  EXP_REPORT          费用报销
             */
            category: null,
            query_url_name: null,

            viewTitle: '',
            categoryDesc: '',
            queryStr: '',


            // data page refresh loadMore 相关属性
            /*
             * 每页个数，赋值后不再修改
             */
            pagesize: hecDefaults.postOptions.pagesize,
            /*
             * 总页数，只在 $scope.reloadData() 成功返回后设置
             */
            totalCount: null,
            totalPage: null,
            listData: [],
            lastLoadPage: 0, // 当前最后一次请求的 pagenum 参数值
            hasNextPage: true, // 标志是否还有下一页
            noListDataTip: '暂无数据!',
            /*
             *
             *  界面加载、刷新相关
             *
             */
            refresherText: '下拉刷新',
            isLoadingMore: false,
            isReloading: false,
            isFirstReloading: 'true',
            //reloadedOk: false, // 界面数据加载成功(第一次加载)标志。。


            nodeActionType: null,
            /*{
             APPROVE: 'APPROVE',
             REJECT: 'REJECT',
             ADDHANDLER: 'ADDHANDLER',
             TRANSFER: 'TRANSFER',
             NOTIFY: 'NOTIFY'
             },*/

            // just  for test


            // 用户模式相关
            uiMode: null,
            showSelectAllButton: false,

            showAllBottons: false,

            /*
             *
             *  单据选择相关
             *
             */
            isSelectAll: false,
            selectNum: 0,


            listTimes: 0,
            listForDetailTimes: 0
        };

        var __userInterfaceMode = {
            SCAN: 'SCAN',
            SEARCH: 'SEARCH',
            SELECT: 'SELECT'
        };


        $scope.getCurrentPageNum = function (index) {
            var i = index + 1;
            return Math.ceil(i / $scope.config.pagesize);
        };


        /*
         *
         *  列表加载、刷新相关
         *
         */

        $scope.reloadData = function () {
            //alert("reloadData:     "+$scope.isSearchMode()+"     "+$scope.isSelectMode()+"     "+$scope.config.selectNum);
            if ($scope.isSearchMode() || $scope.isSelectMode() || $scope.config.selectNum > 0) {
                $scope.$broadcast('scroll.refreshComplete');
                return;
            }

            delete $scope.config.checkboxs;
            $scope.config.isReloading = true;
            delete $scope.config.listData;
            $scope.__clearListItemsElementInner();
            $scope.config.listData = [];

            $scope.config.totalPage = null;
            $scope.lastLoadPage = 0;
            $scope.hasNextPage = true;

            $scope.__checkQueryUrlName();

            wflListTododoneS.queryListData({
                pagesize: $scope.config.pagesize,
                query_url_name: $scope.config.query_url_name,
                pagenum: 1,
                para: {
                    fuzzy_query: $scope.config.queryStr
                }
            }).then(function (resp) {
                if (resp.data) {
                    $scope.config.totalPage = Math.ceil(resp.response.result.totalCount / $scope.config.pagesize);
                    if ($scope.config.totalPage <= 1) {
                        $scope.hasNextPage = false;
                    }
                    ;
                    $scope.config.lastLoadPage = 1;
                    __handleListData(resp.data, true);
                    $scope.config.listData = resp.data;
                    $scope.config.totalCount = resp.response.result.totalCount;
                    __checkHasMoreData(resp.response.result.totalCount);
                    //$scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected');
                } else {
                    $scope.hasNextPage = false;
                    $scope.config.lastLoadPage = 1;
                    $scope.config.listData = [];
                    $scope.config.totalCount = 0;
                    __checkHasMoreData(0);
                }
                $scope.$broadcast('scroll.refreshComplete');
                $scope.config.isReloading = false;
                $scope.config.isFirstReloading = false;
            }, function (resp) {
                $scope.config.isReloading = false;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        $scope.__checkQueryUrlName = function () {
            if (!$scope.config.query_url_name || $scope.config.query_url_name == '') {

                //debugger;
                $scope.config.query_url_name = $rootScope.list_query_url_name;

                throw("ListModule_111.js代码逻辑错误 ---  $scope.config.query_url_name: " + $scope.config.query_url_name);
            }
            ;
        };

        $scope.config.lastDay;

        function __handleListData(items, isReload) {
            if (isReload) {
                delete $scope.config.lastDay;
            }
            ;
            for (var i = 0; i < items.length; i++) {
                if (!$scope.config.lastDay) {
                    $scope.config.lastDay = items[i].ins_sub_date_day;
                    if (isReload) {
                        items[i].showSubDate = true;
                        if (i) {
                            items[i - 1].showSubDatePre = true;
                        }
                    }
                    ;
                } else {
                    if (!__isEnqualDate(items[i].ins_sub_date_day, $scope.config.lastDay)) {
                        $scope.config.lastDay = items[i].ins_sub_date_day;
                        items[i].showSubDate = true;
                        if (i) {
                            items[i - 1].showSubDatePre = true;
                        }
                    }
                }
            }
        };

        function __isEnqualDate(newDate, oldDate) {
            var t1 = new Date(newDate),
                t2 = new Date(oldDate);
            if (Date.parse(t1) - Date.parse(t2) == 0) {
                return true;
            }
            ;
            return false;
        };

        function __checkHasMoreData(totalCount) {
            if ($scope.config.listData.length >= totalCount) {
                $scope.config.hasNextPage = false;
            } else {
                $scope.config.hasNextPage = true;
            }
            ;
        };

        $scope.searchInputOnKeyup = function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                $scope.reloadData();
                return true;
            }
            return false;
        };

        $scope.loadMoreData = function () {
            if ($scope.isSearchMode() || $scope.isSelectMode() || $scope.config.selectNum > 0) {
                return;
            }
            ;

            $scope.config.isLoadingMore = true;

            var pagenum = $scope.config.lastLoadPage + 1;
            if (!$scope.config.hasNextPage || pagenum > $scope.config.totalPage) {
                $scope.$broadcast('scroll.infiniteScrollComplete');
                return;
            }

            $scope.__checkQueryUrlName();

            wflListTododoneS.queryListData({
                pagesize: $scope.config.pagesize,
                query_url_name: $scope.config.query_url_name,
                pagenum: pagenum,
                para: {
                    fuzzy_query: $scope.config.queryStr
                }
            }).then(function (resp) {
                if (resp.data) {
                    $scope.config.lastLoadPage = pagenum;
                    $scope.config.hasNextPage = (pagenum >= $scope.config.totalPage) ? false : true;
                    __handleListData(resp.data, false);
                    $scope.config.listData = $scope.config.listData.concat(resp.data);
                    __checkHasMoreData(resp.response.result.totalCount);
                }
                $scope.config.isLoadingMore = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, function (resp) {
                $scope.config.isLoadingMore = false;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };


        /*
         *
         *	用户接口UI模式相关
         *
         */

        $scope.isScanMode = function () {
            return $scope.config.uiMode == __userInterfaceMode.SCAN;
        };

        $scope.isSelectMode = function () {
            return $scope.config.uiMode == __userInterfaceMode.SELECT;
        };

        $scope.isSearchMode = function () {
            return $scope.config.uiMode == __userInterfaceMode.SEARCH;
        };

        function __enterScanMode() {
            $scope.config.showSelectAllButton = false;
            $scope.config.isSelectAll = false;
            $scope.config.selectNum = 0;
            $rootScope.rootConfig.selectCount = 0;
            $scope.config.uiMode = __userInterfaceMode.SCAN;
        };

        function __enterSelectMode() {
            $scope.config.uiMode = __userInterfaceMode.SELECT;
        };

        function __enterSearchMode() {
            $scope.config.uiMode = __userInterfaceMode.SEARCH;
        };


        /*
         *
         *	单据选择相关
         *
         */

        $scope.__fillConfigCheckbox = function () {
            if ($scope.config.isTodo) {
                //var ele = document.getElementById('br-wfl-todo-list');
                var ele = document.getElementsByClassName('br-wfl-todo-list-yd-only-one');
                if (ele) {
                    $scope.config.checkboxs = ele[ele.length - 1].getElementsByClassName('listdata-item-selected-todo');
                }
                ;
                //$scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-todo');
            } else if ($scope.config.isDone) {
                var ele = document.getElementsByClassName('br-wfl-done-list-yd-only-one');
                if (ele) {
                    $scope.config.checkboxs = ele[ele.length - 1].getElementsByClassName('listdata-item-selected-done');
                }
                ;
                //$scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-done');
            } else if ($scope.config.isApply) {
                $scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-apply');
            } else {
                $scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-todo');
                if ($scope.config.checkboxs.length == 0) {
                    $scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-done');
                    if ($scope.config.checkboxs.length == 0) {
                        $scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected-apply');
                        if ($scope.config.checkboxs.length == 0) {
                            throw("ListModule_111.js 代码逻辑错误  ---  $scope.__fillConfigCheckbox()...");
                        }
                        ;
                    }
                    ;
                }
                ;

            }
            ;
        };

        $scope.selectItem = function ($index) {
            if (!$scope.config.checkboxs) {
                $scope.__fillConfigCheckbox();
                //$scope.config.checkboxs = document.getElementsByClassName('listdata-item-selected');
            }
            ;
            // $scope.config.showSelectAllButton = true;
            //if ($scope.config.isDone && $scope.config.listData[$index].ins_doc_status != 1) {
            //    $scope.config.checkboxs[$index].checked = false;
            //    $ionicPopup.alert({
            //        title: '提示',
            //        template: '通知操作只支持运行中单据!'
            //    });
            //    return;
            //}
            //;
            if (!$scope.config.checkboxs[$index].checked) {
                $scope.config.isSelectAll = false;
                $scope.config.selectNum--;
                $rootScope.rootConfig.selectCount--;
                // 判断是否全不选
                if ($scope.config.selectNum <= 0) {
                    __enterScanMode();
                }
                ;
            } else {
                $scope.config.selectNum++;
                $rootScope.rootConfig.selectCount++;
                // 判断是否全选
                if ($scope.config.selectNum == $scope.config.listData.length) {
                    $scope.config.isSelectAll = true;
                    $scope.config.showSelectAllButton = false;
                }
                ;
                __enterSelectMode();
            }
            ;
            //$scope.config.checkboxs[$index].checked = !$scope.config.checkboxs[$index].checked;
        };

        $scope.selectAll = function () {
            $scope.config.showSelectAllButton = false;
            __enterSelectMode();

            /*for(var i = 0; i < $scope.config.listData.length; i++){
             $scope.config.listData[i].selected = true;
             };*/
            $scope.config.selectNum = 0;
            $rootScope.rootConfig.selectCount = 0;
            for (var i = 0; i < $scope.config.checkboxs.length; i++) {
                if ($scope.config.isDone) {
                    if ($scope.config.listData[i].ins_doc_status == 1) {
                        $scope.config.checkboxs[i].checked = true;
                        $scope.config.selectNum++;
                        $rootScope.rootConfig.selectCount++;
                    }
                    ;
                } else {
                    $scope.config.checkboxs[i].checked = true;
                    $scope.config.selectNum++;
                    $rootScope.rootConfig.selectCount++;
                }
                ;
            }
            ;

            $scope.config.isSelectAll = true;
            //$scope.config.selectNum = $scope.config.listData.length;

        };

        $scope.unSelectAll = function () {

            // $scope.config.showSelectAllButton = false;
            __enterScanMode();
            if (!$scope.config.checkboxs) {
                return;
            }
            ;
            for (var i = 0; i < $scope.config.checkboxs.length; i++) {
                $scope.config.checkboxs[i].checked = false;
            }
            ;
            /*for(var i = 0; i < $scope.config.listData.length; i++){
             $scope.config.listData[i].selected = false;
             }*/

        };

        $scope.clickNumberButton = function () {
            $scope.config.showSelectAllButton = true;
        };

        /*
         *
         *  跳转明细界面
         *
         */

        $scope.goDetailPage = function (item) {
            // {exp_rep_category}/{exp_rep_hd_id}/{ins_id}/{funType}/{ins_rcpt_id}
            console.log("ListModule.js");
            console.log(item);
            var fun_type;
            if ($scope.config.isTodo) {
                console.log("1");
                fun_type = 'todo';
            } else if ($scope.config.isDone) {
                console.log("2");
                fun_type = 'done';
            } else if ($scope.config.isApply) {
                console.log("3");
                fun_type = 'apply';
            }
            $rootScope.rootConfig.can_back_to_pre_node_flag = item.can_back_to_pre_node_flag;
            $state.go('wfl.detail.docinfo', {
                ins_doc_category: item.ins_doc_category,
                ins_doc_hd_id: item.ins_param,
                ins_id: item.ins_id,
                ins_rcpt_id: item.ins_rcpt_id,
                fun_type: fun_type,
                listForDetailTimes: ++$scope.config.listForDetailTimes
            });
        };

        /*
         *
         *  批量审批相关
         *
         */


        $scope.goBatchApprove = function () {
            __batchHandle($scope.config.nodeActionType.APPROVE);
        };

        $scope.goBatchReject = function () {
            __batchHandle($scope.config.nodeActionType.REJECT);
        };

        $scope.goBatchTransfer = function () {
            console.log("hhh");
            __batchHandle($scope.config.nodeActionType.TRANSFER);
        };

        $scope.goBatchNotify = function () {
            __batchHandle($scope.config.nodeActionType.NOTIFY);
        };

        $scope.goBatchAddHandler = function () {
            __batchHandle($scope.config.nodeActionType.ADDHANDLER);
        };

        $scope.showOpinionPopup = function (type) {
            console.log("Lis");
            var templateStr = '<textarea type="text" style="padding:5px;" placeholder="请填写审批意见" ng-model="config.alertComment" rows="6" >';
            if (type == 'reject') {
                $scope.config.commitType2 = 'REJECT';
                templateStr = '<textarea class="reject-textarea-comment" type="text" style="padding:5px;" placeholder="请填写拒绝原因(必填)" ng-model="config.alertComment" rows="6" >';
            } else if (type == 'nod') {
                $scope.config.commitType2 = 'APPROVE';
                templateStr = '<textarea class="approve-textarea-comment" type="text" style="padding:5px;" placeholder="请填写审批意见" ng-model="config.alertComment" rows="6" >';
            } else {
                throw("ListModule.js 代码异常");
            }
            ;
            var newArray = [],
                insidNodeidArray = [];
            if (!$scope.config.checkboxs) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '请至少选择一个单据!'
                });
                return;
            }
            ;
            for (var i = 0; i < $scope.config.listData.length; i++) {
                if ($scope.config.checkboxs[i].checked) {
                    var item = $scope.config.listData[i];
                    newArray.push(item.ins_rcpt_id);
                    insidNodeidArray.push({
                        insId: item.ins_id,
                        nodeId: item.ins_node_id
                    });
                }
                ;
            }
            ;
            if (newArray.length == 0) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '请至少选择一个单据!'
                });
                return;
            }
            ;


            $scope.opinion = "";
            $scope.data = {}
            var myPopup = $scope.myPopup = $ionicPopup.show({
                template: templateStr,
                title: '审批意见',
                scope: $scope,
                buttons: [{
                    text: '取消'
                }, {
                    text: '<b>提交</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        /**
                         * approve：工作流审批接口 : 同意、拒绝
                         * 参数：数组
                         * action_type：审批类型
                         *              APPROVE    通过
                         *              REJECT      拒绝
                         * comment：审批意见
                         * rcpt_id：工作流待办接受者ID
                         */
                        if (type == 'reject') {
                            if (!$scope.config.alertComment || $scope.config.alertComment == '') {
                                //$scope.g_busy.hide();
                                $scope.myPopup.close();
                                var alertPop = $ionicPopup.alert({
                                    title: '提示',
                                    template: '拒绝意见不能为空'
                                });
                                alertPop.then(function () {
                                    var ele = document.getElementsByClassName("popup-showing");
                                    if (ele) {
                                        ele = angular.element(ele);
                                        ele.remove();
                                    }
                                    ;
                                });
                                return;
                            }
                            ;
                        }
                        ;

                        var paraObj = [];
                        for (var i = newArray.length - 1; i >= 0; i--) {
                            paraObj.push({
                                comment: $scope.config.alertComment,
                                action_type: $scope.config.commitType2,
                                rcpt_id: newArray[i]
                            });
                        }
                        ;
                        //
                        __showLoading();
                        WflHandleService.approve(paraObj).
                            then(function (resp) {
                                $scope.config.alertComment = '';
                                $scope.unSelectAll();
                                $scope.reloadData();
                                __hideLoading();
                                //if (resp.status == '200') {
                                //$scope.g_busy.hide();
                                //Toast.show("已审批");
                                //$rootScope.$broadcast("submitSuccess", x);
                                //$state.go('checkMain');
                                //} else{
                                //
                                //};
                            }, function (resp) {
                                $scope.config.alertComment = '';
                                __hideLoading();

                            });
                    }
                },]
            });
        };

        function __showLoading(tip) {
            var tipText = tip ? tip : '处理中...';
            $ionicLoading.show({
                template: '<div class="handle-loading-tip"><span>' + tipText + '</span></div>'
            });
        };

        function __hideLoading() {
            $ionicLoading.hide();
        };


        function __batchHandle(nodeActionType) {
            var newArray = [],
                insidNodeidArray = [];
            if (!$scope.config.checkboxs) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '请至少选择一个单据!'
                });
                return;
            }
            ;
            for (var i = 0; i < $scope.config.listData.length; i++) {
                if ($scope.config.checkboxs[i].checked) {
                    //if($scope.config.nodeActionType == 'NOTIFY' && ){

                    //};
                    var item = $scope.config.listData[i];
                    newArray.push(item.ins_rcpt_id);
                    insidNodeidArray.push({
                        insId: item.ins_id,
                        nodeId: item.ins_node_id
                    });
                }
                ;
            }
            ;
            if (newArray.length == 0) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '请至少选择一个单据!'
                });
                return;
            }
            ;
            var idsStr = JSON.stringify(newArray);
            var stateName;
            //          var data = {
            //               action_type：审批类型
            //       *              APPROVE    通过
            //       *              REJECT      拒绝
            //       * comment：审批意见
            //       * rcpt_id： newArray工 作流待办接受者ID
            //          }

            /*switch(nodeActionType){
             case $scope.config.nodeActionType.APPROVE:
             stateName = "wfl.handle.approve";
             break;
             case $scope.config.nodeActionType.REJECT:
             stateName = "";
             break;
             case $scope.config.nodeActionType.TRANSFER:
             stateName = "";
             break;
             case $scope.config.nodeActionType.ADDHANDLER:
             stateName = "";
             break;
             case $scope.config.nodeActionType.NOTIFY:
             stateName = "";
             break;
             };*/

            $state.go('wfl.handle', {
                handleType: nodeActionType,
                ids: idsStr,
                insidNodeidArrayStr: JSON.stringify(insidNodeidArray),
                listTimes: ++$scope.config.listTimes
            });

        };

        $scope.__clearListItemsElementInner = function () {
            console.log('__clearListItemsElement...');
            var father = document.getElementById('br-wfl-done-list');
            if (father) {
                ele = father.getElementsByClassName('hec-item-inner');
                __removeEleIfExits(ele);
                var ele2 = father.getElementsByClassName('ins-doc-time');
                __removeEleIfExits(ele2);
            }
            ;
            father = document.getElementById('br-wfl-todo-list');
            if (father) {
                ele = father.getElementsByClassName('hec-item-inner');
                __removeEleIfExits(ele);
                var ele2 = father.getElementsByClassName('ins-doc-time');
                __removeEleIfExits(ele2);
            }
            ;
            father = document.getElementById('br-wfl-apply-list');
            if (father) {
                ele = father.getElementsByClassName('hec-item-inner');
                __removeEleIfExits(ele);
                var ele2 = father.getElementsByClassName('ins-doc-time');
                __removeEleIfExits(ele2);
            }
            ;

        };

        function __clearListItemsElement() {
            console.log('__clearListItemsElementInner...');
            var ele = document.getElementById('br-wfl-done-list');
            if (ele) {
                ele.remove();
            }
            ;
            ele = document.getElementById('br-wfl-todo-list');
            if (ele) {
                ele.remove();
            }
            ;
            ele = document.getElementById('br-wfl-apply-list');
            if (ele) {
                ele.remove();
            }
            ;
        };

        function __removeEleIfExits(ele) {
            if (ele) {
                ele = angular.element(ele);
                ele.remove();
            }
            ;
        };

        $scope.initParams = function () {
            var params = $rootScope.pageParams.wflListPage;

            $scope.config.category = params.category;
            $scope.config.query_url_name = params.query_url_name;
            $scope.config.viewTitle = $scope.config.categoryDesc = hecS.getCategoryDesc(params.category);
            var todoOrDone = params.todoOrDone;

            var isTodo = false, isDone = false, isApply = false;
            if (todoOrDone == 'todo') {
                $scope.config.viewTitle = "未审批";
                isTodo = true;
            } else if (todoOrDone == 'done') {
                $scope.config.viewTitle = "已审批";
                isDone = true;
            } else if (todoOrDone == 'apply' || todoOrDone == "APPLY") {
                $scope.config.viewTitle = "我的申请";
                isApply = true;
            }
            ;

            $rootScope.forceSetTitle($scope.config.viewTitle);
            
            setTodoDoneApply(isTodo, isDone, isApply);
        };

        

        function __init() {

            //__clearListItemsElement();

            $scope.initParams();

            if (!$scope.config.categoryDesc || $scope.config.categoryDesc == '') {
                //$scope.config.viewTitle = "我的申请";
            }
            ;

            $scope.config.nodeActionType = hecDefaults.handleTypes;

        };

        __init();

    }
])
;
