hec.service('WflHandleService', [
    '$AuHttp',
    'HecService',
    function (auHttp, hecS) {

        return {
            /**
             * approve：工作流审批接口 : 同意、拒绝
             * 参数：数组
             * action_type：审批类型
             *              APPROVE    通过
             *              REJECT      拒绝
             * comment：审批意见
             * rcpt_id：工作流待办接受者ID
             */
            approve: approve,
            /**
             * commission：工作流转交接口
             * 参数：数组
             * rcpt_id：工作流待办接受者ID
             * commission_emp_id：转交员工ID
             * comment：转交意见
             */
            commission: commission,
            /**
             * add_approver：工作流添加审批人接口
             * 参数：数组
             * rcpt_id：工作流待办接受者ID
             * priority：添加顺序，之前[BEFORE]，平行[PARALLEL]，之后[AFTER]
             * comment：添加意见
             * add_emp_id：添加员工ID
             */
            addApprover: addApprover,
            /**
             * notify：工作流通知接口
             * 参数：数组
             * instance_id：工作流实例ID
             * node_id：工作流节点ID
             * notify_emp_id：通知员工ID
             * note：通知备注
             */
            notify: notify
        };

        function approve(options) {
            var para = [];
            if (options.length) {
                for (var i = 0; i < options.length; i++) {
                    options[i]._status = 'execute';
                }
                para = options;
            } else {
                options._status = 'execute';
                para.push(options);
            }
            return auHttp.request({
                url: hecS.getUrl('approve'),
                para: para
            });
        };


        function commission(option) {
            var para = [];
            if (option.length) {
                for (var i = 0; i < option.length; i++) {
                    option[i]._status = 'execute';
                }
                para = option;
            } else {
                option._status = 'execute';
                para.push(option);
            }
            return auHttp.request({
                url: hecS.getUrl('commission'),
                para: para
            });
        };

        /*
         [
         {
         rcpt_id: '',
         priority: '',
         emps: [
         {},{},{}
         ]
         }
         ]
         */
        function addApprover(option) {
            var para = [];
            if (option.length) {
                for (var i = 0; i < option.length; i++) {
                    option[i]._status = 'execute';
                }
                para = option;
            } else {
                option._status = 'execute';
                para.push(option);
            }
            return auHttp.request({
                url: hecS.getUrl('add_approver'),
                para: para
            });
        };

        function notify(option) {
            var para = [];
            if (option.length) {
                for (var i = 0; i < option.length; i++) {
                    option[i]._status = 'execute';
                }
                para = option;
            } else {
                option._status = 'execute';
                para.push(option);
            }
            return auHttp.request({
                url: hecS.getUrl('notify'),
                para: para
            });
        };

    }]);

