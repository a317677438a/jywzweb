/**
 * Created by huangyao on 2017/5/16.
 */
define(['app','HolidaySettingController'],function(app){
    app.register.controller('bizParamController',
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