/**
 * Created by huangyao on 2017/10/5.
 */
define(['app','GoodsReturnedController','useRegistrationController','useRegistrationQueryController','ViewHoldController'],function(app){
    app.register.controller('operationalGuidanceController',
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