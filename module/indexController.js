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
        'commonQuery',
        function($scope,$stateParams,$location,$rootScope,ngDialog,$state,$http,indexService,commonQuery){

            $rootScope.module_projectID='';//全局项目ID
            $rootScope.module_assetGrID='';//全局资产包ID
            $rootScope.module_productID='';//全局产品ID
            $scope.logoImg = 'img/logo.png';

            $scope.logout=function(){
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
            };
            //获取用户权限等数据
            indexService.queryUserLoginInfo({}).success(function(data){
                if(data.success=="true"){
                    $rootScope.loginname = data.returndata.loginname; //登录名
                    $rootScope.id = data.returndata.id;  //用户id
                    $rootScope.name = data.returndata.name;//用户名
                    $rootScope.role = data.returndata.role; //用户类型

                    $state.go('systemManagement');
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