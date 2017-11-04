/**
 * Created by huangyao on 2017/5/16.
 */
define(['app','procurementStorageController','storageQueryController','withdrawingMoneyController','MoveTheStorageController'],function(app){
    app.register.controller('storageManageController',
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