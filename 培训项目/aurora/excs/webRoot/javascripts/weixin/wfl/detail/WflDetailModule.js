hec.service('WflDetailService', [
    '$AuHttp',
    'HecService',
    function (auHttp, hecS) {
        return {
            queryExpReportPmtplan: function (option) {
                var opt = option || {};
                // opt.para: {exp_rep_hd_id: 110}
                return auHttp.request({
                    url: hecS.getUrl('exp_report_pmtplan_query'),
                    para: opt.para
                });
            },
            queryHeaderInfo: function (option) {
                var opt = option || {};
                var urlTip = hecS.getDetailHeaderUrlTip(option.category);
                return auHttp.request({
                    url: hecS.getUrl(urlTip),
                    para: opt.para
                });
            },
            /*
             queryExpReportLine: function (option){
             opt = option || {};
             return auHttp.request({
             url: hecS.getUrl('detail_lines_exp_report') + '?' + hecS.getParamsUrl(opt),
             para: opt.para
             });
             },
             queryExpRequisitionLine: function (option){
             opt = option || {};
             return auHttp.request({
             url: hecS.getUrl('detail_lines_exp_requisition') + '?' + hecS.getParamsUrl(opt),
             para: opt.para
             });
             },
             queryPayRequisitionLine: function (option){
             opt = option || {};
             return auHttp.request({
             url: hecS.getUrl('detail_lines_pay_requisition') + '?' + hecS.getParamsUrl(opt),
             para: opt.para
             });
             },*/
            queryLineInfo: function (option) {
                var opt = option || {};
                var baseUrlTip = hecS.getDetailLinesUrlTip(option.category);
                return auHttp.request({
                    url: hecS.getUrl(baseUrlTip),
                    para: opt.para
                });
            },

            /**
             * approve_record_query：审批记录查询接口
             * 参数
             * ins_id:工作流实例ID
             * 返回值：
             * approve_action_title：审批动作标题
             * approve_user_name：审批者姓名
             * approve_comment：审批意见
             * approve_user_id：审批用户ID
             * approve_date：approve_date
             * approve_date_format：审批日期格式化
             */
            queryApproveRecord: function (option) {
                opt = option || {};
                return auHttp.request({
                    url: hecS.getUrl('approve_record_query'),
                    para: opt.para
                });
            },
            queryDocFlowPreview: function (option) {
                var opt = option || {};
                return auHttp.request({
                    url: hecS.getUrl('wfl_preview_record_query'),
                    para: opt.para
                });
            },
            initDocFlowPreview: function (option) {
                var opt = option || {};
                return auHttp.request({
                    url: hecS.getUrl('wfl_preview_record_init'),
                    para: opt.para
                });
            },
            queryAttachments: function (option) {
                var opt = option || {};
                return auHttp.request({
                    url: hecS.getUrl('detail_attachment_list'),
                    para: opt.para
                });
            },
            cancelInstance: function (option) {
                var opt = option || {};
                return auHttp.request({
                    url: hecS.getUrl('cancel_workflow_instance'),
                    para: opt.para
                });
            },
            cancelInstanceDone: function (option) {
                var opt = option || {};
                return auHttp.request({
                    url: hecS.getUrl('cancel_workflow_instance_done'),
                    para: opt.para
                });
            }
        };
    }]);

