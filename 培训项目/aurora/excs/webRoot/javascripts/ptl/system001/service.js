/**
 * Created by mouse on 2015-5-22.
 */

var system001Service = angular.module('system001Service', ['ui.bootstrap.modal']);

system001Service.controller('auMessageCtrl', ['$scope', '$modalInstance', 'opt', function ($scope, $modalInstance, opt) {
    $scope.messageInfo = opt;

    $scope.ok = function () {
        $modalInstance.close();
    }

    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    }
}]).factory('auMessage', ['$modal', function ($modal) {

    var showInfo = function (opt) {
        var modalInstance = $modal.open({
            templateUrl: '../ptl_portal/template/ptl/system001/info_message.html',
            controller: 'auMessageCtrl',
            size: 'lg',
            resolve: {
                opt: function () {
                    return opt;
                }
            },
            animation: false
        });
    }

    var showConfirm = function (opt) {
        var modalInstance = $modal.open({
            templateUrl: '../ptl_portal/template/ptl/system001/info_message.html',
            controller: 'auMessageCtrl',
            size: 'lg',
            resolve: {
                opt: function () {
                    return opt;
                }
            },
            animation: false
        });
    }

    return function (opt) {
        if (opt.messageType === 'info') {
            showInfo(opt);
        } else if (opt.messageType === 'confirm') {
            showConfirm(opt);
        }
    }

}]).factory('auHttp', ['$http', '$q', '$filter', 'auMessage', function ($http, $q, $filter, auMessage) {
    return {
        request: function (opt) {
            var delay = $q.defer();
            $http.post(opt.url, "_request_data=" + encodeURIComponent($filter('json')({parameter: opt.para})), {headers: {"Content-Type": "application/x-www-form-urlencoded"}}).success(function (data, status, headers, config) {
                if (data.success) {
                    delay.resolve({
                        data: data,
                        status: status,
                        headers: headers,
                        config: config
                    });
                } else {
                    auMessage({
                        messageType: 'info',
                        title: '错误',
                        message: data.error.message
                    });
                    delay.reject({
                        data: data,
                        status: status,
                        headers: headers,
                        config: config
                    });
                }
            }).error(function (data, status, headers, config) {
                auMessage({
                    messageType: 'info',
                    title: '错误',
                    message: '请求失败!'
                });

                delay.reject({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            });

            return delay.promise;
        }
    }
}]).factory('newsService', ['auHttp', function (auHttp) {
    return {
        queryNews: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: {
                    portal_id: opt.portal_id,
                    element_code: opt.element_code
                }
            });
        },
        queryMoreNews: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_more_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: {
                    announcement_type_id: opt.announcement_type_id
                }
            });
        }
    }
}]).factory('linkService', ['auHttp', function (auHttp) {
    return {
        queryLink: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_link_query/query?pagesize=' + ( opt.pagesize || 20) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: {
                    portal_id: opt.portal_id,
                    element_code: opt.element_code
                }
            });
        }
    }
}]).factory('shortcutService', ['auHttp', function (auHttp) {
    return {
        queryShortcut: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_shortcut_query/query?pagesize=' + ( opt.pagesize || 20) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: {
                    portal_id: opt.portal_id,
                    element_code: opt.element_code
                }
            });
        }
    }
}]).factory('todoService', ['auHttp', function (auHttp) {
    return {
    	queryFieldList: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_element_dynamic_fields_query/query?pagesize=' + 100 + '&pagenum=' + 1 + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: {
                	portal_id: opt.portal_id,
                    element_code: opt.element_code
                }
            });
        },
        queryTodoList: function (opt) {
            return auHttp.request({
                url: '../autocrud/wfl.wfl_workflow_instance_for_todo_for_ptl/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true')
            });
        },
        approve: function (opt) {
            return auHttp.request({
                url: '../autocrud/wfl.wfl_back_instance/update',
                para: {
                    status_code: 1,
                    record_id: opt.record_id,
                    comment_text: opt.comment_text
                }
            });
        },
        refuse: function (opt) {
            return auHttp.request({
                url: '../autocrud/wfl.wfl_back_instance/update',
                para: {
                    status_code: -1,
                    record_id: opt.record_id,
                    comment_text: opt.comment_text
                }
            });
        }
    }
}]).factory('notifylistService', ['auHttp', function (auHttp) {
    return {
    	queryNotiFieldList: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_element_dynamic_fields_query/query?pagesize=' + 100 + '&pagenum=' + 1 + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: {
                	portal_id: opt.portal_id,
                    element_code: opt.element_code
                }
            });
        },
        queryNotifyList: function (opt) {
            return auHttp.request({
                url: '../autocrud/wfl.wfl_workflow_notification_list_for_ptl/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true')
            });
        }
    }
}]).factory('donelistService', ['auHttp', function (auHttp) {
    return {
    	queryDoneFieldList: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_element_dynamic_fields_query/query?pagesize=' + 100 + '&pagenum=' + 1 + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: {
                	portal_id: opt.portal_id,
                    element_code: opt.element_code
                }
            });
        },
        queryDoneList: function (opt) {
            return auHttp.request({
                url: '../autocrud/wfl.WFL5130.wfl_finish_instance_query_for_ptl/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true')
            });
        }
    }
}]).factory('fieldService', ['auHttp', function (auHttp) {
    return {
        queryDonelist: function (opt) {
            return auHttp.request({
                url: '../autocrud/wfl.WFL5130.wfl_finish_instance_query_for_ptl/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true')
            });
        }
    }
}]).factory('indexService', function () {
    return {
        initIndexArray: function (currentIndex, minIndex, maxIndex, indexRange) {
            currentIndex = parseInt(currentIndex);
            minIndex = parseInt(minIndex);
            maxIndex = parseInt(maxIndex);
            indexRange = parseInt(indexRange);
            var frontGap = Math.floor(indexRange / 2);
            var backGap = Math.ceil(indexRange / 2);

            var startIndex = ((currentIndex - frontGap) >= minIndex) ? (((maxIndex - minIndex + 1 - indexRange) > frontGap) ? (currentIndex - frontGap) : ((((currentIndex + backGap) > maxIndex ? maxIndex : (currentIndex + backGap)) - indexRange + 1) < minIndex ) ? minIndex : (((currentIndex + backGap) > maxIndex ? maxIndex : (currentIndex + backGap)) - indexRange + 1)) : minIndex;
            var endIndex = (startIndex + indexRange - 1) >= maxIndex ? maxIndex : (startIndex + indexRange - 1);

            var indexArray = [];
            for (var i = startIndex; i <= endIndex; i++) {
                indexArray.push(i);
            }
            return indexArray;
        }
    };
}).factory('loginService', ['auHttp', function (auHttp) {
    return {
        login: function (opt) {
            return auHttp.request({
                url: '../login.svc?user_name=' + opt.user_name + '&user_password=' + opt.user_password + '&user_language=' + opt.user_language
            });
        },
        roleSelect: function (opt) {
            return auHttp.request({
                url: '../role_select.svc?role_id=' + opt.role_id + '&company_id=' + opt.company_id
            });
        },
        queryRole: function (opt) {
            return auHttp.request({
                url: '../autocrud/sys.sys_user_role_groups/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'true') + '&_autocount=' + (opt.autocount || 'true')
            });
        },
        queryDefaultRole: function (opt) {
            return auHttp.request({
                url: '../autocrud/sys.sys_user_last_login_info/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'true') + '&_autocount=' + (opt.autocount || 'true')
            });
        },
        logout: function (opt) {
            return auHttp.request({
                url: '../logout.svc'
            });
        }
    }
}]).factory('imageLinkService', ['auHttp', function (auHttp) {
    return {
        queryImageLink: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_image_link_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'true') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        }
    }
}]).factory('userDefineService', ['auHttp', function (auHttp) {
    return {
        queryUserDefine: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_user_define_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'true') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        }
    }
}]).factory('menuService',['auHttp',function(auHttp){
    return {
        queryMenu : function(){
            return auHttp.request({
                url: '../modules/ptl/public/ptl_sys_function_query.svc'
            });
        }
    }
}]).factory('wflService',['auHttp',function(auHttp){
    return {
        queryWfl : function(opt){
            return auHttp.request({
            	url: '../autocrud/ptl.ptl_panel_wfl_list_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
            	para: {
                	portal_id: opt.portal_id,
                    element_code: opt.element_code
                }
            });
        }
    }
}]);