hec.controller('WflHandleController', [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicPopup',
    '$ionicLoading',
    'HecDefaults',
    'WflHandleService',
    function ($scope, $state, $stateParams, $ionicPopup, $ionicLoading, hecDefaults, wflHandleS) {

        $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParam){
                if(fromState.name == "wfl.handle" && (toState.name == "wfl.detail.docinfo" || toState.name == "wfl.list.tododoneapply")){
                        $scope.config.handleComment = "";
                        $scope.config.currentUser = null;
                        $scope.config.currentPriority = null;
                        $scope.config.selectedForTransfer = null;
                        $scope.config.selectedForAddHandler = [];
                        $scope.config.notifyEmps = [];
                        $scope.config.notifyEmpNames = "";
                        $scope.config.currentPriorityId = "PARALLEL";
                }
        });

        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParam) {
            if (toParams.canMulti || toParams.canMulti == false) {
                delete toParams.canMulti;
            }
            ;
            if (toState && fromState && fromState.name && toState.name) {

                if (fromState.name == "user.selectuser") {
                    var users = $scope.publicConfig.selectedUsers;
                    if ($scope.config.isNotifyType) {
                        // $scope.config.notifyEmps = angular.copy(users);
                        if (!$scope.config.notifyEmps) {
                            $scope.config.notifyEmps = [];
                        }
                        ;
                        if (!users) {
                            users = [];
                        }
                        for (var i = 0; i < users.length; i++) {
                            $scope.config.notifyEmps.push(angular.copy(users[i]));
                        }
                        ;
                        console.log($scope.config.notifyEmps);
                        return;
                    } else if ($scope.config.isAddHandlerType) {
                        if (!$scope.config.selectedForAddHandler) {
                            $scope.config.selectedForAddHandler = [];
                        }
                        if (!users) {
                            users = [];
                        }
                        ;
                        for (var i = 0; i < users.length; i++) {
                            $scope.config.selectedForAddHandler.push(angular.copy(users[i]));
                        }
                        ;
                    } else {
                        if (users && users.length > 0) {
                            $scope.config.currentUser = users[0];
                        }
                    }
                    ;
                }
            }
            ;
        });

        $scope.config = {
            handleType: null,
            handleRcptIds: null,
            //insId: null, // instance_id
            //nodeId: null, // 当前节点 ID
            insidNodeidArray: [], // [{insId: , nodeId: }]

            // 界面用到的一些文字描述
            viewTitle: '审批',
            handleTip: '',
            commentTextareaHolder: '请输入审批意见',
            handleComment: '',

            /*
             *
             *  审批操作类型:
             *      用于控制UI元素显示
             *      js中依据类型进行相应的操作限制
             *      js中依据类型进行传参限制
             */
            isApproveType: false,
            isRejectType: false,
            isTransferType: false,
            isAddHandlerType: false,
            isNotifyType: false,


            //selectedUser: {},
            //selectedUsers: []
            currentUser: null, // {}
            currentPriority: null, // {}
            selectedForTransfer: null,	// {}
            selectedForAddHandler: [],
            notifyEmps: [], // 通知对象
            notifyEmpNames: '',

            currentPriorityId: 'PARALLEL',


            // 添加审批人相关：
            select_priority: [  // 之前[BEFORE]，平行[PARALLEL]，之后[AFTER]
                {
                    name: 'BEFORE',
                    value: ' 之  前'
                },
                {
                    name: 'PARALLEL',
                    value: ' 平  行'
                },
                {
                    name: 'AFTER',
                    value: ' 之  后'
                }
            ]

        };


        $scope.deleteNotifer = function (index) {
            if (!$scope.config.notifyEmps) {
                return;
            }
            ;
            var temp1 = $scope.config.notifyEmps.slice(0, index);
            var temp2 = $scope.config.notifyEmps.slice(index + 1);

            var result = angular.copy(temp1);
            result = result.concat(angular.copy(temp2));
            $scope.config.notifyEmps = angular.copy(result);

        };

        $scope.showHandleSelectCount = function (){
            var ids = $scope.config.insidNodeidArray;
            return ids && ids.length && ids.length > 0;
        };

        $scope.getNotifyEmpNames = function () {
            $scope.config.notifyEmpNames = "";
            var users = $scope.config.notifyEmps;
            for (var j = 0; j < users.length; j++) {
                if (j == 0) {
                    $scope.config.notifyEmpNames += users[j].exp_emp_name;
                } else {
                    $scope.config.notifyEmpNames += ("," + users[j].exp_emp_name);
                }
            }
            ;
            return $scope.config.notifyEmpNames;
        };

        function __validCanSelectPriority() {
            if ($scope.config.selectedForAddHandler && $scope.config.selectedForAddHandler.length > 0) {
                return false;
            }
            ;
            return true;
        };
        function __validCanSelectUserForAddHandler() {
            if (!$scope.config.currentPriorityId || $scope.config.currentPriorityId == '') {
                return false;
            }
            ;
            return true;
            //if($scope.config.currentPriority && $scope.config.currentPriority.value && $scope.config.currentPriority.name){
            // return true;
            //};
            //return false;
        };

        $scope.showSelectPriority = function () {
            if (!__validCanSelectPriority()) {
                return;
            }
            ;
            var user = $scope.config.selectedForTransfer;
            if (user) {
                //return;
            }// 防止添加第二个

            var opts = {
                //template: '',
                templateUrl: 'html/weixin/wfl/loading_select_priority.html',
                noBackdrop: false,
                delay: 0, //number
                duration: 0 //number
            };
            $ionicLoading.show(opts);
        };

        $scope.getSelectedPriorityDesc = function () {
            var ps = $scope.config.currentPriority;
            if (ps) {
                return ps.value;
            } else
                return '';
        };

        $scope.handleCancel = function () {
            //$scope.$ionicGoBack();
            $scope.config.selectedForAddHandler = [];
            $scope.publicFuns.goBack(null, $scope);
        };

        $scope.goSelectUserPage = function () {
            if ($scope.config.isTransferType) {
                var user = $scope.config.selectedForTransfer;
                if (user && ( user.add_emp_name || user.add_emp_id || user.priority )) {
                    __alertHandle(null, "只能添加一个转交人!");
                    return;
                }
                ;	// 防止添加第二个
                $state.go('user.selectuser', {canMulti: false, handleTimes: ++$scope.publicConfig.handleTime});
            } else if ($scope.config.isAddHandlerType) {
                if (!__validCanSelectUserForAddHandler()) {
                    __alertHandle('提示', '请先添加顺序!');
                    return;
                }
                ;
                var users = $scope.config.selectedForAddHandler;
                var userIds = [];
                for (var i = 0; i < users.length; i++) {
                    userIds.push(users[i].exp_emp_id);
                }
                ;
                $state.go('user.selectuser', {
                    hasUserIds: JSON.stringify(userIds),
                    canMulti: true,
                    handleTimes: ++$scope.publicConfig.handleTime
                });
            } else if ($scope.config.isNotifyType) {
                var users = $scope.config.notifyEmps;
                var userIds = [];
                for (var i = 0; i < users.length; i++) {
                    userIds.push(users[i].exp_emp_id);
                }
                ;
                $state.go('user.selectuser', {
                    hasUserIds: JSON.stringify(userIds),
                    canMulti: true,
                    handleTimes: ++$scope.publicConfig.handleTime
                });
            }
        };

        $scope.handleOperator = function () {
            var paraObj,
                actionType = $scope.config.handleType,
                comment = $scope.config.handleComment,
                rcpt_id = $scope.config.handleRcptIds;

            switch ($scope.config.handleType) {
                case hecDefaults.handleTypes.APPROVE:
                    paraObj = [];
                    for (var i = rcpt_id.length - 1; i >= 0; i--) {
                        paraObj.push({
                            action_type: actionType,
                            comment: comment,
                            rcpt_id: rcpt_id[i]
                        });
                    }
                    ;
                    __showLoading();
                    wflHandleS.approve(paraObj).then(function (resp) {
                        __hideLoading();
                        if (resp.response.success) {
                            __afterHandle(true, '同意 成功', true);
                        } else {
                            __afterHandle(false, '操作 失败');
                        }
                        ;
                    }, function (resp) {
                        __hideLoading();
                    });
                    break;
                case hecDefaults.handleTypes.REJECT:
                    if (!comment || comment == '' || comment.trim() == '') {
                        __alertHandle(null, "请输入拒绝原因!");
                        return;
                    }
                    paraObj = [];
                    for (var i = rcpt_id.length - 1; i >= 0; i--) {
                        paraObj.push({
                            action_type: actionType,
                            comment: comment,
                            rcpt_id: rcpt_id[i]
                        });
                    }
                    ;
                    __showLoading();
                    wflHandleS.approve(paraObj).then(function (resp) {
                        __hideLoading();
                        if (resp.response.success) {
                            __afterHandle(true, '拒绝 成功', true);
                        } else {
                            __afterHandle(false, '拒绝 失败', false);
                        }
                    }, function (resp) {
                        __hideLoading();
                    });
                    break;
                case hecDefaults.handleTypes.TRANSFER:
                    //var commission_emp_id = $scope.config.commission_emp_id;
                    if (!$scope.config.currentUser) {
                        __alertHandle('提示', '请添加转交人!');
                        return;
                    }
                    ;
                    var commission_emp_id = $scope.config.currentUser.exp_emp_id;

                    paraObj = [];
                    for (var i = rcpt_id.length - 1; i >= 0; i--) {
                        paraObj.push({
                            rcpt_id: rcpt_id[i],
                            commission_emp_id: commission_emp_id,
                            comment: comment
                        });
                    }
                    ;
                    __showLoading();
                    wflHandleS.commission(paraObj).then(function (resp) {
                        __hideLoading();
                        if (resp.response.success) {
                            __afterHandle(true, '转交 成功', true);
                        } else {
                            __afterHandle(false, '转交 失败');
                        }
                    }, function (resp) {
                        __hideLoading();
                    });
                    break;
                case hecDefaults.handleTypes.ADDHANDLER:
                    //var priority = $scope.config.priority;
                    //var priority = $scope.config.currentPriority;
                    var priorityId = $scope.config.currentPriorityId;
                    if (!priorityId || priorityId == '') {
                        __alertHandle('提示', '请先选择顺序!');
                        return;
                    }
                    ;
                    var add_emp_id = $scope.config.add_emp_id;
                    var add_emps = $scope.config.selectedForAddHandler;
                    if (!add_emps || !add_emps.length || add_emps.length == 0) {
                        __alertHandle('提示', '请先添加用户!');
                        return;
                    }
                    ;
                    paraObj = [];
                    var emps = [];
                    for (var i = 0; i < add_emps.length; i++) {
                        emps.push({
                            add_emp_id: add_emps[i].exp_emp_id
                        });
                    }
                    ;
                    for (var i = rcpt_id.length - 1; i >= 0; i--) {
                        paraObj.push({
                            rcpt_id: rcpt_id[i],
                            priority: priorityId,
                            emps: emps
                        });
                    }
                    ;
                    __showLoading();
                    wflHandleS.addApprover(paraObj).then(function (resp) {
                        __hideLoading();
                        if (resp.response.success) {
                            $scope.config.selectedForAddHandler = [];
                            __afterHandle(true, '添加处理人成功', true);
                        } else {
                            __afterHandle(false, '添加处理人失败');
                        }
                    }, function (resp) {
                        __hideLoading();
                    });
                    break;
                case hecDefaults.handleTypes.NOTIFY:
                    paraObj = [];
                    if (!$scope.config.notifyEmps || !$scope.config.notifyEmps.length || $scope.config.notifyEmps.length < 0) {
                        __alertHandle('提示', '请先添加通知用户!');
                        return;
                    }
                    ;
                    if (!comment || comment == '' || comment.trim() == '') {
                        __alertHandle('提示', "请输入通知消息!");
                        return;
                    }
                    ;
                    for (var j = 0; j < $scope.config.insidNodeidArray.length; j++) {
                        for (var i = 0; i < $scope.config.notifyEmps.length; i++) {
                            paraObj.push({
                                instance_id: $scope.config.insidNodeidArray[j].insId,
                                node_id: $scope.config.insidNodeidArray[j].nodeId || "",
                                note: comment,
                                notify_emp_id: $scope.config.notifyEmps[i].exp_emp_id
                            });
                        }
                        ;
                    }
                    ;
                    __showLoading();
                    wflHandleS.notify(paraObj).then(function (resp) {
                        __hideLoading();
                        if (resp.response.success) {
                            __afterHandle(true, '通知发送成功!', true);
                        } else {
                            __afterHandle(false, '通知发送失败!');
                        }
                    }, function (resp) {
                        __hideLoading();
                    });
                    break;
            }
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

        // 一次只能添加一个 处理人
        $scope.disableIconClick = function () {
            var hasOne = $scope.config.selectedForTransfer ? true : false;
            return hasOne;
        };

        // 是否显示 添加处理人界面中的《重置》按钮
        $scope.diabledResetBtn = function (multi) {
            var user = $scope.config.currentUser,
                priority = $scope.config.currentPriority;
            //au = $scope.config.selectedForTransfer;
            //var b_added_user = au && (au.add_emp_id && au.add_emp_name && au.priority);
            var b_user_info = !!user && (!!user.exp_emp_name || !!user.exp_emp_id);
            var b_priority = !!priority && (!!priority.name || !!priority.value);
            //if(multi){
            return !(b_user_info || b_priority);
            //}else{
            //    return b_added_user ? true : !( b_user_info || b_priority );
            //}
            //return b_added_user ? true : ( b_user_info ? (b_priority ? false : true) : true );
            // return !(user && ( user.add_emp_name || user.add_emp_id || user.priority ));
        };

        // 是否显示 添加处理人界面中的《确定》按钮
        $scope.showAddApproverBtn = function () {
            var emp = $scope.config.currentUser;
            var priority = $scope.config.currentPriority;
            var hasOne = $scope.config.selectedForTransfer ? true : false;
            return hasOne || (!(emp && priority && emp.exp_emp_id && priority.name && priority.name != ''));
        };

        $scope.addCurrentApprover = function () {
            if (!$scope.config.currentUser || !$scope.config.currentPriority) {
                return;
            }
            ;
            var emp_id = $scope.config.currentUser.exp_emp_id,
                emp_name = $scope.config.currentUser.exp_emp_name,
                emp_priority = $scope.config.currentPriority;
            $scope.config.selectedForAddHandler.push({
                add_emp_id: emp_id,
                add_emp_name: emp_name
                //priority: emp_priority
            });
            $scope.resetCurrentApprover();
        };

        $scope.deleteHandler = function (index) {
            var temp = $scope.config.selectedForAddHandler.slice(0, index);
            var temp2 = $scope.config.selectedForAddHandler.slice(index + 1);
            for (var i = 0; i < temp2.length; i++) {
                temp.push(temp2[i]);
            }
            ;
            $scope.config.selectedForAddHandler = temp;
        };

        $scope.resetCurrentApprover = function () {
            $scope.config.currentUser = null;
            //$scope.config.currentPriority = null;
        };

        function __alertHandle(title, message) {
            var vtitle = title && title != "" ? title : '提示';
            $ionicPopup.alert({
                title: vtitle,
                template: message
            });
        };

        function __afterHandle(success, message, back) {
            var alert = $ionicPopup.alert({
                title: '提示',
                template: message
            });
            alert.then(function () {
                if (success && back) {
                    //$stateParams.handleOk = true;
                    $scope.publicConfig.handleOk = true;
                    //$scope.$ionicGoBack();
                    $scope.publicFuns.goBack(null, $scope);
                }
            });
        };


        function __clearHandleTypeInfo() {
            $scope.config.isApproveType = false;
            $scope.config.isRejectType = false;
            $scope.config.isTransferType = false;
            $scope.config.isAddHandlerType = false;
            $scope.config.isNotifyType = false;
            $scope.config.handleTip = "";
            $scope.config.handleComment = "";
            $scope.config.viewTitle = "单据审批";
        };

        var __handleTip = {
            APPROVE: '同意',
            REJECT: '拒绝',
            TRANSFER: '转交',
            ADDHANDLER: '添加处理人',
            NOTIFY: '通知'
        };

        function __init() {
            __clearHandleTypeInfo();
            $scope.config.handleType = $stateParams.handleType;
            $scope.config.handleRcptIds = JSON.parse($stateParams.ids);
            var insidNodeidArrayStr = $stateParams.insidNodeidArrayStr;
            $scope.config.notifyEmpNames = [];
            $scope.config.selectedForAddHandler = [];
            if (insidNodeidArrayStr) {
                $scope.config.insidNodeidArray = JSON.parse(insidNodeidArrayStr);
            }
            ;
            switch ($scope.config.handleType) {
                case hecDefaults.handleTypes.APPROVE:
                    $scope.config.handleTip = __handleTip.APPROVE;
                    $scope.config.isApproveType = true;
                    $scope.config.handleComment = "同意";
                    break;
                case hecDefaults.handleTypes.REJECT:
                    $scope.config.handleTip = __handleTip.REJECT;
                    $scope.config.isRejectType = true;
                    $scope.config.commentTextareaHolder = "请输入拒绝原因(必填)";
                    $scope.config.handleComment = "";
                    break;
                case hecDefaults.handleTypes.ADDHANDLER:
                    $scope.config.handleTip = __handleTip.ADDHANDLER;
                    $scope.config.isAddHandlerType = true;
                    break;
                case hecDefaults.handleTypes.TRANSFER:
                    $scope.config.handleTip = __handleTip.TRANSFER;
                    $scope.config.handleComment = "";
                    $scope.config.isTransferType = true;
                    break;
                case hecDefaults.handleTypes.NOTIFY:
                    $scope.config.handleTip = __handleTip.NOTIFY;
                    $scope.config.isNotifyType = true;
                    $scope.config.commentTextareaHolder = "请输入通知消息(必填)";
                    $scope.config.handleComment = "";
                    break;
            }

        };

        __init();

    }]);

