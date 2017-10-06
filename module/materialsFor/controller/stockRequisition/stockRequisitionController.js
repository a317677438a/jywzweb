/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('stockRequisitionController',
        [
            '$scope',
            'commonQuery',
            function($scope,commonQuery){
                //申领状态
                commonQuery.meiJuQuery({enum:'xft.workbench.backstage.base.enumeration.material.ApplyStatus'}).success(function(data){
                    if(data.success=="true"){
                        $scope.ApplyStatus = data.returndata;
                    }
                });
            }
        ]);
});