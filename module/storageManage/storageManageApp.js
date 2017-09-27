/**
 * Created by huangyao on 2017/5/25.
 */
define(['angular'],function(){
    angular.module('storageManage',[])
        .config(function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('assetDetails',{
                    url : '/assetDetails',
                    templateUrl : 'views/storageManage/procurementStorage/assetDetails.html',  //资产详情
                    controller : 'assetDetailsController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/storageManage/controller/procurementStorage/assetDetailsController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                });
        });
});