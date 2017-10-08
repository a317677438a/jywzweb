/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('materialRequisitionController',
        [
            '$scope',
            function($scope){

                //同意或者拒绝对象
                $scope.doPass = {};
                //同意
                $scope.passMaterial = function(){
                    $scope.showPass = true;
                    $scope.nowAdd = true;
                };
                //拒绝
                $scope.refuseMaterial = function(){
                    $scope.showPass = true;
                    $scope.nowAdd = false;
                };
                //关闭弹出界面
                $scope.closeFileForm = function(){
                    $scope.showPass = false;
                }
            }
        ]);
});