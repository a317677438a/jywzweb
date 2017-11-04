/**
 * Created by huangyao on 2017/5/16.
 */
define(['app','claimsForQueryController','materialRequisitionController','outStockRegistrationController','stockRequisitionController'],function(app){
    app.register.controller('materialsForController',
    [
        '$scope',
        '$stateParams',
        '$rootScope',
        function($scope,$stateParams,$rootScope){
            $scope.conf = {};
            if($rootScope.role==4){
                $scope.conf.isCurrentproperty = 1;
            }else if($rootScope.role==3){
                $scope.conf.isCurrentproperty = 2;
            }else if($rootScope.role==2){
                $scope.conf.isCurrentproperty = 3;
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