hec.controller('WflSelectController', [
    '$scope',
    '$ionicLoading',
    function ($scope, $ionicLoading) {

        $scope.config = {
            /*
             *  选择 Priority
             */
            select_priority: [  // 之前[BEFORE]，平行[PARALLEL]，之后[AFTER]
                {
                    name: 'BEFORE',
                    value: '之前'
                },
                {
                    name: 'PARALLEL',
                    value: '平行'
                },
                {
                    name: 'AFTER',
                    value: '之后'
                }
            ],
            /*
             *  选择 category
             */
            select_category: [
                {
                    name: 'ACP_REQUISITION',
                    value: '付款申请单'
                },
                {
                    name: 'BUDGET_JOURNAL',
                    value: '预算记账'
                },
                {
                    name: 'CON_CONTRACT',
                    value: '合同'
                },
                {
                    name: 'EXP_REPORT',
                    value: '费用报销单'
                },
                {
                    name: 'EXP_REQUISITION',
                    value: '费用申请单'
                },
                {
                    name: 'EXP_TRAVEL_PLAN',
                    value: '差旅计划'
                },
                {
                    name: 'OA_FLOW',
                    value: 'BPM流程申请'
                },
                {
                    name: 'PAYMENT_REQUISITION',
                    value: '借款申请单'
                },
                {
                    name: 'PTL_ANNOUNCEMENT',
                    value: '门户公告'
                },
                {
                    name: 'PTL_FILES',
                    value: '文档管理'
                }
            ]
        };


        $scope.hideLoading = function ($event) {
            if (!$event) {
                return;
            }
            var $target = angular.element($event.target);
            var attrs = $target[0].attributes;
            for (var i = (attrs.length - 1); i >= 0; i--) {
                var attr = attrs[i];
                if ((attr.name == "cound-hide")) {
                    $ionicLoading.hide();
                }
            }
        };

        $scope.selectPriority = function (item) {
            $scope.config.current_priority = item;
            //var elemDom = document.getElementById('hec-wfl-handle-page');
            var elemDoms = document.getElementsByClassName('hec-wfl-handle-page-class');
            var elemDom = elemDoms[elemDoms.length - 1];
            //var elemDom = document.getElementById('handle-addhandler-content');
            var elem = angular.element(elemDom);
            var elemScope = elem.scope();
            elemScope.config.currentPriority = item;
            $ionicLoading.hide();
        };

        $scope.selectCategory = function (item) {
            $scope.config.current_priority = item;
            // hec-wfl-todo-done-view
            var elemDom = document.getElementById('approve-approve');
            var elem = angular.element(elemDom);
            var elemScope = elem.scope();
            elemScope.seniorSearchConfig.ins_doc_category = item;
            $ionicLoading.hide();
        };

    }]);