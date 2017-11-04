/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('GoodsReturnedController',
        [
            '$scope',
            'ngDialog',
            function($scope,ngDialog){

                //点击新增退回单
                $scope.addMateriel = function(){
                    $scope.showAdd = true;
                };
            }
        ]);
});