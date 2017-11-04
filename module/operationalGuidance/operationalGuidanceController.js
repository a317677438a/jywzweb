/**
 * Created by huangyao on 2017/10/5.
 */
define(['app','GoodsReturnedController','useRegistrationController','useRegistrationQueryController','ViewHoldController'],function(app){
    app.register.controller('operationalGuidanceController',
        [
            '$scope',
            '$stateParams',
            function($scope,$stateParams){
                $scope.conf = {};
                $scope.conf.isCurrentproperty = 1;
                if($stateParams.type!=''&&$stateParams.type!=undefined){
                    $scope.conf.isCurrentproperty = $stateParams.type ;
                }
                $scope.set = function(id){
                    $scope.conf.isCurrentproperty = id;
                };
            }
        ]);
});