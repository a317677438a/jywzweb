/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('shouyeController',
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