/**
 * Created by huangyao on 2017/5/25.
 */
define(['angular'],function(){
    angular.module('stockOutApp',[])
        .config(function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('materialsDetails',{
                    url : '/materialsDetails?id&house',
                    templateUrl : 'views/stockOutManagement/forOutBound/materialsDetails.html',  //物资领用详情
                    controller : 'materialsDetailsController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/stockOutManagement/controller/forOutBound/materialsDetailsController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                });
        });
});