/**
 * Created by huangyao on 2017/5/15.
 */
define(
    [
        'angular'
    ], function (angular) {
        return angular.module('securityManage',
            [
                'app.constants',
                'ui.router',
                'projectManage',
                'menuTabs',
                'filter',
                'treeControl', //树状结构注入
                'ngDialog', //弹出框
                'validator', //必输项注入
                'mgcrea.ngStrap', //日期插件注入
                'angularFileUpload',
                'ui.bootstrap.pagination', //分页插件注入
                'cgBusy', //加载等待
                'ngAnimate', //动画 依赖

                'materialsApp' //物资申领
            ]);
    }
)