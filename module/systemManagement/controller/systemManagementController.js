/**
 * Created by huangyao on 2017/5/16.
 */
define(['app','userManagementController','modifyPasswordController'],function(app){
    app.register.controller('systemManagementController',
    [
        '$scope',
        function($scope){
            $scope.conf = {};
            $scope.conf.isCurrentproperty = 1;

            $scope.set = function(id){
                $scope.conf.isCurrentproperty = id;
            };
        }
    ]);
});