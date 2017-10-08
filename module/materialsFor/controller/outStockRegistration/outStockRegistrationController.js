/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('outStockRegistrationController',
        [
            '$scope',
            function($scope){

                //领料确认
                $scope.registrationSure = function(){
                    $scope.showEnter = true;
                };
                //审批拒绝
                $scope.refuseStock = function(){
                    $scope.showRefuse = true;
                };
                //关闭确认
                $scope.closeEnter = function(){
                    $scope.showEnter = false;
                };
                //关闭拒绝
                $scope.closeRefuse = function(){
                    $scope.showRefuse = false;
                };
            }
        ]);
});