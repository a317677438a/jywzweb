/**
 * Created by huangyao on 2017/5/25.
 */
define(['angular'],function(){
    angular.module('projectManage',[])
        .config(function($stateProvider,$urlRouterProvider){
            $stateProvider
                .state('addProject',{
                    url : '/addProject',
                    templateUrl : 'views/materialsManagement/project/addProject.html',  //新增项目
                    controller : 'addProjectController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/materialsManagement/controller/project/addProjectController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                })
                .state('projectDetail',{
                    url : '/projectDetail',
                    templateUrl : 'views/materialsManagement/project/projectDetail.html',  //项目详情
                    controller : 'projectDetailController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/materialsManagement/controller/project/projectDetailController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                })
                .state('addProduct',{
                    url : '/addProduct',
                    templateUrl : 'views/materialsManagement/productManage/addProduct.html',  //新增产品
                    controller : 'addProductController',
                    resolve : {
                        loadCtrl : ['$q',
                            function($q){
                                var deferred = $q.defer();
                                //异步加载controller/directive/filter/service
                                require([
                                    'module/materialsManagement/controller/productManage/addProductController.js'
                                ],function(){deferred.resolve();});
                                return deferred.promise;
                            }
                        ]
                    }
                });
        });
});