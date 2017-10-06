/**
 * Created by huangyao on 2017/5/16.
 */
define(['app','claimsForQueryController','materialRequisitionController','outStockRegistrationController','stockRequisitionController'],function(app){
    app.register.controller('materialsForController',
    [
        '$scope',
        '$stateParams',
        function($scope,$stateParams){
            $scope.conf = {};
            $scope.conf.isCurrentproperty = 1;
            if($stateParams.type!=''&&$stateParams.type!=undefined){
                $scope.conf.isCurrentproperty = 2 ;
            }
            $scope.set = function(id){
                $scope.conf.isCurrentproperty = id;
            };
        }
    ]);
});