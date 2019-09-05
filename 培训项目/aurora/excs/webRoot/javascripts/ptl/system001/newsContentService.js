/**
 * Created by mouse on 2015-6-23.
 */
var system001NewsService = angular.module('system001NewsService', ['ui.bootstrap.modal', 'system001Service']);

system001NewsService.factory('newsOperationService', ['auHttp', function (auHttp) {
    return {
        toggleMark: function (opt) {
            return auHttp.request({
                url: '../autocrud/db.ptl_announcement_pkg.toggle_annoucement_mark/execute',
                para: {
                    announcement_id: opt.announcementId
                }
            });
        },
        commentNews: function (opt) {
            return auHttp.request({
                url: '../autocrud/db.ptl_announcement_pkg.comment_announcement/execute',
                para: {
                    comment_text: opt.commentText,
                    announcement_id: opt.announcementId
                }
            });
        },
        queryMainInfo: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_info_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        },
        queryPrivilege: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_privilege_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        },
        queryAttachment: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_attachment_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        },
        queryWorkflow: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_workflow_approve_record_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        },
        queryComment: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_comment_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        },
        queryReadRecord: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_read_records_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        },
        queryImage: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_image_query/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true'),
                para: opt
            });
        }
    }
}]).factory('newsQueryService', ['auHttp', function (auHttp) {
    return {
        executeQuery: function (opt) {
            return auHttp.request({
                url: '../autocrud/db.ptl_query_pkg.execute_query/execute',
                para: {
                    keywords: opt.keywords,
                    title_search_flag: opt.title_search_flag,
                    tag_search_flag: opt.tag_search_flag,
                    author_search_flag: opt.author_search_flag,
                    summarize_search_flag: opt.summarize_search_flag
                }
            });
        },
        queryResult: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_query_result/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true')
            });
        }
    }
}]).factory('newsMarkService', ['auHttp', function (auHttp) {
    return {
        queryMarkList: function (opt) {
            return auHttp.request({
                url: '../autocrud/ptl.ptl_announcement_mark_list/query?pagesize=' + ( opt.pagesize || 10) + '&pagenum=' + (opt.pagenum || 1) + '&_fetchall=' + (opt._fetchall || 'false') + '&_autocount=' + (opt.autocount || 'true')
            })
        }
    }
}]);