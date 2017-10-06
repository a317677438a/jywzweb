/**
 * Created by huangyao on 2017/5/15.
 */
define(['app'],function(app){
    app.config(function($controllerProvider,$compileProvider,$filterProvider,$provide,$validatorProvider){
        app.register = {
            //得到$controllerProvider的引用
            controller : $controllerProvider.register,
            //同样的。这里也可以保存directive / filter /service 的引用
            directive : $compileProvider.register,
            filter : $filterProvider.register,
            service : $provide.service,
            factory : $provide.factory
        };
        $validatorProvider.register('requiredSubmit',{
            validator : /^.+$/,
            error : '为必填项，请输入.'
        })
    })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('materialsManagement', {
                    url: '/materialsManagement?type',
                    templateUrl: 'views/materialsManagement/materialsManagement.html',//物资管理
                    controller: 'materialsManagementController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/materialsManagement/controller/materialsManagementController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('storageManage', {
                    url: '/storageManage',
                    templateUrl: 'views/storageManage/storageManage.html',//入库管理
                    controller: 'storageManageController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/storageManage/controller/storageManageController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('stockOutManagement', {
                    url: '/stockOutManagement',
                    templateUrl: 'views/stockOutManagement/stockOutManagement.html',//出库管理
                    controller: 'stockOutManagementController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/stockOutManagement/controller/stockOutManagementController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('materialsFor', {
                    url: '/materialsFor',
                    templateUrl: 'views/materialsFor/materialsFor.html',//物资申领
                    controller: 'materialsForController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/materialsFor/controller/materialsForController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('workbench', {
                    url: '/workbench',
                    templateUrl: 'views/workbench/workbench.html',//工作台
                    controller: 'workbenchController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/workbench/controller/workbenchController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('bizParam', {
                    url: '/bizParam',
                    templateUrl: 'views/bizParam/bizParam.html',//业务参数
                    controller: 'bizParamController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/bizParam/controller/bizParamController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
            //解决路由异常的方法
            $urlRouterProvider.otherwise('/materialsManagement');
        });
});

