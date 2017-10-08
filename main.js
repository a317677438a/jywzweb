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
            "ngValidator": 'libs/angular-validator', //必输项插件
            "ngStrap": 'libs/angular-strap',
            "ngLocal": 'libs/angular-locale_zh-cn',
            "ngBusy": 'libs/angular-busy',
            "ngUpload": 'libs/angular-file-upload.min',

            "router": 'router',
            "appConstants" : 'js/app.constants',
            "commonQuery" : 'js/service/commonQuery',
            "menuTabs": 'js/directives/menuTabs',
            "filter": 'js/filter',
            "fullcalendar" : 'libs/fullcalendar.min', //全日历
            "jquery_ui" : 'libs/jquery-ui.min1.9.1', //全日历

            "indexController": 'module/indexController',
            "indexService": 'module/indexService',

            //物资管理
            "materialsManagement" : 'module/materialsManagement/materialsManagementApp',
            "materialTypeController": 'module/materialsManagement/controller/materialType/materialTypeController',
            "materielMaintenanceController": 'module/materialsManagement/controller/materielMaintenance/materielMaintenanceController',
            //入库管理
            "procurementStorageController": 'module/storageManage/controller/procurementStorage/procurementStorageController',
            "storageQueryController": 'module/storageManage/controller/storageQuery/storageQueryController',
            //出库管理
            "forOutBoundController": 'module/stockOutManagement/controller/forOutBound/forOutBoundController',
            "stockOutQueryController": 'module/stockOutManagement/controller/stockOutQuery/stockOutQueryController',
            //物资申领
            "materialsApp" : 'module/materialsFor/materialsApp',
            "claimsForQueryController": 'module/materialsFor/controller/claimsForQuery/claimsForQueryController',
            "materialRequisitionController": 'module/materialsFor/controller/materialRequisition/materialRequisitionController',
            "outStockRegistrationController": 'module/materialsFor/controller/outStockRegistration/outStockRegistrationController',
            "stockRequisitionController": 'module/materialsFor/controller/stockRequisition/stockRequisitionController',
            //仓库盘点
            "outBoundStatisticsController": 'module/checkTheStock/controller/outBoundStatistics/outBoundStatisticsController',
            "libraryStatisticsController": 'module/checkTheStock/controller/libraryStatistics/libraryStatisticsController',
            //系统管理
            "userManagementController": 'module/systemManagement/controller/userManagement/userManagementController',
            "modifyPasswordController": 'module/systemManagement/controller/modifyPassword/modifyPasswordController'
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

    require(['router','jquery','uiRouter','indexController','indexService','appConstants','menuTabs','commonQuery','materialsApp','filter','jquery_ui','fullcalendar',
        'materialsManagement','ngAnimate','ngStrap','ngLocal','pagination','ngDialog','ngBusy','ngTree','ngUpload','ngValidator'],function(){
        angular.bootstrap(document,['securityManage']);
    });

})(window);