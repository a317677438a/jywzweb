/**
 * Created by huangyao on 2017/5/16.
 */
define(['app','dataImportController','assetsStatisticsController','productsController','serviceReportController','trialReportController'],function(app){
    app.register.controller('propertyManageController',
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