/**
 * Created by mouse on 2015-5-22.
 */
var system001Controller = angular.module('system001Controller', [ 'ngCookies',
		'system001Service' ]);

system001Controller
		.controller(
				'rollingNewsPanelCtrl',
				[
						'$scope',
						'$q',
						'newsService',
						function($scope, $q, newsService) {
							$scope.rollingPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								rollingItems : [],
								pagesize : ''
							}

							$scope.loadNews = function() {
								var delay = $q.defer();
								newsService
										.queryNews(
												{
													portal_id : $scope.rollingPanel.portalId,
													element_code : $scope.rollingPanel.elementCode,
													pagesize : $scope.rollingPanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.rollingPanel.rollingItems = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															$scope.rollingPanel.rollingItems = [];
															$scope.rollingPanel.rollingItems
																	.push(resp.data.result.record);
														}
														delay
																.resolve($scope.rollingPanel.rollingItems.length);
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}
						} ])
		.directive(
				'rollingNewsPanel',
				[
						'$timeout',
						function($timeout) {
							return {
								templateUrl : './template/ptl/system001/rolling_news_panel.html',
								link : function($scope, element, attrs) {
									$scope.rollingPanel.portalId = attrs.portalId;
									$scope.rollingPanel.elementCode = attrs.elementCode;
									$scope.rollingPanel.elementTitle = attrs.elementTitle;
									$scope.rollingPanel.pagesize = attrs.pagesize;

									$scope.$on('renderFinished', function(
											renderFinishedEvent) {

										$('#' + attrs.elementCode).carousel({
											interval : 5000,
											pause : 'hover',
											animate : false
										});

										$('#' + attrs.elementCode).carousel(
												'next');
									});

									$scope
											.loadNews()
											.then(
													function(totalCount) {
														if (totalCount
																&& totalCount != 0) {
															$timeout(function() {
																$scope
																		.$emit('renderFinished');
															});
														}
													});
								}
							}
						} ])
		.controller(
				'middleRollingNewsPanelCtrl',
				[
						'$scope',
						'$q',
						'newsService',
						function($scope, $q, newsService) {
							$scope.rollingPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								rollingItems : [],
								pagesize : ''
							}

							$scope.loadNews = function() {
								var delay = $q.defer();
								newsService
										.queryNews(
												{
													portal_id : $scope.rollingPanel.portalId,
													element_code : $scope.rollingPanel.elementCode,
													pagesize : $scope.rollingPanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.rollingPanel.rollingItems = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															$scope.rollingPanel.rollingItems = [];
															$scope.rollingPanel.rollingItems
																	.push(resp.data.result.record);
														}
														delay
																.resolve($scope.rollingPanel.rollingItems.length);
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}
						} ])
		.directive(
				'middleRollingNewsPanel',
				[
						'$timeout',
						function($timeout) {
							return {
								templateUrl : './template/ptl/system001/middle_rolling_news_panel.html',
								link : function($scope, element, attrs) {
									$scope.rollingPanel.portalId = attrs.portalId;
									$scope.rollingPanel.elementCode = attrs.elementCode;
									$scope.rollingPanel.elementTitle = attrs.elementTitle;
									$scope.rollingPanel.pagesize = attrs.pagesize;
									$scope.rollingPanel.imgcol = attrs.imgcol;
									$scope.rollingPanel.imgWidth = 28 + (parseInt(attrs.imgcol) - 1) * 80;
									$scope.rollingPanel.announcementTypeId = attrs.announcementTypeId;

									$scope.$on('renderFinished', function(
											renderFinishedEvent) {

										$('#' + attrs.elementCode).carousel({
											interval : 5000,
											pause : 'hover'
										});

										$('#' + attrs.elementCode).carousel(
												'next');
									});

									$scope
											.loadNews()
											.then(
													function(totalCount) {
														if (totalCount
																&& totalCount != 0) {
															$timeout(function() {
																$scope
																		.$emit('renderFinished');
															});
														}
													});
								}
							}
						} ])
		.controller(
				'rollingNewsListPanelCtrl',
				[
						'$scope',
						'$q',
						'newsService',
						function($scope, $q, newsService) {
							$scope.rollingPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								rollingItems : [],
								newsItems : [],
								imageNewsMappping : {},
								pagesize : ''
							}

							$scope.loadNews = function() {
								var delay = $q.defer();
								newsService
										.queryNews(
												{
													portal_id : $scope.rollingPanel.portalId,
													element_code : $scope.rollingPanel.elementCode,
													pagesize : $scope.rollingPanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.rollingPanel.newsItems = resp.data.result.record;
															$scope.rollingPanel.rollingItems = [];
															var j = 0;
															for (var i = 0; i < $scope.rollingPanel.newsItems.length; i++) {
																if ($scope.rollingPanel.newsItems[i].cover_rolling_image_att_id) {
																	$scope.rollingPanel.rollingItems[j] = $scope.rollingPanel.newsItems[i];
																	$scope.rollingPanel.imageNewsMappping[i] = j;
																	j++;
																}
															}
														} else if (!resp.data.result.record.length) {
															$scope.rollingPanel.newsItems = [];
															$scope.rollingPanel.rollingItems = [];
															$scope.rollingPanel.newsItems
																	.push(resp.data.result.record);
															if ($scope.rollingPanel.newsItems[0].cover_rolling_image_att_id) {
																$scope.rollingPanel.rollingItems
																		.push(resp.data.result.record);
																$scope.rollingPanel.imageNewsMappping[0] = 0;
															}
														}
														delay
																.resolve($scope.rollingPanel.rollingItems.length);
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}

							$scope.slideTo = function(index) {
								$('#' + $scope.rollingPanel.elementCode)
										.carousel(index);
							}
						} ])
		.directive(
				'rollingNewsListPanel',
				[
						'$timeout',
						function($timeout) {
							return {
								templateUrl : './template/ptl/system001/rolling_news_list_panel.html',
								link : function($scope, element, attrs) {
									$scope.rollingPanel.portalId = attrs.portalId;
									$scope.rollingPanel.elementCode = attrs.elementCode;
									$scope.rollingPanel.elementTitle = attrs.elementTitle;
									$scope.rollingPanel.pagesize = attrs.pagesize;
									$scope.rollingPanel.announcementTypeId = attrs.announcementTypeId;
									$scope.rollingPanel.imgcol = parseInt(attrs.imgcol);

									if ($scope.rollingPanel.imgcol < 6) {
										$scope.rollingPanel.newsListWidth = 0;
									} else {
										$scope.rollingPanel.newsListWidth = 85 + ($scope.rollingPanel.imgcol - 6) * 85;
									}

									$scope.$on('renderFinished', function(
											renderFinishedEvent) {

										$('#' + attrs.elementCode).carousel({
											interval : 5000,
											pause : 'hover'
										});

										$('#' + attrs.elementCode).carousel(
												'next');
									});

									$scope
											.loadNews()
											.then(
													function(totalCount) {
														if (totalCount
																&& totalCount != 0) {
															$timeout(function() {
																$scope
																		.$emit('renderFinished');
															});
														}
													});
								}
							}
						} ])
		.controller(
				'personNewsPanelCtrl',
				[
						'$scope',
						'$q',
						'newsService',
						function($scope, $q, newsService) {
							$scope.personNewsPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								personList : [],
								pagesize : ''
							};

							$scope.loadNews = function() {
								var delay = $q.defer();
								newsService
										.queryNews(
												{
													portal_id : $scope.personNewsPanel.portalId,
													element_code : $scope.personNewsPanel.elementCode,
													pagesize : $scope.personNewsPanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.personNewsPanel.personList = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															$scope.personNewsPanel.personList = [];
															$scope.personNewsPanel.personList
																	.push(resp.data.result.record);
														}
														delay.resolve();
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}
						} ])
		.directive(
				'personNewsPanel',
				function() {
					return {
						templateUrl : './template/ptl/system001/person_news_panel.html',
						link : function($scope, element, attrs) {
							$scope.personNewsPanel.portalId = attrs.portalId;
							$scope.personNewsPanel.elementCode = attrs.elementCode;
							$scope.personNewsPanel.elementTitle = attrs.elementTitle;
							$scope.personNewsPanel.imgcol = attrs.imgcol;
							$scope.personNewsPanel.announcementTypeId = attrs.announcementTypeId;
							if (attrs.imgcol == 1) {
								$scope.personNewsPanel.personContentWidth = 0;
								$scope.personNewsPanel.personImageWidth = 0;
								$scope.personNewsPanel.pagesize = 0;
							} else if (attrs.imgcol == 2) {
								$scope.personNewsPanel.personContentWidth = 108;
								$scope.personNewsPanel.personImageWidth = 90;
								$scope.personNewsPanel.pagesize = 2;
							} else if (attrs.imgcol == 3) {
								$scope.personNewsPanel.personContentWidth = 94;
								$scope.personNewsPanel.personImageWidth = 80;
								$scope.personNewsPanel.pagesize = 4;
							} else if (attrs.imgcol == 4) {
								$scope.personNewsPanel.personContentWidth = 134;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 4;
							} else if (attrs.imgcol == 5) {
								$scope.personNewsPanel.personContentWidth = 116;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 6;
							} else if (attrs.imgcol == 6) {
								$scope.personNewsPanel.personContentWidth = 142;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 6;
							} else if (attrs.imgcol == 7) {
								$scope.personNewsPanel.personContentWidth = 169;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 6;
							} else if (attrs.imgcol == 8) {
								$scope.personNewsPanel.personContentWidth = 147;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 8;
							} else if (attrs.imgcol == 9) {
								$scope.personNewsPanel.personContentWidth = 167;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 8;
							} else if (attrs.imgcol == 10) {
								$scope.personNewsPanel.personContentWidth = 149;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 10;
							} else if (attrs.imgcol == 11) {
								$scope.personNewsPanel.personContentWidth = 138;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 12;
							} else if (attrs.imgcol == 12) {
								$scope.personNewsPanel.personContentWidth = 151;
								$scope.personNewsPanel.personImageWidth = 100;
								$scope.personNewsPanel.pagesize = 12;
							}
							$scope.loadNews();
						}
					}
				})
		.controller(
				'simpleNewsPanelCtrl',
				[
						'$scope',
						'$q',
						'newsService',
						function($scope, $q, newsService) {
							$scope.simpleNewsPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								newsList : [],
								pagesize : ''
							};

							$scope.loadNews = function() {
								var delay = $q.defer();
								newsService
										.queryNews(
												{
													portal_id : $scope.simpleNewsPanel.portalId,
													element_code : $scope.simpleNewsPanel.elementCode,
													pagesize : $scope.simpleNewsPanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.simpleNewsPanel.newsList = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															$scope.simpleNewsPanel.newsList = [];
															$scope.simpleNewsPanel.newsList
																	.push(resp.data.result.record);
														}
														delay.resolve();
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}

						} ])
		.directive(
				'simpleNewsPanel',
				function() {
					return {
						templateUrl : './template/ptl/system001/simple_news_panel.html',
						link : function($scope, element, attrs) {
							$scope.simpleNewsPanel.portalId = attrs.portalId;
							$scope.simpleNewsPanel.elementCode = attrs.elementCode;
							$scope.simpleNewsPanel.elementTitle = attrs.elementTitle;
							$scope.simpleNewsPanel.pagesize = attrs.pagesize;
							$scope.simpleNewsPanel.announcementTypeId = attrs.announcementTypeId;
							$scope.loadNews();
						}
					}
				})
		.controller(
				'accordionPanelCtrl',
				[
						'$scope',
						'$q',
						'newsService',
						function($scope, $q, newsService) {
							$scope.accordionPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								newsList : [],
								pagesize : ''
							};

							$scope.loadNews = function() {
								var delay = $q.defer();
								newsService
										.queryNews(
												{
													portal_id : $scope.accordionPanel.portalId,
													element_code : $scope.accordionPanel.elementCode,
													pagesize : $scope.accordionPanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.accordionPanel.newsList = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															$scope.accordionPanel.newsList = [];
															$scope.accordionPanel.newsList
																	.push(resp.data.result.record);
														}
														delay.resolve();
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}

						} ])
		.directive(
				'accordionPanel',
				function() {
					return {
						templateUrl : './template/ptl/system001/accordion_panel.html',
						link : function($scope, element, attrs) {
							$scope.accordionPanel.portalId = attrs.portalId;
							$scope.accordionPanel.elementCode = attrs.elementCode;
							$scope.accordionPanel.elementTitle = attrs.elementTitle;
							$scope.accordionPanel.pagesize = attrs.pagesize;
							$scope.accordionPanel.announcementTypeId = attrs.announcementTypeId;
							$scope.loadNews();
						}
					}
				})
		.controller(
				'newsPanelCtrl',
				[
						'$scope',
						'$q',
						'newsService',
						function($scope, $q, newsService) {
							$scope.newsPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								currentAnnouncementTypeId : '',
								newsCategories : []
							};

							$scope.loadNews = function(newsListItem) {
								var delay = $q.defer();
								newsService
										.queryNews(
												{
													portal_id : newsListItem.portalId,
													element_code : newsListItem.elementCode,
													pagesize : newsListItem.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															newsListItem['newsList'] = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															newsListItem['newsList'] = [];
															newsListItem['newsList']
																	.push(resp.data.result.record);
														}
														delay.resolve();
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}

							$scope.setCurrentAnnouncementType = function(
									announcementTypeId) {
								$scope.newsPanel.currentAnnouncementTypeId = announcementTypeId;
							}
						} ])
		.directive(
				'newsPanel',
				function() {
					return {
						templateUrl : './template/ptl/system001/news_panel.html',
						transclude : true,
						controller : function($scope) {
							this.addNewsList = function(newsListItem) {
								if ($scope.newsPanel.newsCategories.length == 0) {
									$scope
											.setCurrentAnnouncementType(newsListItem.announcementTypeId);
								}
								$scope.newsPanel.newsCategories
										.push(newsListItem);
								$scope.loadNews(newsListItem);
							}
						},
						link : function($scope, element, attrs) {
							$scope.newsPanel.portalId = attrs.portalId;
							$scope.newsPanel.elementCode = attrs.elementCode;
							$scope.newsPanel.elementTitle = attrs.elementTitle;
						}
					}
				})
		.directive('newsList', function() {
			return {
				require : '^newsPanel',
				template : '',
				link : function($scope, element, attrs, panelScope) {
					var newsListItem = {
						portalId : attrs.portalId,
						elementCode : attrs.elementCode,
						elementTitle : attrs.elementTitle,
						announcementTypeId : attrs.announcementTypeId,
						pagesize : attrs.pagesize
					};
					panelScope.addNewsList(newsListItem);
				}
			}
		})
		.controller(
				'shortcutPanelCtrl',
				[
						'$scope',
						'$q',
						'shortcutService',
						function($scope, $q, shortcutService) {
							$scope.shortcutPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								shortcutList : [],
								pagesize : ''
							};

							$scope.queryShortcut = function() {
								var delay = $q.defer();

								shortcutService
										.queryShortcut(
												{
													portal_id : $scope.shortcutPanel.portalId,
													element_code : $scope.shortcutPanel.elementCode,
													pagesize : $scope.shortcutPanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.shortcutPanel.shortcutList = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															$scope.shortcutPanel.shortcutList = [];
															$scope.shortcutPanel.shortcutList
																	.push(resp.data.result.record);
														}
														delay.reject();
													} else {
														delay.resolve();
													}
												});

								return delay.promise;
							}
						} ])
		.directive('shortcutPanel', function() {
			return {
				templateUrl : './template/ptl/system001/shortcut_panel.html',
				link : function($scope, element, attrs) {
					$scope.shortcutPanel.portalId = attrs.portalId;
					$scope.shortcutPanel.elementCode = attrs.elementCode;
					$scope.shortcutPanel.elementTitle = attrs.elementTitle;
					$scope.shortcutPanel.pagesize = attrs.pagesize;
					$scope.queryShortcut();
				}
			}
		})
		.controller(
				'linkPanelCtrl',
				[
						'$scope',
						'$q',
						'linkService',
						function($scope, $q, linkService) {
							$scope.linkPanel = {
								portalId : '',
								elementTitle : '',
								elementCode : '',
								links : [],
								pagesize : ''
							}

							$scope.queryLinks = function() {
								var delay = $q.defer();
								linkService
										.queryLink(
												{
													portal_id : $scope.linkPanel.portalId,
													element_code : $scope.linkPanel.elementCode,
													pagesize : $scope.linkPanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.linkPanel.links = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															$scope.linkPanel.links = [];
															$scope.linkPanel.links
																	.push(resp.data.result.record);
														}
														delay.resolve();
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}
						} ])
		.directive('linkPanel', function() {
			return {
				templateUrl : './template/ptl/system001/link_panel.html',
				link : function($scope, element, attrs) {
					$scope.linkPanel.portalId = attrs.portalId;
					$scope.linkPanel.elementTitle = attrs.elementTitle;
					$scope.linkPanel.elementCode = attrs.elementCode;
					$scope.linkPanel.pagesize = attrs.pagesize;
					$scope.queryLinks();
				}
			}
		})
		.controller(
				'marqueePanelCtrl',
				[
						'$scope',
						'$q',
						'newsService',
						function($scope, $q, newsService) {
							$scope.marqueePanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								marquees : [],
								pagesize : ''
							};

							$scope.loadNews = function() {
								var delay = $q.defer();
								newsService
										.queryNews(
												{
													portal_id : $scope.marqueePanel.portalId,
													element_code : $scope.marqueePanel.elementCode,
													pagesize : $scope.marqueePanel.pagesize
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.marqueePanel.marquees = resp.data.result.record;
														} else if (!resp.data.result.record.length) {
															$scope.marqueePanel.marquees = [];
															$scope.marqueePanel.marquees
																	.push(resp.data.result.record);
														}
														delay.resolve();
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}
						} ])
		.directive('marqueePanel', function() {
			return {
				templateUrl : './template/ptl/system001/marquee_panel.html',
				link : function($scope, element, attrs) {
					$scope.marqueePanel.portalId = attrs.portalId;
					$scope.marqueePanel.elementCode = attrs.elementCode;
					$scope.marqueePanel.elementTitle = attrs.elementTitle;
					$scope.marqueePanel.pagesize = attrs.pagesize;
					$scope.loadNews();
				}
			}
		})
		.controller(
				'headerCtrl',
				[
						'$scope',
						'$modal',
						'loginService',
						function($scope, $modal, loginService) {

							$scope.jumpMain = function() {
								var aw = window.screen.availWidth;
								var ah = window.screen.availHeight;
								var jsid = document.cookie['JSID'];
								if (navigator.userAgent.toLowerCase().match(
										/chrome\/([\d.]+)/)) {
									ah = ah - 60;
								} else {
									ah = ah - 20;
								}
								window
										.open(
												'../main.screen',
												jsid,
												"left=0,top=0,width="
														+ aw
														+ ",height="
														+ ah
														+ ",status=0,toolbar=0,menubar=0,location=0,scrollbars=0,resizable=0",
												false);
							}

							$scope.logout = function() {
								loginService.logout().then(function(resp) {
									window.location.reload();
								});
							}

							$scope.login = function() {
								var modalInstance = $modal
										.open({
											templateUrl : '../ptl_portal/template/ptl/system001/login_panel.html',
											controller : 'loginPanelCtrl',
											size : 'lg',
											resolve : {
												opt : function() {
													return {}
												}
											},
											animation : false
										});
							}
						} ])
		.controller(
				'loginPanelCtrl',
				[
						'$scope',
						'$q',
						'$modalInstance',
						'$cookieStore',
						'loginService',
						function($scope, $q, $modalInstance, $cookieStore,
								loginService) {

							$scope.title = '登陆';

							$scope.user_name = '';
							$scope.user_password = '';
							$scope.user_language = 'ZHS';
							$scope.role_company = '';

							$scope.showLoginFlag = true;
							$scope.showRoleSelectFlag = false;

							$scope.usernameErrorClass = '';
							$scope.usernameErrorPrompt = '';
							$scope.passwordErrorClass = '';
							$scope.passwordErrorPrompt = '';
							$scope.roleCompanyErrorClass = '';
							$scope.roleCompanyErrorPrompt = '';
							$scope.quickLoginFlag = 'N';

							$scope.roleCompanyList = [];

							$scope.confirmLogin = function() {

								var validateStatus = true;
								if (!$scope.user_name) {
									validateStatus = false;
									$scope.usernameErrorClass = 'error';
									$scope.usernameErrorPrompt = '用户名不能为空';
								} else {
									$scope.usernameErrorClass = '';
									$scope.usernameErrorPrompt = '';
								}

								if (!$scope.user_password) {
									validateStatus = false;
									$scope.passwordErrorClass = 'error';
									$scope.passwordErrorPrompt = '密码不能为空';
								} else {
									$scope.passwordErrorClass = '';
									$scope.passwordErrorPrompt = '';
								}

								if (validateStatus) {
									loginService
											.login(
													{
														user_name : $scope.user_name,
														user_password : $scope.user_password,
														user_language : $scope.user_language
													})
											.then(
													function() {
														loginService
																.queryDefaultRole(
																		{})
																.then(
																		function(
																				roleResp) {
																			if (roleResp.data
																					&& roleResp.data.result
																					&& roleResp.data.result.record) {
																				$scope.defaultRoleCompanyName = roleResp.data.result.record.role_company_name;
																			}
																			loginService
																					.queryRole(
																							{
																								_fetchall : true
																							})
																					.then(
																							function(
																									resp) {
																								if (resp.data
																										&& resp.data.result
																										&& resp.data.result.record) {
																									if (resp.data.result.record.length) {
																										$scope.roleCompanyList = [];
																										for (var i = 0; i < resp.data.result.record.length; i++) {
																											if ($scope.defaultRoleCompanyName == resp.data.result.record[i].role_company_name) {
																												resp.data.result.record[i].defaultFlag = true;
																											} else {
																												resp.data.result.record[i].defaultFlag = false;
																											}
																											$scope.roleCompanyList
																													.push(resp.data.result.record[i]);
																											$scope.role_company = resp.data.result.record[i].role_company_id;
																										}
																									} else if (!resp.data.result.record.length) {
																										$scope.roleCompanyList = [];
																										if ($scope.defaultRoleCompanyName == resp.data.result.record.role_company_name) {
																											resp.data.result.record.defaultFlag = true;

																										} else {
																											resp.data.result.record.defaultFlag = false;
																										}
																										$scope.roleCompanyList
																												.push(resp.data.result.record);
																										$scope.role_company = resp.data.result.record.role_company_id;
																										$scope.quickLoginFlag = 'Y';
																									}

																									$scope.showLoginFlag = false;
																									$scope.showRoleSelectFlag = true;
																									$scope.title = '角色选择';

																									if ($scope.quickLoginFlag == 'Y') {
																										$scope
																												.confirmRoleSelect();
																									}
																								}
																							})
																		})
													});
								}
							}

							$scope.confirmRoleSelect = function() {
								var validateStatus = true;
								if (!$scope.role_company) {
									validateStatus = false;
									$scope.roleCompanyErrorClass = 'error';
									$scope.roleCompanyErrorPrompt = '用户名不能为空';
								} else {
									$scope.roleCompanyErrorClass = '';
									$scope.roleCompanyErrorPrompt = '';
								}

								if (validateStatus) {
									var roleId = $scope.role_company.split('-')[0];
									var companyId = $scope.role_company
											.split('-')[1];

									loginService.roleSelect({
										role_id : roleId,
										company_id : companyId
									}).then(function(resp) {
										window.location.reload();
									});
								}
							}

							$scope.enterLoginKeyup = function(e) {
								var keycode = window.event ? e.keyCode
										: e.which;
								if (keycode == 13) {
									$scope.confirmLogin();
								}
							}

							$scope.cancelLogin = function() {
								loginService.logout().then(function(resp) {
									$scope.close();
								});
							}

							$scope.close = function() {
								$modalInstance.close();
							}
						} ])
		.controller(
				'imageLinkCtrl',
				[
						'$scope',
						'imageLinkService',
						function($scope, imageLinkService) {
							$scope.imageLink = {
								portalId : '',
								elementCode : '',
								attachment_id : '',
								image_title : '',
								image_width : '',
								image_height : '',
								link_url : '',
								link_type : ''
							}
							$scope.queryImageLink = function() {
								imageLinkService
										.queryImageLink(
												{
													portal_id : $scope.imageLink.portalId,
													element_code : $scope.imageLink.elementCode
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.imageLink.attachment_id = resp.data.result.record[0].attachment_id;
															$scope.imageLink.image_title = resp.data.result.record[0].image_title;
															$scope.imageLink.image_width = resp.data.result.record[0].image_width;
															$scope.imageLink.image_height = resp.data.result.record[0].image_height;
															$scope.imageLink.link_url = resp.data.result.record[0].link_url;
															$scope.imageLink.link_type = resp.data.result.record[0].link_type;
														} else if (!resp.data.result.record.length) {
															$scope.imageLink.attachment_id = resp.data.result.record.attachment_id;
															$scope.imageLink.image_title = resp.data.result.record.image_title;
															$scope.imageLink.image_width = resp.data.result.record.image_width;
															$scope.imageLink.image_height = resp.data.result.record.image_height;
															$scope.imageLink.link_url = resp.data.result.record.link_url;
															$scope.imageLink.link_type = resp.data.result.record.link_type;
														}
													}
												});
							}

							$scope.getLinkUrl = function() {
								if ($scope.imageLink.link_type == 'NONE') {
									return '#';
								} else {
									return $scope.imageLink.link_url;
								}
							}
						} ])
		.directive(
				'imageLink',
				function() {
					return {
						templateUrl : '../ptl_portal/template/ptl/system001/image_link.html',
						link : function($scope, element, attrs) {
							$scope.imageLink.portalId = attrs.portalId;
							$scope.imageLink.elementCode = attrs.elementCode;
							$scope.queryImageLink();
						}
					}
				})
		.controller(
				'userDefineCtrl',
				[
						'$scope',
						'$q',
						'userDefineService',
						function($scope, $q, userDefineService) {
							$scope.userDefine = {
								portalId : '',
								elementTitle : '',
								elementCode : '',
								height : '',
								html_content : ''
							};

							$scope.queryUserDefine = function(element) {
								var delay = $q.defer();
								userDefineService
										.queryUserDefine(
												{
													portal_id : $scope.userDefine.portalId,
													element_code : $scope.userDefine.elementCode
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length) {
															$scope.userDefine.height = resp.data.result.record[0].height;
															$scope.userDefine.html_content = resp.data.result.record[0].html_content;
														} else if (!resp.data.result.record.length) {
															$scope.userDefine.height = resp.data.result.record.height;
															$scope.userDefine.html_content = resp.data.result.record.html_content;
														}
														delay.resolve({
															$scope : $scope,
															element : element
														});
													}
												});

								return delay.promise;
							}
						} ])
		.directive(
				'userDefine',
				function() {
					return {
						templateUrl : '../ptl_portal/template/ptl/system001/user_define.html',
						link : function($scope, element, attrs) {
							$scope.userDefine.portalId = attrs.portalId;
							$scope.userDefine.elementCode = attrs.elementCode;
							$scope.userDefine.elementTitle = attrs.elementTitle;
							$scope
									.queryUserDefine(element)
									.then(
											function(promise) {
												$(promise.element[0])
														.find(
																'#'
																		+ attrs.elementCode)
														.append(
																$($scope.userDefine.html_content));
											});
						}
					}
				})
		.controller(
				'menuPanelCtrl',
				[
						'$scope',
						'menuService',
						function($scope, menuService) {
							$scope.menuPanel = {
								main_menu : []
							}

							$scope.queryMenu = function() {
								menuService
										.queryMenu()
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.record) {
														if (resp.data.result.record.length
																&& resp.data.result.record.length != 0) {
															$scope.menuPanel.main_menu = resp.data.result.record;
														}
														$scope.menuPanel.menu_level1_length = $scope.menuPanel.main_menu.length;
													}

													if ($scope.menuPanel.main_menu.length
															&& $scope.menuPanel.main_menu.length > 0) {
														$('.menu-level1')
																.addClass(
																		'menu-show')
																.removeClass(
																		'menu-hide');
													} else {
														$('.menu-level1')
																.addClass(
																		'menu-hide')
																.removeClass(
																		'menu-show');
													}
												});
							}

							$scope.jumpFun = function(serviceName) {
								var aw = window.screen.availWidth;
								var ah = window.screen.availHeight;
								var jsid = document.cookie['JSID'];
								if (navigator.userAgent.toLowerCase().match(
										/chrome\/([\d.]+)/)) {
									ah = ah - 60;
								} else {
									ah = ah - 20;
								}
								window
										.open(
												'../' + serviceName,
												jsid,
												"left=0,top=0,width="
														+ aw
														+ ",height="
														+ ah
														+ ",status=0,toolbar=0,menubar=0,location=0,scrollbars=0,resizable=0",
												false);
							}

						} ])
		.directive(
				'menuPanel',
				function() {
					return {
						templateUrl : '../ptl_portal/template/ptl/system001/menu_panel.html',
						link : function($scope, element, attrs) {
							$scope.queryMenu();
						}
					}
				})
		.controller(
				'wflPanelCtrl',
				[
						'$scope',
						'$q',
						'$interval',
						'wflService',
						'todoService',
						'notifylistService',
						'donelistService',
						'indexService',
						function($scope, $q, $interval, wflService, todoService,
								notifylistService, donelistService,
								indexService) {
							$scope.wflPanel = {
								portalId : '',
								elementCode : '',
								elementTitle : '',
								wflCategories : [],
								elementTitleTodo : '',
								elementCodeTodo : '',
								totalCountTodo : '',
								todolist : [],
								pagesizeTodo : '',
								pagenumTodo : '',
								currentIndexTodo : '',
								indexListTodo : [],
								maxIndexTodo : '',
								minIndexTodo : '',
								indexRangeTodo : '',
								preIndexTodo : '',
								nextIndexTodo : '',
								preEnableTodo : '',
								nextEnableTodo : '',
								fieldlistTodo : [],

								elementTitleNoti : '',
								elementCodeNoti : '',
								totalCountNoti : '',
								notifylist : [],
								pagesizeNoti : '',
								pagenumNoti : '',
								currentIndexNoti : '',
								indexListNoti : [],
								maxIndexNoti : '',
								minIndexNoti : '',
								indexRangeNoti : '',
								preIndexNoti : '',
								nextIndexNoti : '',
								preEnableNoti : '',
								nextEnableNoti : '',
								fieldlistNoti : [],

								elementTitleDone : '',
								elementCodeDone : '',
								totalCountDone : '',
								donelist : [],
								pagesizeDone : '',
								pagenumDone : '',
								currentIndexDone : '',
								indexListDone : [],
								maxIndexDone : '',
								minIndexDone : '',
								indexRangeDone : '',
								preIndexDone : '',
								nextIndexDone : '',
								preEnableDone : '',
								nextEnableDone : '',
								fieldlistDone : []
							}
							$scope.queryFieldListTodo = function() {

								var delay = $q.defer();
								todoService
										.queryFieldList(
												{
													portal_id : $scope.wflPanel.portalId,
													element_code : $scope.wflPanel.elementCodeTodo
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.totalCount
															&& resp.data.result.totalCount != 0) {
														if (resp.data.result.record) {
															if (resp.data.result.record.length) {
																$scope.wflPanel.fieldlistTodo = resp.data.result.record;
															} else if (!resp.data.result.record.length) {
																$scope.wflPanel.fieldlistTodo = [];
																$scope.wflPanel.fieldlistTodo
																		.push(resp.data.result.record);
															}
															delay.resolve();
														} else {
															$scope
																	.queryFieldListTodo();
														}
													} else {
														delay.reject();
													}
												});
								return delay.promise;
							}

							$scope.queryTodoList = function(pagenum) {
								if (!pagenum) {
									return;
								}
								var delay = $q.defer();

								$scope.wflPanel.pagenumTodo = pagenum;

								todoService
										.queryTodoList(
												{
													pagesize : $scope.wflPanel.pagesizeTodo,
													pagenum : $scope.wflPanel.pagenumTodo
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.totalCount
															&& resp.data.result.totalCount != 0) {
														if (resp.data.result.record) {
															if (resp.data.result.record.length) {
																$scope.wflPanel.todolist = resp.data.result.record;
															} else if (!resp.data.result.record.length) {
																$scope.wflPanel.todolist = [];
																$scope.wflPanel.todolist
																		.push(resp.data.result.record);
															}
															$scope.wflPanel.totalCountTodo = resp.data.result.totalCount;
															$scope.setCount();
															$scope.wflPanel.maxIndexTodo = Math
																	.ceil(resp.data.result.totalCount
																			/ $scope.wflPanel.pagesizeTodo);
															$scope.wflPanel.minIndexTodo = 1;
															$scope.wflPanel.currentIndexTodo = $scope.wflPanel.pagenumTodo;
															$scope.wflPanel.indexListTodo = indexService
																	.initIndexArray(
																			$scope.wflPanel.currentIndexTodo,
																			$scope.wflPanel.minIndexTodo,
																			$scope.wflPanel.maxIndexTodo,
																			$scope.wflPanel.indexRangeTodo);

															$scope.wflPanel.preIndexTodo = (($scope.wflPanel.currentIndexTodo - 1) >= $scope.wflPanel.minIndexTodo) ? ($scope.wflPanel.currentIndexTodo - 1)
																	: '';
															$scope.wflPanel.preEnableTodo = (($scope.wflPanel.currentIndexTodo - 1) >= $scope.wflPanel.minIndexTodo) ? true
																	: false;

															$scope.wflPanel.nextIndexTodo = (($scope.wflPanel.currentIndexTodo + 1) <= $scope.wflPanel.maxIndexTodo) ? ($scope.wflPanel.currentIndexTodo + 1)
																	: '';
															$scope.wflPanel.nextEnableTodo = (($scope.wflPanel.currentIndexTodo + 1) <= $scope.wflPanel.maxIndexTodo) ? true
																	: false;
															delay.resolve();
														} else {
															var pagenum = Math
																	.ceil(resp.data.result.totalCount
																			/ $scope.wflPanel.pagesizeTodo);
															$scope.wflPanel.totalCountTodo = resp.data.result.totalCount;
															$scope
																	.queryTodoList(pagenum);
														}
													} else {
														delay.reject();
													}
												});
								return delay.promise;
							}

							$scope.approveWithoutOpinion = function(recordId) {
								todoService
										.approve({
											record_id : recordId,
											comment_text : ''
										})
										.then(
												function(resp) {
													$scope
															.queryTodoList($scope.wflPanel.currentIndexTodo);
												});
							}

							$scope.queryFieldListNoti = function() {
								var delay = $q.defer();

								notifylistService
										.queryNotiFieldList(
												{
													portal_id : $scope.wflPanel.portalId,
													element_code : $scope.wflPanel.elementCodeNoti
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.totalCount
															&& resp.data.result.totalCount != 0) {
														if (resp.data.result.record) {
															if (resp.data.result.record.length) {
																$scope.wflPanel.fieldlistNoti = resp.data.result.record;
															} else if (!resp.data.result.record.length) {
																$scope.wflPanel.fieldlistNoti = [];
																$scope.wflPanel.fieldlistNoti
																		.push(resp.data.result.record);
															}
															delay.resolve();
														} else {
															$scope
																	.queryNotiFieldList();
														}
													} else {
														delay.reject();
													}
												});
								return delay.promise;
							}

							$scope.queryNotifyList = function(pagenum) {
								if (!pagenum) {
									return;
								}
								var delay = $q.defer();
								$scope.wflPanel.pagenumNoti = pagenum;
								notifylistService
										.queryNotifyList(
												{
													pagesize : $scope.wflPanel.pagesizeNoti,
													pagenum : $scope.wflPanel.pagenumNoti
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.totalCount
															&& resp.data.result.totalCount != 0) {
														if (resp.data.result.record) {
															if (resp.data.result.record.length) {
																$scope.wflPanel.notifylist = resp.data.result.record;
															} else if (!resp.data.result.record.length) {
																$scope.wflPanel.notifylist = [];
																$scope.wflPanel.notifylist
																		.push(resp.data.result.record);
															}
															$scope.wflPanel.totalCountNoti = resp.data.result.totalCount;
															$scope.setCount();
															$scope.wflPanel.maxIndexNoti = Math
																	.ceil(resp.data.result.totalCount
																			/ $scope.wflPanel.pagesizeNoti);
															$scope.wflPanel.minIndexNoti = 1;
															$scope.wflPanel.currentIndexNoti = $scope.wflPanel.pagenumNoti;
															$scope.wflPanel.indexListNoti = indexService
																	.initIndexArray(
																			$scope.wflPanel.currentIndexNoti,
																			$scope.wflPanel.minIndexNoti,
																			$scope.wflPanel.maxIndexNoti,
																			$scope.wflPanel.indexRangeNoti);

															$scope.wflPanel.preIndexNoti = (($scope.wflPanel.currentIndexNoti - 1) >= $scope.wflPanel.minIndexNoti) ? ($scope.wflPanel.currentIndexNoti - 1)
																	: '';
															$scope.wflPanel.preEnableNoti = (($scope.wflPanel.currentIndexNoti - 1) >= $scope.wflPanel.minIndexNoti) ? true
																	: false;

															$scope.wflPanel.nextIndexNoti = (($scope.wflPanel.currentIndexNoti + 1) <= $scope.wflPanel.maxIndexNoti) ? ($scope.wflPanel.currentIndexNoti + 1)
																	: '';
															$scope.wflPanel.nextEnableNoti = (($scope.wflPanel.currentIndexNoti + 1) <= $scope.wflPanel.maxIndexNoti) ? true
																	: false;

															delay.resolve();
														} else {
															var pagenum = Math
																	.ceil(resp.data.result.totalCount
																			/ $scope.wflPanel.pagesizeNoti);
															$scope.wflPanel.totalCountNoti = resp.data.result.totalCount;
															$scope
																	.queryNotifyList(pagenum);
														}
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}

							$scope.queryFieldListDone = function() {
								var delay = $q.defer();
								donelistService
										.queryDoneFieldList(
												{
													portal_id : $scope.wflPanel.portalId,
													element_code : $scope.wflPanel.elementCodeDone
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.totalCount
															&& resp.data.result.totalCount != 0) {
														if (resp.data.result.record) {
															if (resp.data.result.record.length) {
																$scope.wflPanel.fieldlistDone = resp.data.result.record;
															} else if (!resp.data.result.record.length) {
																$scope.wflPanel.fieldlistDone = [];
																$scope.wflPanel.fieldlistDone
																		.push(resp.data.result.record);
															}
															delay.resolve();
														} else {
															$scope
																	.queryDoneFieldList();
														}
													} else {
														delay.reject();
													}
												});
								return delay.promise;
							}

							$scope.queryDoneList = function(pagenum) {
								if (!pagenum) {
									return;
								}
								var delay = $q.defer();
								$scope.wflPanel.pagenumDone = pagenum;
								donelistService
										.queryDoneList(
												{
													pagesize : $scope.wflPanel.pagesizeDone,
													pagenum : $scope.wflPanel.pagenumDone
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.totalCount
															&& resp.data.result.totalCount != 0) {
														if (resp.data.result.record) {
															if (resp.data.result.record.length) {
																$scope.wflPanel.donelist = resp.data.result.record;
															} else if (!resp.data.result.record.length) {
																$scope.wflPanel.donelist = [];
																$scope.wflPanel.donelist
																		.push(resp.data.result.record);
															}
															$scope.wflPanel.totalCountDone = resp.data.result.totalCount;
															$scope.setCount();
															$scope.wflPanel.maxIndexDone = Math
																	.ceil(resp.data.result.totalCount
																			/ $scope.wflPanel.pagesizeDone);
															$scope.wflPanel.minIndexDone = 1;
															$scope.wflPanel.currentIndexDone = $scope.wflPanel.pagenumDone;
															$scope.wflPanel.indexListDone = indexService
																	.initIndexArray(
																			$scope.wflPanel.currentIndexDone,
																			$scope.wflPanel.minIndexDone,
																			$scope.wflPanel.maxIndexDone,
																			$scope.wflPanel.indexRangeDone);
															$scope.wflPanel.preIndexDone = (($scope.wflPanel.currentIndexDone - 1) >= $scope.wflPanel.minIndexDone) ? ($scope.wflPanel.currentIndexDone - 1)
																	: '';
															$scope.wflPanel.preEnableDone = (($scope.wflPanel.currentIndexDone - 1) >= $scope.wflPanel.minIndexDone) ? true
																	: false;

															$scope.wflPanel.nextIndexDone = (($scope.wflPanel.currentIndexDone + 1) <= $scope.wflPanel.maxIndexDone) ? ($scope.wflPanel.currentIndexDone + 1)
																	: '';
															$scope.wflPanel.nextEnableDone = (($scope.wflPanel.currentIndexDone + 1) <= $scope.wflPanel.maxIndexDone) ? true
																	: false;

															delay.resolve();
														} else {
															var pagenum = Math
																	.ceil(resp.data.result.totalCount
																			/ $scope.wflPanel.pagesizeDone);
															$scope.wflPanel.totalCountDone = resp.data.result.totalCount;
															$scope
																	.queryDoneList(pagenum);
														}
													} else {
														delay.reject();
													}
												});

								return delay.promise;
							}

							$scope.queryWfl = function() {
								var delay = $q.defer();
								wflService
										.queryWfl(
												{
													portal_id : $scope.wflPanel.portalId,
													element_code : $scope.wflPanel.elementCode
												})
										.then(
												function(resp) {
													if (resp.data
															&& resp.data.result
															&& resp.data.result.totalCount
															&& resp.data.result.totalCount != 0) {
														if (resp.data.result.record) {
															if (resp.data.result.record.length) {
																$scope.wflPanel.wflCategories = resp.data.result.record;
															} else if (!resp.data.result.record.length) {
																$scope.wflPanel.wflCategories = [];
																$scope.wflPanel.wflCategories
																		.push(resp.data.result.record);
															}
															for (var i = 0; i < $scope.wflPanel.wflCategories.length; i++) {
																if ($scope.wflPanel.wflCategories[i].element_category == 'TODO_LIST') {
																	$scope.wflPanel.elementTitleTodo = $scope.wflPanel.wflCategories[i].element_title;
																	$scope.wflPanel.elementCodeTodo = $scope.wflPanel.wflCategories[i].element_code;
																	$scope.wflPanel.pagesizeTodo = $scope.wflPanel.wflCategories[i].list_num || 6;
																	$scope.wflPanel.indexRangeTodo = $scope.wflPanel.wflCategories[i].indexRange || 5;
																	$scope
																			.queryFieldListTodo();
																	$scope
																			.queryTodoList(1);
																} else if ($scope.wflPanel.wflCategories[i].element_category == 'NOTIFY_LIST') {
																	$scope.wflPanel.elementTitleNoti = $scope.wflPanel.wflCategories[i].element_title;
																	$scope.wflPanel.elementCodeNoti = $scope.wflPanel.wflCategories[i].element_code;
																	$scope.wflPanel.pagesizeNoti = $scope.wflPanel.wflCategories[i].list_num || 6;
																	$scope.wflPanel.indexRangeNoti = $scope.wflPanel.wflCategories[i].indexRange || 5;
																	$scope
																			.queryFieldListNoti();
																	$scope
																			.queryNotifyList(1);
																} else if ($scope.wflPanel.wflCategories[i].element_category == 'DONE_LIST') {
																	$scope.wflPanel.elementTitleDone = $scope.wflPanel.wflCategories[i].element_title;
																	$scope.wflPanel.elementCodeDone = $scope.wflPanel.wflCategories[i].element_code;
																	$scope.wflPanel.pagesizeDone = $scope.wflPanel.wflCategories[i].list_num || 6;
																	$scope.wflPanel.indexRangeDone = $scope.wflPanel.wflCategories[i].indexRange || 5;
																	$scope
																			.queryFieldListDone();
																	$scope
																			.queryDoneList(1);
																}
															}
															delay.resolve();
														} else {
															$scope.queryWfl();
														}
													} else {
														delay.reject();
													}
												});
								return delay.promise;
							}

							$scope.setCount = function() {
								for (var i = 0; i < $scope.wflPanel.wflCategories.length; i++) {
									if ($scope.wflPanel.wflCategories[i].element_category == 'TODO_LIST') {
										if ($scope.wflPanel.totalCountTodo == '') {
											$scope.wflPanel.wflCategories[i].totalCount = 0;
										} else {
											$scope.wflPanel.wflCategories[i].totalCount = $scope.wflPanel.totalCountTodo;
										}
									} else if ($scope.wflPanel.wflCategories[i].element_category == 'NOTIFY_LIST') {
										if ($scope.wflPanel.totalCountNoti == '') {
											$scope.wflPanel.wflCategories[i].totalCount = 0;
										} else {
											$scope.wflPanel.wflCategories[i].totalCount = $scope.wflPanel.totalCountNoti;
										}
									} else if ($scope.wflPanel.wflCategories[i].element_category == 'DONE_LIST') {
										if ($scope.wflPanel.totalCountDone == '') {
											$scope.wflPanel.wflCategories[i].totalCount = 0;
										} else {
											$scope.wflPanel.wflCategories[i].totalCount = $scope.wflPanel.totalCountDone;
										}
									}
								}
							}

							$scope.startScanCookie = function() {
								$interval(function() {
									if(window.refreshPtlWfl == 'Y'){
										window.refreshPtlWfl = 'N';
										$scope.queryTodoList(1);
									}
								}, 1000);
							}
						} ])
		.directive(
				'wflPanel',
				function() {
					return {
						templateUrl : '../ptl_portal/template/ptl/system001/wfl_panel.html',
						transclude : true,
						link : function($scope, element, attrs) {
							$scope.wflPanel.portalId = attrs.portalId;
							$scope.wflPanel.elementCode = attrs.elementCode;
							$scope.wflPanel.elementTitle = attrs.elementTitle;
							$scope.queryWfl();
							$scope.startScanCookie();
						}
					}
				});