hec.controller('WflDetailController', [
    '$scope',
    '$rootScope',
    '$state',
    '$stateParams',
    '$ionicPopup',
    '$ionicLoading',
    'WflHandleService',
    function ($scope, $rootScope, $state, $stateParams, $ionicPopup, $ionicLoading, WflHandleService) {

        $scope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParam) {
            var title = $rootScope.newtitle;
            if (!title || title == "") {
                title = "未审批";
            }
            $rootScope.forceSetTitle(title);
        });

        $scope.config = {

            /*
             *
             *  UI 控制相关变量
             *
             */
            diableBtnDocInfo: true,
            diableBtnDocFlow: false,

            viewTitle: '',

            isTodo: false,
            isDone: false,
            isApply: false,

            workflowCategory: null,
            headerId: null,
            insId: null,
            insRcptId: null,
            funType: null, // String: todo | done | apply

            nodeActionType: null,
            /*{
             APPROVE: 'APPROVE',
             REJECT: 'REJECT',
             ADDHANDLER: 'ADDHANDLER',
             TRANSFER: 'TRANSFER',
             NOTIFY: 'NOTIFY'
             },*/


            approveDone: false,  // 单据是否已经审批结束

            detailInfoToFlowTimes: 0,
            detailFlowToInfoTimes: 0,
            detailInfoTimes: 0 // 防止 back 到 handle 界面

        };

        $scope.isExpReport = function () {
            return $scope.config.workflowCategory == 'EXP_REPORT';
        };
        $scope.isExpRequisition = function () {
            return $scope.config.workflowCategory == 'EXP_REQUISITION';
        };
        $scope.isPayRequisition = function () {
            return $scope.config.workflowCategory == 'PAYMENT_REQUISITION';
        };

        $scope.getDateDescStr = function (dateStr) { // 2015-11-30 12:04:05
            if (!isDateStr(dateStr)) {
                return dateStr;
            }
            ;
            var returnStr = '';
            var subStr = dateStr.substr(0, dateStr.lastIndexOf(':'));
            var yearStr = dateStr.substr(0, dateStr.indexOf('-'));
            if (isThisYear(yearStr)) {
                returnStr = dateStr.substr(dateStr.indexOf('-') + 1, 11);
            } else {
                returnStr = dateStr.substr(0, dateStr.lastIndexOf(' '));
            }
            ;
            //console.log(returnStr);
            return returnStr;
            function isThisYear(year) {
                return new Date().getFullYear() == year ? true : false;
            };
            function isDateStr(str) {
                //console.log(str);
                if (!str) {
                    return false;
                }
                ;
                var match = str.match(/[1-9][0-9]{3}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/);
                return !!match ? true : false;
            };
        };

        $scope.datas = {
            header: {
                exp_rep_hd_id: null,
                exp_rep_num: '暂无',
                exp_rep_type_desc: '',
                exp_rep_date: null,  // 报销日期
                exp_rep_com_name: '', // 报销单头公司
                exp_rep_created_by: '',   // 提单人==制单人
                exp_rep_emp_name: '',     // 报销人
                exp_rep_pos_name: '',     // 报销人岗位
                exp_rep_currency_name: '', // 币种
                exp_rep_total_amount: null, // 总金额
                exp_rep_desc: ''            // 单据头描述
            },
            lines: [
                {
                    exp_rep_line_resp_name: '暂无',      // 报销单行责任中心名称
                    exp_rep_line_exp_item_name: '暂无',  // 报销单行费用项目名称
                    exp_rep_line_amount: 0
                }
            ],
            /*
             approve_action_title: "同意"
             approve_comment: "同意"
             approve_date: "2015-10-12"
             approve_date_format: "10月12日"
             approve_emp_name: "王可"
             approve_user_id: 1201
             */
            approveHt: [
                /*{
                 'detailDesc': '张三  于  2015-09-20 同意',
                 'comment': '同意报销',
                 'exp_emp_id': 201
                 },
                 {
                 'detailDesc': '张三  于  2015-09-20 同意',
                 'comment': '同意报销',
                 'user_id': 8321
                 },
                 {
                 'detailDesc': '张三  于  2015-09-20 同意',
                 'comment': '同意报销',
                 'user_id': 7209
                 },
                 {
                 'detailDesc': '张三  于  2015-09-20 同意',
                 'comment': '同意报销'
                 },
                 {
                 'detailDesc': '张三  于  2015-09-20 同意',
                 'comment': '同意报销'
                 }*/
            ],
            approveFlowsOld: [],
            approveFlows: [
                /*{
                 ins_id: "3846",
                 ins_preview_ins_status: "APPROVED",
                 node_approve_type: "全部审批",
                 node_id: "1",
                 node_name: "部门经理",
                 node_seq: "10",
                 node_status_desc: "已审批",
                 nodeApprovers: [
                 {
                 approve_action: "同意",
                 approve_opinion: '',
                 approve_date: "2015-10-21 13:37:29",
                 approve_emp_id: "4",
                 approve_emp_name: "谢志军",
                 }
                 ]
                 }*/
            ],
            docCreatedBy: null,
            pmtplan: [
                /*{
                 exp_rep_due_amount: "777"
                 exp_rep_payee_partner_name: "刘静"
                 exp_rep_write_off_amount: "0"
                 }*/
            ]
        };


        $scope.goDocInfoView = function () {
            $scope.config.diableBtnDocInfo = true;
            $scope.config.diableBtnDocFlow = false;
            //$state.go('wfl.detail.docinfo');
            $scope.$ionicGoBack();         //, relative: $state.$current
            /*$state.go('wfl.detail.docinfo',{
             detailFlowToInfoTimes: ++$scope.config.detailFlowToInfoTimes
             }, {
             location: 'replace'
             });*/
            //$scope.publicFuns.goBack(null, $scope);
            //$state.go('wfl.detail.docinfo', {},{location:'replace'});
        };

        $scope.goDocFlowView = function () {
            $scope.config.diableBtnDocInfo = false;
            $scope.config.diableBtnDocFlow = true;
            $state.go('wfl.detail.docflow', {
                ins_id: $scope.config.insId,
                detailInfoToFlowTimes: ++$scope.config.detailInfoToFlowTimes
            }, {
                location: 'replace'
            });
        };

        $scope.goUserDetailPage = function (userId, empId) {
            var param = {};
            if (userId) {
                param.user_id = userId;
            }
            if (empId) {
                param.exp_emp_id = empId;
            }
            $state.go('user.info', param);
        };

        $scope.showOpinionPopup = function (type) {
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
                        paraObj.push({
                            comment: $scope.config.alertComment,
                            action_type: $scope.config.commitType2,
                            rcpt_id: $scope.config.insRcptId
                        });

                        __showLoading();

                        WflHandleService.approve(paraObj).
                            then(function (resp) {
                                __hideLoading();
                                if (resp.status == '200') {
                                    $scope.publicConfig.handleOk = true;
                                    var alertSuccess = $ionicPopup.alert({
                                        title: '提示',
                                        template: '处理成功!'
                                    });
                                    alertSuccess.then(function () {
                                        $scope.publicFuns.goBack(null, $scope);
                                    });
                                } else {
                                    //
                                }
                                ;
                            }, function (resp) {
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

    }]);

hec.controller('DocInfoController', [
    '$scope',
    '$state',
    '$stateParams',
    '$ionicPopup',
    '$ionicLoading',
    'HecDefaults',
    'HecService',
    'WflDetailService',
    'UserInfoService',
    function ($scope, $state, $stateParams, $ionicPopup, $ionicLoading, hecDefaults, hecS, wflDetailS, userInfoS) {


        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParam) {
            if (toState && fromState && fromState.name && toState.name) {
                if (fromState.name == "wfl.handle" && toState.name == "wfl.detail.docinfo") {
                    var needRefresh = $scope.publicConfig.handleOk;
                    if (needRefresh) {
                        //$scope.$ionicGoBack();
                        $scope.publicFuns.goBack(null, $scope);
                    }
                    ;
                }
                ;
            }
            ;
        });


        function __getStr(str, nullValue) {
            var replaceStr = nullValue ? nullValue : '暂无';
            return str ? str : replaceStr;
        }

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

        /*
         *
         *  单据审批相关接口
         *
         */

        function __showLoading(tip) {
            var tipText = tip ? tip : '处理中...';
            $ionicLoading.show({
                template: '<div class="handle-loading-tip"><span>' + tipText + '</span></div>'
            });
        };

        function __hideLoading() {
            $ionicLoading.hide();
        };

        $scope.cancleInstance = function () {
            var cancleConfirm = $ionicPopup.confirm({
                title: '提示',
                template: '确定收回当前单据吗?',
                cancelText: '取消',
                okText: '确定'
            });

            cancleConfirm.then(function (resp) {
                if (resp) { // 确定
                    __cancleInstance();
                } else { // 取消
                }
            });
        };

        $scope.cancleInstanceDone = function () {
            var cancleConfirm = $ionicPopup.confirm({
                title: '提示',
                template: '确定收回当前单据吗?',
                cancelText: '取消',
                okText: '确定'
            });

            cancleConfirm.then(function (resp) {
                if (resp) { // 确定
                    __cancleInstanceDone();
                } else { // 取消
                }
            });
        };

        function __cancleInstance() {
            var header = $scope.datas.header;
            var canCancle = !!header.can_cancel && !!(header.can_cancel == 1 || header.can_cancel == '1');
            if (!canCancle) {
                $ionicPopup.alert({
                    title: '提示',
                    template: '该工作流类型无法收回!'
                });
            } else {
                __showLoading();
                wflDetailS
                    .cancelInstance({para: {instance_id: $scope.config.insId}})
                    .then(function (resp) {
                        __hideLoading();
                        if (resp.response.success) {
                            var okAlert = $ionicPopup.alert({
                                title: '提示',
                                template: '收回成功!'
                            });
                            okAlert.then(function () {
                                $scope.publicConfig.handleOk = true;
                                //$scope.$ionicGoBack();
                                $scope.publicFuns.goBack(null, $scope);
                            });
                        } else {
                            __hideLoading();
                            $ionicPopup.alert({
                                title: '提示',
                                template: '收回失败!'
                            });
                        }
                        ;
                    });
            }
        };

        function __cancleInstanceDone() {
            //__showLoading();
            wflDetailS
                .cancelInstanceDone({para: {ins_id: $scope.config.insId, comment: ""}})
                .then(function (resp) {
                    //__hideLoading();
                    if (resp.response.success) {
                        var okAlert = $ionicPopup.alert({
                            title: '提示',
                            template: '收回成功!'
                        });
                        okAlert.then(function () {
                            $scope.publicConfig.handleOk = true;
                            //$scope.$ionicGoBack();
                            $scope.publicFuns.goBack(null, $scope);
                        });
                    } else {
                        //__hideLoading();
                        $ionicPopup.alert({
                            title: '提示',
                            template: '收回失败!'
                        });
                    }
                    ;
                });
        };

        $scope.goBatchApprove = function () {
            __batchHandle($scope.config.nodeActionType.APPROVE);
        };

        $scope.goBatchReject = function () {
            __batchHandle($scope.config.nodeActionType.REJECT);
        };

        $scope.goBatchTransfer = function () {
            console.log("wf");
            __batchHandle($scope.config.nodeActionType.TRANSFER);
        };

        $scope.goBatchAddHandler = function () {
            __batchHandle($scope.config.nodeActionType.ADDHANDLER);
        };

        $scope.goBatchNotify = function () {
            __batchHandle($scope.config.nodeActionType.NOTIFY);
        };

        $scope.goAttachmentList = function () {
            $state.go('wfl.detail.attachment', {
                exp_rep_type_desc: $scope.datas.header.exp_rep_type_desc,
                exp_rep_hd_id: $scope.datas.header.exp_rep_hd_id
            });
        }

        function __batchHandle(nodeActionType) {
            var newArray = [], insidNodeidArray = [];
            newArray.push($scope.config.insRcptId);
            var idsStr = JSON.stringify(newArray);

            insidNodeidArray.push({
                insId: $scope.datas.header.ins_id,
                nodeId: $scope.datas.header.ins_node_id
            });

            $state.go('wfl.handle', {
                handleType: nodeActionType,
                ids: idsStr,
                insidNodeidArrayStr: JSON.stringify(insidNodeidArray),
                detailInfoTimes: ++$scope.config.detailInfoTimes
            });

        };

        /*
         *
         *  单据详情信息查询相关接口
         *
         */

        function __queryCreatdBy(empId, userId) {
            var para = {};
            if (empId) {
                para.exp_emp_id = empId;
            }
            if (userId) {
                para.user_id = userId;
            }
            userInfoS.queryUserInfo({para: para})
                .then(function (resp) {
                    if (resp.data) {
                        var user = $scope.$parent.datas.docCreatedBy = resp.data[0];
                        if (!user.exp_emp_weixin_avatar || user.exp_emp_weixin_avatar == '') {
                            $scope.$parent.datas.docCreatedBy.exp_emp_weixin_avatar = 'images/weixin/default_user_head.jpg';
                        }
                        ;
                        var comUnitPosStr = __getStr(user.exp_company_name) + '-' + __getStr(user.exp_unit_name) + '-' + __getStr(user.exp_position_name);
                        $scope.$parent.datas.docCreatedBy.comUnitPosStr = comUnitPosStr;
                    }
                }, function (resp) {

                });
        }

        function __queryDetailInfo(headerId, workflowCategory) {
            if (!headerId)
                return;
            var headerPara = {exp_rep_hd_id: headerId},
                linePara = {exp_rep_hd_id: headerId, exp_rep_category: workflowCategory},
                ptmplanPara = {exp_rep_hd_id: headerId};
            if ($scope.isExpReport()) {
                wflDetailS
                    .queryExpReportPmtplan({para: headerPara})
                    .then(function (resp) {
                        if (resp.data) {
                            $scope.$parent.datas.pmtplan = resp.data;
                        }
                        ;
                    });
            }
            ;
            wflDetailS
                .queryHeaderInfo({category: workflowCategory, para: headerPara})
                .then(function (resp) {
                    if (resp.data) {
                        var header = $scope.$parent.datas.header = resp.data[0];
                        //$scope.$parent.config.detailViewTitle = resp.data.exp_rep_type_desc;
                        __queryCreatdBy(null, header.exp_rep_created_by);
                    }
                    ;
                });
            wflDetailS
                .queryLineInfo({category: workflowCategory, para: linePara})
                .then(function (resp) {
                    if (resp.data && resp.data.length) {
                        $scope.$parent.datas.lines = resp.data;
                    }
                });
        }

        function __queryApproveRecord(insId) {
            wflDetailS
                .queryApproveRecord({para: {ins_id: insId}})
                .then(function (resp) {
                    if (resp.data && resp.data.length && resp.data.length > 0) {
                        for (var i = resp.data.length - 1; i >= 0; i--) {
                            var item = resp.data[i];
                            __handleApproveRecordData(resp.data);
                            resp.data[i].detailDesc = item.approve_emp_name + " 于 " + item.approve_date + " " + (item.approve_action_title || '');
                            resp.data[i].comment = item.approve_comment;
                            resp.data[i].user_id = item.approve_user_id;
                        }
                        ;
                        $scope.$parent.datas.approveHt = resp.data;
                    }
                });
        };
        function __handleApproveRecordData(datas) {
            if (!datas || datas.length == 0) {
                return;
            }
            ;
            for (var i = 0; i < datas.length; i++) {
                var j = datas[i].approve_emp_name.indexOf('通知');
                if (j > 0) {
                    datas[i].approve_action_title = datas[i].approve_emp_name.slice(j);
                    datas[i].approve_emp_name = datas[i].approve_emp_name.slice(0, j);
                }
                ;
            }
            ;
        };

        var __init = function () {


            $scope.datas.approveFlowsOld = [];
            $scope.datas.approveFlows = [];
            $scope.datas.pmtplan = [];
            $scope.datas.docCreatedBy = [];
            $scope.datas.approveHt = [];
            $scope.datas.header = {};
            $scope.datas.lines = [];

            $scope.config.nodeActionType = hecDefaults.handleTypes;

            var headerId = $stateParams.ins_doc_hd_id,
                workflowCategory = $stateParams.ins_doc_category,
                insId = $stateParams.ins_id,
                insRcptId = $stateParams.ins_rcpt_id,
                funType = $stateParams.fun_type;

            $scope.config.workflowCategory = workflowCategory;
            $scope.config.viewTitle = hecS.getCategoryDesc(workflowCategory);
            $scope.config.headerId = headerId;
            $scope.config.insId = insId;
            $scope.config.insRcptId = insRcptId;
            $scope.config.funType = funType;

            $scope.config.isTodo = false;
            $scope.config.isDone = false;
            $scope.config.isApply = false;
            switch (funType) {
                case 'todo':
                    $scope.config.isTodo = true;
                    $scope.config.viewTitle = '未审批';
                    break;
                case 'done':
                    $scope.config.isDone = true;
                    $scope.config.viewTitle = '已审批';
                    break;
                case 'apply':
                    $scope.config.isApply = true;
                    $scope.config.viewTitle = '我的申请';
                    break;
            }
            ;

            if (headerId) {
                __queryDetailInfo(headerId, workflowCategory);
            }
            if (insId) {
                __queryApproveRecord(insId);
            }
        };

        __init();

    }]);


