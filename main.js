/**
 * Created by huangyao on 2017/5/15.
 */
(function(){
    /**
     * 文件依赖
     */
    var config = {
        paths:{
            "angular" : 'libs/angular.min',
            "jquery" : 'libs/jquery-1.7.2.min',
            "uiRouter" : 'libs/angular-ui-router',
            "ngAnimate": 'libs/angular-animate1.3.15',
            "ngTree": 'libs/angular-tree-control',
            "pagination": 'libs/pagination',

            "ngDialog": 'libs/ngDialog',
            "ngValidator": 'libs/angular-validator',
            "ngStrap": 'libs/angular-strap',
            "ngLocal": 'libs/angular-locale_zh-cn',
            "ngBusy": 'libs/angular-busy',
            "ngUpload": 'libs/angular-file-upload.min',

            "router": 'router',
            "appConstants" : 'js/app.constants',
            "menuTabs": 'js/directives/menuTabs',
            "filter": 'js/filter',
            "fullcalendar" : 'libs/fullcalendar.min', //全日历
            "jquery_ui" : 'libs/jquery-ui.min1.9.1', //全日历

            "indexController": 'module/indexController',
            "indexService": 'module/indexService',

            //项目管理
            "materialsManagement" : 'module/materialsManagement/materialsManagementApp',
            "projectController": 'module/materialsManagement/controller/project/projectController',
            "documentManageController": 'module/materialsManagement/controller/documentManage/documentManageController',
            //资产池管理
            "dataImportController": 'module/propertyManage/controller/dataImport/dataImportController',
            "assetsStatisticsController": 'module/propertyManage/controller/assetsStatistics/assetsStatisticsController',
            "productsController": 'module/propertyManage/controller/products/productsController',
            "serviceReportController": 'module/propertyManage/controller/serviceReport/serviceReportController',
            "trialReportController": 'module/propertyManage/controller/trialReport/trialReportController',
            //工作台
            "workController": 'module/workbench/controller/work/workController',
            //业务参数
            "HolidaySettingController": 'module/bizParam/controller/HolidaySetting/HolidaySettingController'
        },
        waitSeconds : 7,  //出现网络慢加载文件慢的时候  设置最长等待时间7s
        shim : {  //这里shim等于快速定义一个模块，定义模块需要的依赖
            'angular':{
                exports:'angular'
            },
            uiRouter: {
                deps: ['angular']   //依赖什么模块
            },
            appConstants: {
                deps: ['angular']
            },
            menuTabs: {
                deps: ['angular']
            },
            filter: {
                deps: ['angular']
            },
            pagination: {
                deps: ['angular']
            },
            ngStrap: {
                deps: ['angular']
            },
            ngLocal: {
                deps: ['angular']
            },
            ngStrapTpl: {
                deps: ['angular']
            },
            ngBusy: {
                deps: ['angular']
            },
            ngTree: {
                deps: ['angular']
            },
            ngValidator: {
                deps: ['angular']
            },
            ngAnimate: {
                deps: ['angular']
            },
            ngUpload: {
                deps: ['angular']
            },
            fullcalendar: {
                deps: ['jquery']
            },
            jquery_ui: {
                deps: ['jquery']
            }
        }
    };
    require.config(config);

    require(['router','jquery','uiRouter','indexController','indexService','appConstants','menuTabs','filter','jquery_ui','fullcalendar','materialsManagement','ngAnimate','ngStrap','ngLocal','pagination','ngDialog','ngBusy','ngTree','ngUpload','ngValidator'],function(){
        angular.bootstrap(document,['securityManage']);
    });

})(window);