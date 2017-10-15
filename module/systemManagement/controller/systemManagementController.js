/**
 * Created by huangyao on 2017/5/16.
 */
define(['app','userManagementController','modifyPasswordController'],function(app){
    app.register.controller('systemManagementController',
    [
        '$scope',
        '$rootScope',
        function($scope,$rootScope){
            $scope.conf = {};
            if($rootScope.role==1){
                $scope.conf.isCurrentproperty = 1;
            }else{
                $scope.conf.isCurrentproperty = 2;
            }

            $scope.set = function(id){
                $scope.conf.isCurrentproperty = id;
            };
        }
    ]);
});