hec.controller('WflDocFlowController', [
    '$scope',
    'WflDetailService',
    '$stateParams',
    function ($scope, wflDetailS, $stateParams) {

        // $scope.datas.approveFlowsOld
        // $scope.datas.approveFlows
        function __initFlowsDatas() {
            var datas = $scope.datas.approveFlowsOld;
            $scope.datas.approveFlows = [];
            for (var i = 0; i < datas.length; i++) {
                if (datas[i].br_used) {
                    continue;
                }
                ;
                var node = {
                    ins_id: datas[i].ins_id,
                    node_id: datas[i].node_id,
                    node_seq: datas[i].node_seq,
                    node_approve_type: datas[i].node_approve_type,
                    node_name: datas[i].node_name,
                    ins_preview_ins_status: datas[i].ins_preview_ins_status,
                    node_status_desc: __getStatusDesc(datas[i].ins_preview_ins_status),
                    nodeApprovers: [],
                    isApproved: datas[i].ins_preview_ins_status == 'APPROVED' ? true : false,
                    isCurrent: datas[i].ins_preview_ins_status == 'CURRENT' ? true : false,
                    isWaiting: datas[i].ins_preview_ins_status == 'WAITING' ? true : false
                };
                var nodeApprove = __getNodeApprove(datas[i]);
                node.nodeApprovers.push(nodeApprove);
                for (var j = i + 1; j < datas.length; j++) {
                    if (datas[j].br_used) {
                        continue;
                    }
                    ;
                    if (node.node_seq == datas[j].node_seq) {
                        datas[j].br_used = true;
                        if (datas[j].ins_preview_ins_status == 'CURRENT') {
                            node.isApproved = false;
                            node.isCurrent = true;
                        }
                        ;
                        node.nodeApprovers.push(__getNodeApprove(datas[j]));
                    }
                    ;
                }
                ;
                $scope.datas.approveFlows.push(node);
            }
            ;
            var tempJ;
            for (var j = 0; j < $scope.datas.approveFlows.length; j++) {
                var data = $scope.datas.approveFlows[j];
                if (data.isCurrent) {
                    var items = data.nodeApprovers;
                    var approvedItems = [];
                    var watingItems = [];
                    for (var n = 0; n < items.length; n++) {
                        if (items[n].approve_action && items[n].approve_date) {
                            approvedItems.push(angular.copy(items[n]));
                        } else {
                            watingItems.push(angular.copy(items[n]));
                        }
                        ;
                    }
                    ;
                    if (approvedItems.length > 0) {
                        var approvedCopyData = angular.copy(data);
                        approvedCopyData.isApproved = true;
                        approvedCopyData.isCurrent = false;
                        approvedCopyData.node_status_desc = __getStatusDesc('APPROVED');
                        approvedCopyData.nodeApprovers = approvedItems;
                        var currentCopyData = angular.copy(data);
                        currentCopyData.isApproved = false;
                        currentCopyData.isCurrent = true;
                        currentCopyData.node_status_desc = __getStatusDesc('CURRENT');
                        currentCopyData.nodeApprovers = watingItems;
                        var before = angular.copy($scope.datas.approveFlows.slice(0, j));
                        var after = angular.copy($scope.datas.approveFlows.slice(j + 1));
                        $scope.datas.approveFlows = [];
                        $scope.datas.approveFlows = $scope.datas.approveFlows.concat(before);
                        $scope.datas.approveFlows.push(approvedCopyData);
                        $scope.datas.approveFlows.push(currentCopyData);
                        $scope.datas.approveFlows = $scope.datas.approveFlows.concat(after);
                    }
                    ;
                    break;
                }
                ;
                tempJ = j;
            }
            ;
        };

        function __getNodeApprove(nodeapprove) {
            return {
                approve_action: nodeapprove.approve_action,
                approve_date: nodeapprove.approve_date,
                approve_emp_id: nodeapprove.approve_emp_id,
                approve_emp_name: nodeapprove.approve_emp_name,
                approve_opinion: nodeapprove.approve_opinion
            };
        };

        // APPROVED,CURRENT,WAITING
        function __getStatusDesc(status) {
            var desc = '';
            switch (status) {
                case 'APPROVED':
                    desc = "已审批";
                    break;
                case 'CURRENT':
                    desc = "审批中";
                    break;
                case 'WAITING':
                    desc = "待审批";
                    break;
            }
            ;
            return desc;
        };

        function __getWorkflowPreview(ins_id) {
            $scope.config.loaindFlowNode = true;
            wflDetailS
                .initDocFlowPreview({para: [{ins_id: ins_id, _status: 'execute'}]})
                .then(function (resp) {
                    if (resp.response.success) {
                        __queryWorkflowPreview(ins_id);
                    }
                });
        };

        function __queryWorkflowPreview(ins_id) {
            wflDetailS
                .queryDocFlowPreview({para: {ins_id: ins_id}})
                .then(function (resp) {
                    if (resp.data) {
                        $scope.datas.approveFlowsOld = resp.data;
                        __initFlowsDatas();
                        $scope.config.loaindFlowNode = false;
                        $scope.datas.approveFlowsOld = [];
                    }
                });
        };


        function __init() {
            //var ins_id = $scope.config.insId;
            var ins_id = $stateParams.ins_id;
            __getWorkflowPreview(ins_id);
        };

        __init();

    }]);


hec.controller('WflDocAttachmentController', [
    '$scope',
    'HecService',
    'WflDetailService',
    '$stateParams',
    '$ionicPopup',
    function ($scope, HecService, wflDetailS, $stateParams, $ionicPopup) {

        $scope.datas.attachments = [];

        function __initAttachmentsDatas(option) {
            wflDetailS
                .queryAttachments(option)
                .then(function (resp) {
                    $scope.datas.attachments = resp.data;
                });
        };

        $scope.atmDownload = function (item) {
            var showConfirm = $ionicPopup.confirm({
                title: '提示',
                template: '是否下载此附件查看?',
                cancelText: '取消',
                okText: '确定'
            });
            showConfirm.then(function (resp) {
                if (resp) {
                    var url = HecService.getUrl('atm_download');
                    window.location.href = url + '?attachment_id=' + item.attachment_id;
                }
            });
        }

        function __init() {
            var opt = {
                para: {
                    exp_rep_type_desc: $stateParams.exp_rep_type_desc,
                    exp_rep_hd_id: $stateParams.exp_rep_hd_id
                }
            }
            __initAttachmentsDatas(opt);
        };

        __init();

    }]);


