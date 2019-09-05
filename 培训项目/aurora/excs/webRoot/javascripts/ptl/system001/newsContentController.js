/**
 * Created by mouse on 2015-6-23.
 */
var system001NewsController = angular.module('system001NewsController', ['ui.bootstrap.modal', 'system001Service', 'system001Controller', 'system001NewsService']);

system001NewsController.controller('commentNewsCtrl', ['$scope', '$modalInstance', 'newsOperationService', 'opt', function ($scope, $modalInstance, newsOperationService, opt) {

    $scope.commentInfo = {
        title: '评论公告',
        announcementId: opt.announcementId
    }

    $scope.closeCommentNews = function () {
        $modalInstance.close();
    }

    $scope.publishComment = function () {
        newsOperationService.commentNews({
            commentText: $scope.commentInfo.commentText,
            announcementId: $scope.commentInfo.announcementId
        });

        $scope.closeCommentNews();
    }
}])
    .controller('newsOperationCtrl', ['$scope', '$q', '$modal', 'newsOperationService', function ($scope, $q, $modal, newsOperationService) {

        $scope.announcementId = '';
        $scope.markFlag = false;


        $scope.getMarkStr = function () {
            if ($scope.markFlag == true) {
                return '取消收藏';
            } else {
                return '收藏';
            }
        }

        $scope.toggleMark = function () {
            var delay = $q.defer();
            newsOperationService.toggleMark({
                announcementId: $scope.announcementId
            }).then(function (resp) {
                $scope.markFlag = !$scope.markFlag;
            });
        }

        $scope.openCommentNews = function (opt) {
            var modalInstance = $modal.open({
                templateUrl: '../ptl_portal/template/ptl/system001/comment_news.html',
                controller: 'commentNewsCtrl',
                size: 'lg',
                resolve: {
                    opt: function () {
                        return {
                            announcementId: $scope.announcementId
                        };
                    }
                },
                animation: false
            });
        }

        $scope.closeWindow = function () {
            window.close();
        }

        $scope.openMoreInfo = function () {
            var modalInstance = $modal.open({
                templateUrl: '../ptl_portal/template/ptl/system001/more_info.html',
                controller: 'moreInfoCtrl',
                size: 'lg',
                resolve: {
                    opt: function () {
                        return {
                            announcementId: $scope.announcementId,
                            mainInfo: newsOperationService.queryMainInfo({
                                announcement_id: $scope.announcementId,
                                _fetchall: true
                            }),
                            privilege: newsOperationService.queryPrivilege({
                                announcement_id: $scope.announcementId,
                                _fetchall: true
                            }),
                            attachment: newsOperationService.queryAttachment({
                                announcement_id: $scope.announcementId,
                                _fetchall: true
                            }),
                            workflow: newsOperationService.queryWorkflow({
                                announcement_id: $scope.announcementId,
                                _fetchall: true
                            }),
                            comment: newsOperationService.queryComment({
                                announcement_id: $scope.announcementId,
                                _fetchall: true
                            }),
                            readInfo: newsOperationService.queryReadRecord({
                                announcement_id: $scope.announcementId,
                                _fetchall: true
                            })
                        };
                    }
                },
                animation: false
            });
        }

    }]).directive('markNews', function () {
        return {
            template: '<span class="btn btn-small btn-default">{{getMarkStr()}}</span>',
            link: function ($scope, element, attrs) {
                if (attrs.markFlag == 'Y') {
                    $scope.markFlag = true;
                } else {
                    $scope.markFlag = false;
                }

                $scope.announcementId = attrs.announcementId;
            }
        }
    }).directive('commentNews', function () {
        return {
            template: '<span class="btn btn-small btn-default">评论</span>',
            link: function ($scope, element, attrs) {
                $scope.announcementId = attrs.announcementId;
            }
        }
    }).directive('closeWindow', function () {
        return {
            template: '<span class="btn btn-small btn-default">关闭</span>'
        }
    }).controller('moreInfoCtrl', ['$scope', '$q', '$modalInstance', 'opt', 'newsOperationService', function ($scope, $q, $modalInstance, opt, newsOperationService) {

        $scope.moreInfo = {
            title: '更多信息',
            announcementId: opt.announcementId
        }

        opt.mainInfo.then(function (resp) {
            if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                if (resp.data.result.record) {
                    if (resp.data.result.record.length) {
                        $scope.mainInfo = resp.data.result.record[0];
                    } else {
                        $scope.mainInfo = resp.data.result.record;
                    }

                    newsOperationService.queryImage({
                        announcement_id: $scope.moreInfo.announcementId,
                        _fetchall: true
                    }).then(function (resp) {
                        if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                            if (resp.data.result.record) {
                                if (resp.data.result.record.length) {
                                    $scope.mainInfo.imageList = resp.data.result.record;
                                } else {
                                    $scope.mainInfo.imageList = [];
                                    $scope.mainInfo.imageList.push(resp.data.result.record);
                                }
                            }
                        }
                    });
                }
            }
        });

        opt.privilege.then(function (resp) {
            if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                if (resp.data.result.record) {
                    if (resp.data.result.record.length) {
                        $scope.privilege = resp.data.result.record;
                    } else {
                        $scope.privilege = [];
                        $scope.privilege.push(resp.data.result.record);
                    }
                }
            }
        });

        opt.attachment.then(function (resp) {
            if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                if (resp.data.result.record) {
                    if (resp.data.result.record.length) {
                        $scope.attachment = resp.data.result.record;
                    } else {
                        $scope.attachment = [];
                        $scope.attachment.push(resp.data.result.record);
                    }
                }
            }
        });

        opt.workflow.then(function (resp) {
            if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                if (resp.data.result.record) {
                    if (resp.data.result.record.length) {
                        $scope.workflow = resp.data.result.record;
                    } else {
                        $scope.workflow = [];
                        $scope.workflow.push(resp.data.result.record);
                    }
                }
            }
        });

        opt.comment.then(function (resp) {
            if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                if (resp.data.result.record) {
                    if (resp.data.result.record.length) {
                        $scope.comment = resp.data.result.record;
                    } else {
                        $scope.comment = [];
                        $scope.comment.push(resp.data.result.record);
                    }
                }
            }
        });

        opt.readInfo.then(function (resp) {
            if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                if (resp.data.result.record) {
                    if (resp.data.result.record.length) {
                        $scope.readInfo = resp.data.result.record;
                    } else {
                        $scope.readInfo = [];
                        $scope.readInfo.push(resp.data.result.record);
                    }
                }
            }
        });

        $scope.closeMoreInfo = function () {
            $modalInstance.close();
        }
    }]).directive('moreInfo', function () {
        return {
            template: '<span class="btn btn-small btn-default">更多信息</span>',
            link: function ($scope, element, attrs) {
                $scope.announcementId = attrs.announcementId;
            }
        }
    }).controller('wordNewsController',['$scope',function($scope){

    }]).directive(
    'wordNews', ['$timeout',
        function ($timeout) {
            return {
                templateUrl: function (element, attrs) {
                    return '../ptl_word/'
                        + attrs.wordAttachmentId + '/' + attrs.wordAttachmentId
                        + '.html';
                },
                link: function ($scope,element,attrs){
                    $scope.$on('renderFinished',function(renderFinishedEvent){
                        var imgs = $('p>span>img');
                        for(var i = 0; i < imgs.length; i ++){
                            var align = $(imgs[i]).parent().parent()[0].align;
                            if(align == 'left'){
                                $(imgs[i]).css('display','block');
                                $(imgs[i]).css('margin-left','0');
                            }else if(align == 'center'){
                                $(imgs[i]).css('display','block');
                                $(imgs[i]).css('margin-left','auto');
                                $(imgs[i]).css('margin-right','auto');
                            }else if(align == 'right'){
                                $(imgs[i]).css('display','block');
                                $(imgs[i]).css('margin-right','0');
                            }
                        }
                    });

                    $timeout(function () {
                        $scope.$emit('renderFinished');
                    });
                }
            }
        }])
    .controller(
    'newsMorePanelCtrl',
    [
        '$scope', '$q',
        'indexService',
        'newsService',
        function ($scope, $q, indexService, newsService) {
            $scope.newsMorePanel = {
                announcementTypeId: '',
                pagesize: '',
                pagenum: '',
                currentIndex: '',
                indexList: [],
                maxIndex: '',
                minIndex: '',
                indexRange: '',
                preIndex: '',
                nextIndex: '',
                preEnable: '',
                nextEnable: '',
                newsList: []
            };

            $scope.newsMorePanelHeight = $(window).height() - 175;
            $scope.autoComputePageSize = Math.floor(($scope.newsMorePanelHeight - 20) / 37);
            $scope.newsMorePanel.pagesize = $scope.autoComputePageSize;

            $scope.queryMoreNews = function (pagenum) {
                if (!pagenum) {
                    return;
                }
                var delay = $q.defer();

                $scope.newsMorePanel.pagenum = pagenum;
                newsService.queryMoreNews({
                    announcement_type_id: $scope.newsMorePanel.announcementTypeId,
                    pagesize: $scope.newsMorePanel.pagesize,
                    pagenum: $scope.newsMorePanel.pagenum
                }).then(
                    function (resp) {
                        if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                            if (resp.data.result.record) {
                                if (resp.data.result.record.length) {
                                    $scope.newsMorePanel.newsList = resp.data.result.record;
                                } else if (!resp.data.result.record.length) {
                                    $scope.newsMorePanel.newsList = [];
                                    $scope.newsMorePanel.newsList.push(resp.data.result.record);
                                }

                                $scope.newsMorePanel.maxIndex = Math.ceil(resp.data.result.totalCount / $scope.newsMorePanel.pagesize);
                                $scope.newsMorePanel.minIndex = 1;
                                $scope.newsMorePanel.currentIndex = $scope.newsMorePanel.pagenum;
                                $scope.newsMorePanel.indexList = indexService.initIndexArray($scope.newsMorePanel.currentIndex, $scope.newsMorePanel.minIndex, $scope.newsMorePanel.maxIndex, $scope.newsMorePanel.indexRange);

                                $scope.newsMorePanel.preIndex = (($scope.newsMorePanel.currentIndex - 1) >= $scope.newsMorePanel.minIndex ) ? ($scope.newsMorePanel.currentIndex - 1) : '';
                                $scope.newsMorePanel.preEnable = (($scope.newsMorePanel.currentIndex - 1) >= $scope.newsMorePanel.minIndex ) ? true : false;

                                $scope.newsMorePanel.nextIndex = (($scope.newsMorePanel.currentIndex + 1) <= $scope.newsMorePanel.maxIndex ) ? ($scope.newsMorePanel.currentIndex + 1) : '';
                                $scope.newsMorePanel.nextEnable = (($scope.newsMorePanel.currentIndex + 1) <= $scope.newsMorePanel.maxIndex ) ? true : false;

                                delay.resolve();
                            } else {
                                var pagenum = Math.ceil(resp.data.result.totalCount / $scope.newsMorePanel.pagesize);
                                $scope.queryMoreNews(pagenum);
                            }
                        } else {
                            $scope.newsMorePanel.newsList = [];
                            $scope.newsMorePanel.maxIndex = 0;
                            $scope.newsMorePanel.minIndex = 0;
                            $scope.newsMorePanel.currentIndex = 0;
                            $scope.newsMorePanel.indexList = [];
                            $scope.newsMorePanel.preIndex = 0;
                            $scope.newsMorePanel.preEnable = false;
                            $scope.newsMorePanel.nextIndex = 0;
                            $scope.newsMorePanel.nextEnable = false;
                            delay.reject();
                        }
                    },
                    function (resp) {
                        $scope.newsMorePanel.newsList = [];
                        $scope.newsMorePanel.maxIndex = 0;
                        $scope.newsMorePanel.minIndex = 0;
                        $scope.newsMorePanel.currentIndex = 0;
                        $scope.newsMorePanel.indexList = [];
                        $scope.newsMorePanel.preIndex = 0;
                        $scope.newsMorePanel.preEnable = false;
                        $scope.newsMorePanel.nextIndex = 0;
                        $scope.newsMorePanel.nextEnable = false;
                    }
                );

                return delay.promise;
            }

        }])
    .directive('newsMorePanel', function () {
        return {
            templateUrl: './template/ptl/system001/news_more_panel.html',
            link: function ($scope, element, attrs) {
                $scope.newsMorePanel.indexRange = attrs.indexRange || 10;
                $scope.newsMorePanel.announcementTypeId = attrs.announcementTypeId;
                $scope.queryMoreNews(1);
            }
        }
    }).controller('newsAttachmentPanelCtrl', ['$scope', 'newsOperationService', function ($scope, newsOperationService) {
        $scope.newsAttachmentPanel = {
            announcementId: '',
            attachmentList: []
        }

        $scope.queryAttachment = function () {
            newsOperationService.queryAttachment({
                announcement_id: $scope.newsAttachmentPanel.announcementId,
                _fetchall: true
            }).then(function (resp) {
                if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                    if (resp.data.result.record) {
                        if (resp.data.result.record.length) {
                            $scope.newsAttachmentPanel.attachmentList = resp.data.result.record;
                        } else {
                            $scope.newsAttachmentPanel.attachmentList = [];
                            $scope.newsAttachmentPanel.attachmentList.push(resp.data.result.record);
                        }
                    }
                }
            });
        }
    }]).directive('newsAttachmentPanel', function () {
        return {
            templateUrl: './template/ptl/system001/news_attachment_panel.html',
            link: function ($scope, element, attrs) {
                $scope.newsAttachmentPanel.announcementId = attrs.announcementId;
                $scope.queryAttachment();
            }
        }
    }).controller('newsQueryResultPanelCtrl', ['$scope', 'indexService', 'newsQueryService', function ($scope, indexService, newsQueryService) {
        $scope.newsQueryResultPanel = {
            pagesize: '',
            pagenum: '',
            currentIndex: '',
            indexList: [],
            maxIndex: '',
            minIndex: '',
            indexRange: '',
            preIndex: '',
            nextIndex: '',
            preEnable: '',
            nextEnable: '',
            newsList: []
        };

        $scope.newsQueryResultPanelHeight = $(window).height() - 320;
        $scope.autoComputePageSize = Math.floor(($scope.newsQueryResultPanelHeight - 20) / 37);
        $scope.newsQueryResultPanel.pagesize = $scope.autoComputePageSize;

        $scope.titleSearchFlag = true;
        $scope.tagSearchFlag = true;
        $scope.authorSearchFlag = false;
        $scope.summarizeSearchFlag = false;
        $scope.keywords = '';

        $scope.executeQuery = function () {
            newsQueryService.executeQuery({
                title_search_flag: $scope.titleSearchFlag ? 'Y' : 'N',
                tag_search_flag: $scope.tagSearchFlag ? 'Y' : 'N',
                author_search_flag: $scope.authorSearchFlag ? 'Y' : 'N',
                summarize_search_flag: $scope.summarizeSearchFlag ? 'Y' : 'N',
                keywords: $scope.keywords
            }).then(function (resp) {
                $scope.queryResult(1);
            });
        }

        $scope.queryResult = function (pagenum) {
            if (!pagenum) {
                return;
            }

            $scope.newsQueryResultPanel.pagenum = pagenum;
            newsQueryService.queryResult({
                pagesize: $scope.newsQueryResultPanel.pagesize,
                pagenum: $scope.newsQueryResultPanel.pagenum
            }).then(
                function (resp) {
                    if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                        if (resp.data.result.record) {
                            if (resp.data.result.record.length) {
                                $scope.newsQueryResultPanel.newsList = resp.data.result.record;
                            } else if (!resp.data.result.record.length) {
                                $scope.newsQueryResultPanel.newsList = [];
                                $scope.newsQueryResultPanel.newsList.push(resp.data.result.record);
                            }

                            $scope.newsQueryResultPanel.maxIndex = Math.ceil(resp.data.result.totalCount / $scope.newsQueryResultPanel.pagesize);
                            $scope.newsQueryResultPanel.minIndex = 1;
                            $scope.newsQueryResultPanel.currentIndex = $scope.newsQueryResultPanel.pagenum;
                            $scope.newsQueryResultPanel.indexList = indexService.initIndexArray($scope.newsQueryResultPanel.currentIndex, $scope.newsQueryResultPanel.minIndex, $scope.newsQueryResultPanel.maxIndex, $scope.newsQueryResultPanel.indexRange);

                            $scope.newsQueryResultPanel.preIndex = (($scope.newsQueryResultPanel.currentIndex - 1) >= $scope.newsQueryResultPanel.minIndex ) ? ($scope.newsQueryResultPanel.currentIndex - 1) : '';
                            $scope.newsQueryResultPanel.preEnable = (($scope.newsQueryResultPanel.currentIndex - 1) >= $scope.newsQueryResultPanel.minIndex ) ? true : false;

                            $scope.newsQueryResultPanel.nextIndex = (($scope.newsQueryResultPanel.currentIndex + 1) <= $scope.newsQueryResultPanel.maxIndex ) ? ($scope.newsQueryResultPanel.currentIndex + 1) : '';
                            $scope.newsQueryResultPanel.nextEnable = (($scope.newsQueryResultPanel.currentIndex + 1) <= $scope.newsQueryResultPanel.maxIndex ) ? true : false;

                        } else {
                            var pagenum = Math.ceil(resp.data.result.totalCount / $scope.newsQueryResultPanel.pagesize);
                            $scope.queryMoreNews(pagenum);
                        }
                    } else {
                        $scope.newsQueryResultPanel.newsList = [];
                        $scope.newsQueryResultPanel.maxIndex = 0;
                        $scope.newsQueryResultPanel.minIndex = 0;
                        $scope.newsQueryResultPanel.currentIndex = 0;
                        $scope.newsQueryResultPanel.indexList = [];
                        $scope.newsQueryResultPanel.preIndex = 0;
                        $scope.newsQueryResultPanel.preEnable = false;
                        $scope.newsQueryResultPanel.nextIndex = 0;
                        $scope.newsQueryResultPanel.nextEnable = false;
                    }
                },
                function (resp) {
                    $scope.newsQueryResultPanel.newsList = [];
                    $scope.newsQueryResultPanel.maxIndex = 0;
                    $scope.newsQueryResultPanel.minIndex = 0;
                    $scope.newsQueryResultPanel.currentIndex = 0;
                    $scope.newsQueryResultPanel.indexList = [];
                    $scope.newsQueryResultPanel.preIndex = 0;
                    $scope.newsQueryResultPanel.preEnable = false;
                    $scope.newsQueryResultPanel.nextIndex = 0;
                    $scope.newsQueryResultPanel.nextEnable = false;
                }
            );
        }
    }]).directive('newsQueryResultPanel', function () {
        return {
            templateUrl: './template/ptl/system001/news_query_result_panel.html',
            link: function ($scope, element, attrs) {
                $scope.newsQueryResultPanel.indexRange = attrs.indexRange || 10;
            }
        }
    }).controller('newsMarkListPanelCtrl', ['$scope', 'indexService', 'newsMarkService', function ($scope, indexService, newsMarkService) {
        $scope.newsMarkListPanel = {
            pagesize: '',
            pagenum: '',
            currentIndex: '',
            indexList: [],
            maxIndex: '',
            minIndex: '',
            indexRange: '',
            preIndex: '',
            nextIndex: '',
            preEnable: '',
            nextEnable: '',
            newsList: []
        };

        $scope.newsMarkListPanelHeight = $(window).height() - 255;
        $scope.autoComputePageSize = Math.floor(($scope.newsMarkListPanelHeight - 20) / 37);
        $scope.newsMarkListPanel.pagesize = $scope.autoComputePageSize;

        $scope.titleSearchFlag = true;
        $scope.tagSearchFlag = true;
        $scope.authorSearchFlag = false;
        $scope.summarizeSearchFlag = false;
        $scope.keywords = '';

        $scope.queryMarkList = function (pagenum) {
            if (!pagenum) {
                return;
            }

            $scope.newsMarkListPanel.pagenum = pagenum;
            newsMarkService.queryMarkList({
                pagesize: $scope.newsMarkListPanel.pagesize,
                pagenum: $scope.newsMarkListPanel.pagenum
            }).then(
                function (resp) {
                    if (resp.data && resp.data.result && resp.data.result.totalCount && resp.data.result.totalCount != 0) {
                        if (resp.data.result.record) {
                            if (resp.data.result.record.length) {
                                $scope.newsMarkListPanel.newsList = resp.data.result.record;
                            } else if (!resp.data.result.record.length) {
                                $scope.newsMarkListPanel.newsList = [];
                                $scope.newsMarkListPanel.newsList.push(resp.data.result.record);
                            }

                            $scope.newsMarkListPanel.maxIndex = Math.ceil(resp.data.result.totalCount / $scope.newsMarkListPanel.pagesize);
                            $scope.newsMarkListPanel.minIndex = 1;
                            $scope.newsMarkListPanel.currentIndex = $scope.newsMarkListPanel.pagenum;
                            $scope.newsMarkListPanel.indexList = indexService.initIndexArray($scope.newsMarkListPanel.currentIndex, $scope.newsMarkListPanel.minIndex, $scope.newsMarkListPanel.maxIndex, $scope.newsMarkListPanel.indexRange);

                            $scope.newsMarkListPanel.preIndex = (($scope.newsMarkListPanel.currentIndex - 1) >= $scope.newsMarkListPanel.minIndex ) ? ($scope.newsMarkListPanel.currentIndex - 1) : '';
                            $scope.newsMarkListPanel.preEnable = (($scope.newsMarkListPanel.currentIndex - 1) >= $scope.newsMarkListPanel.minIndex ) ? true : false;

                            $scope.newsMarkListPanel.nextIndex = (($scope.newsMarkListPanel.currentIndex + 1) <= $scope.newsMarkListPanel.maxIndex ) ? ($scope.newsMarkListPanel.currentIndex + 1) : '';
                            $scope.newsMarkListPanel.nextEnable = (($scope.newsMarkListPanel.currentIndex + 1) <= $scope.newsMarkListPanel.maxIndex ) ? true : false;

                        } else {
                            var pagenum = Math.ceil(resp.data.result.totalCount / $scope.newsMarkListPanel.pagesize);
                            $scope.queryMoreNews(pagenum);
                        }
                    } else {
                        $scope.newsMarkListPanel.newsList = [];
                        $scope.newsMarkListPanel.maxIndex = 0;
                        $scope.newsMarkListPanel.minIndex = 0;
                        $scope.newsMarkListPanel.currentIndex = 0;
                        $scope.newsMarkListPanel.indexList = [];
                        $scope.newsMarkListPanel.preIndex = 0;
                        $scope.newsMarkListPanel.preEnable = false;
                        $scope.newsMarkListPanel.nextIndex = 0;
                        $scope.newsMarkListPanel.nextEnable = false;
                    }
                },
                function (resp) {
                    $scope.newsMarkListPanel.newsList = [];
                    $scope.newsMarkListPanel.maxIndex = 0;
                    $scope.newsMarkListPanel.minIndex = 0;
                    $scope.newsMarkListPanel.currentIndex = 0;
                    $scope.newsMarkListPanel.indexList = [];
                    $scope.newsMarkListPanel.preIndex = 0;
                    $scope.newsMarkListPanel.preEnable = false;
                    $scope.newsMarkListPanel.nextIndex = 0;
                    $scope.newsMarkListPanel.nextEnable = false;
                }
            );
        }
    }]).directive('newsMarkListPanel', function () {
        return {
            templateUrl: './template/ptl/system001/news_mark_list_panel.html',
            link: function ($scope, element, attrs) {
                $scope.newsMarkListPanel.indexRange = attrs.indexRange || 10;
                $scope.queryMarkList(1);
            }
        }
    });