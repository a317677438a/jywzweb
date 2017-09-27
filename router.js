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
                .state('propertyManage', {
                    url: '/propertyManage',
                    templateUrl: 'views/propertyManage/propertyManage.html',//资产管理
                    controller: 'propertyManageController',
                    resolve: {
                        loadCtrl: ['$q',
                            function ($q) {
                                var deferred = $q.defer();
                                //异步加载controller／directive/filter/service
                                require([
                                    'module/propertyManage/controller/propertyManageController.js'
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

