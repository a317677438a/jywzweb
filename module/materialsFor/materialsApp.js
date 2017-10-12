/**
 * Created by huangyao on 2017/5/25.
 */
define(['angular'],function(){
    angular.module('materialsApp',[])
        .config(function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('goodsDetails',{
                    url : '/goodsDetails?code&house',
                    templateUrl : 'views/materialsFor/stockRequisition/goodsDetails.html',  //物资领用详情
                    controller : 'goodsDetailsController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/materialsFor/controller/stockRequisition/goodsDetailsController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                });
        });
});