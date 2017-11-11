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
                .state('shouye', {
                    url: '/shouye',
                    templateUrl: 'views/shouye/shouye.html',//首页
                    controller: 'shouyeController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'views/shouye/shouyeController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
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
                    url: '/storageManage?type',
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
                    url: '/stockOutManagement?type',
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
                    url: '/materialsFor?type',
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
                .state('operationalGuidance', {
                    url: '/operationalGuidance?type',
                    templateUrl: 'views/operationalGuidance/operationalGuidance.html',//运行管理
                    controller: 'operationalGuidanceController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/operationalGuidance/operationalGuidanceController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('checkTheStock', {
                    url: '/checkTheStock?type',
                    templateUrl: 'views/checkTheStock/checkTheStock.html',//仓库盘点
                    controller: 'checkTheStockController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/checkTheStock/controller/checkTheStockController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('warehouseAllotting', {
                    url: '/warehouseAllotting?type',
                    templateUrl: 'views/warehouseAllotting/warehouseAllotting.html',//仓库调拨
                    controller: 'warehouseAllottingController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/warehouseAllotting/controller/warehouseAllottingController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('systemManagement', {
                    url: '/systemManagement?type',
                    templateUrl: 'views/systemManagement/systemManagement.html',//系统管理
                    controller: 'systemManagementController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/systemManagement/controller/systemManagementController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                })
                .state('DurationManage', {
                    url: '/DurationManage',
                    templateUrl: 'views/shouye/DurationManage.html',//消息提醒
                    controller: 'DurationManageController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'views/shouye/DurationManageController.js'
                                ], function () {
                                    deferred.resolve();
                                });
                                return deferred.promise;
                            }]
                    }
                });
            //解决路由异常的方法
            $urlRouterProvider.otherwise('/shouye');
        });
});

