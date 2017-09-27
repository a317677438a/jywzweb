/**
 * Created by HuangYao on 2016/3/19.
 *
 *
 */
define(['app'],function(app){
    app.factory('indexService',
        [
            '$http',
            'API_ENDPOINT',
            'WITH_CREDENTIALS',
            function($http,API_ENDPOINT,WITH_CREDENTIALS){
                return{
                    //权限、登录url
                    qryLoginUserMenus : function(data){
                        return  $http.post(API_ENDPOINT.url+'qryLoginUserMenus.json',data,WITH_CREDENTIALS);
                    },
                    //退出登录
                    logout : function(data){
                        return  $http.post(API_ENDPOINT.url+'abslogout.json',data,WITH_CREDENTIALS);
                    },
                    //首页  查询公告
                    getNoticeInfo : function(data){
                        return $http.post(API_ENDPOINT.url+'sysConfig/getNoticeInfo.json',data,WITH_CREDENTIALS);
                    },
                    //首页  查询系统提示
                    queryRemindInfo : function(data){
                        return $http.post(API_ENDPOINT.url+'sysConfig/queryRemindInfo.json',data,WITH_CREDENTIALS);
                    },
                    //首页  查询系统提示--标记为已读
                    setRead : function(data){
                        return $http.post(API_ENDPOINT.url+'sysConfig/setRead.json',data,WITH_CREDENTIALS);
                    }
                };
            }
        ]);
});

