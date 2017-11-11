/**
 * Created by huangyao on 2017-11-11.
 */
define(['app','warehouseController'],function(app){
    app.register.controller('warehouseAllottingController',
        [
            '$scope',
            '$rootScope',
            '$stateParams',
            function($scope,$rootScope,$stateParams){
                $scope.conf = {};
                $scope.conf.isCurrentproperty = 1;
                //if($rootScope.role==1){
                //    $scope.conf.isCurrentproperty = 1;
                //}else{
                //    $scope.conf.isCurrentproperty = 2;
                //}
                if($stateParams.type!=''&&$stateParams.type!=undefined){
                    $scope.conf.isCurrentproperty = $stateParams.type ;
                }
                $scope.set = function(id){
                    $scope.conf.isCurrentproperty = id;
                };
            }
        ]);
});