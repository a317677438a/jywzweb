/**
 * Created by huangyao on 2017/5/15.
 */
define(['app'],function(app){
    app.controller('indexController',
    [
        '$scope',
        '$stateParams',
        '$location',
        '$rootScope',
        'ngDialog',
        '$state',
        '$http',
        'indexService',
        function($scope,$stateParams,$location,$rootScope,ngDialog,$state,$http,indexService){

            $rootScope.module_projectID='';//全局项目ID
            $rootScope.module_assetGrID='';//全局资产包ID
            $rootScope.module_productID='';//全局产品ID
            $scope.logoImg = 'img/logo.png';

            var loginame=sessionStorage.getItem('loginname');
            $scope.loginname=loginame;
            $scope.logout=function(){
                if($rootScope.systemType!='-1'){ //测试环境或者生产环境
                    $http.jsonp($rootScope.loginUrl+'logAll/logout/jsonp?callback=JSON_CALLBACK').success(function(){
                        window.location.href = $rootScope.loginUrl;
                    });
                }else{ //本地环境
                    indexService.logout({}).success(function(data){
                        if(data.success==true){
                            location.href='views/login.html';
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className:'alert-error',
                                scope:$scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response= '系统异常，请稍后重试!';
                                }]
                            });
                        }
                    });
                }
            };
            //获取用户权限等数据
            indexService.qryLoginUserMenus({}).success(function(data){
                if(data.success=="true"){
                    $rootScope.menus = data.returndata.menus; //一级菜单和二级菜单
                    $rootScope.actions = data.returndata.actions;  //三级菜单
                    $rootScope.logoName = data.returndata.username;//登录名
                    $rootScope.loginUrl = data.returndata.loginUrl; //登录URL
                    $rootScope.loginUrl_copy = angular.copy($rootScope.loginUrl);
                    $rootScope.systemType = data.returndata.systemType; //请求类型

                    if(data.returndata.platformLogo!=undefined&&data.returndata.platformLogo!=""){
                        $scope.logoImg = data.returndata.platformLogo; //平台logo
                        $rootScope.loginUrl = data.returndata.platformUrl; //平台LOGO对应链接地址
                        $scope.platformId = data.returndata.platformId; //平台号

                        if($scope.platformId=='10001'){
                            loadjscssfile("cssVersion/changeStyle.css", "css");
                        }
                    }
                    //向项目模块广播事件
                    $rootScope.$broadcast('recall',$rootScope.menus);

                }else{

                }
            })
                .error(function(data){
                    //location.href='views/login.html';
                    //sessionStorage.setItem("TTR",true);
                });
            //判断浏览器版本
            if($.browser.msie&&$.browser.version<=8)
            {
                ngDialog.open({
                    template: 'views/common/alert.html',
                    className: 'alert',
                    showClose: true,
                    scope: $scope,
                    controller: ['$scope', function ($scope) {
                        $scope.response = "您的浏览器版本过低，请更换IE9及以上或火狐、谷歌浏览器！";
                    }]
                });
            }
        }
    ]);
});