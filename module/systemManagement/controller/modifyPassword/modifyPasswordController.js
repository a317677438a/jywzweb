/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('modifyPasswordController',
    [
        '$scope',
        'indexService',
        'ngDialog',
        '$rootScope',
        function($scope,indexService,ngDialog,$rootScope){

            $scope.conf.loginname = $rootScope.loginname;
            //重置密码
            $scope.refuse = function(){
                var refuse = {
                    loginname : $scope.conf.loginname,
                    passwd_old : $scope.conf.passwd_old,
                    passwd_new : $scope.conf.passwd_new
                };
                $scope.promise = indexService.resetPasswd(refuse).success(function(data){
                    if(data.success=="true"){
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = data.returnmsg;
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
                            }]
                        })
                    }else{
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert-error',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = data.returnmsg;
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
                            }]
                        })
                    }
                }).error(function(){
                    window.location.href = 'views/common/error.html';
                });
            }
        }
    ]);
});