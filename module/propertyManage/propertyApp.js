/**
 * Created by huangyao on 2017/5/25.
 */
define(['angular'],function(){
    angular.module('propertyManage',[])
        .config(function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('assetDetails',{
                    url : '/assetDetails',
                    templateUrl : 'views/propertyManage/assetsStatistics/assetDetails.html',  //资产详情
                    controller : 'assetDetailsController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/propertyManage/controller/assetsStatistics/assetDetailsController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                });
        });
});