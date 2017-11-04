/**
 * Created by huangyao on 2017/5/25.
 */
define(['angular'],function(){
    angular.module('operationApp',[])
        .config(function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('modifyGoodsReturned',{
                    url : '/modifyGoodsReturned',
                    templateUrl : 'views/operationalGuidance/GoodsReturned/modifyGoodsReturned.html',  //修改物资退回
                    controller : 'modifyGoodsReturnedController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/operationalGuidance/controller/GoodsReturned/modifyGoodsReturnedController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                })
                .state('GoodsReturnedDetails',{
                    url : '/GoodsReturnedDetails?id&type',
                    templateUrl : 'views/operationalGuidance/GoodsReturned/GoodsReturnedDetails.html',  //物资明细
                    controller : 'GoodsReturnedDetailsController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/operationalGuidance/controller/GoodsReturned/GoodsReturnedDetailsController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                });
        });
});