/**
 * Created by huangyao on 2017/5/16.
 */
define(['app','userManagementController','modifyPasswordController','materialLimitController'],function(app){
    app.register.controller('systemManagementController',
    [
        '$scope',
        '$rootScope',
        '$stateParams',
        function($scope,$rootScope,$stateParams){
            $scope.conf = {};
            if($rootScope.role==1){
                $scope.conf.isCurrentproperty = 1;
            }else{
                $scope.conf.isCurrentproperty = 2;
            }
            if($stateParams.type!=''&&$stateParams.type!=undefined){
                $scope.conf.isCurrentproperty = $stateParams.type ;
            }
            $scope.set = function(id){
                $scope.conf.isCurrentproperty = id;
            };
        }
    ]);
});