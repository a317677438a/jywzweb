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
                    },
                    //新增物资类型
                    addType : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/addType.json',data,WITH_CREDENTIALS);
                    },
                    //查询物资类型
                    getAllType : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/getAllType.json',data,WITH_CREDENTIALS);
                    },
                    //获取物资类型编码最大值
                    getMaterialType : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/getMaterialType.json',data,WITH_CREDENTIALS);
                    },
                    //修改物资类型
                    modifyType : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/modifyType.json',data,WITH_CREDENTIALS);
                    },
                    //删除物资类型
                    deleteType : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/deleteType.json',data,WITH_CREDENTIALS);
                    },
                    //查询全部物资
                    getAllMaterial : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/getAllMaterial.json',data,WITH_CREDENTIALS);
                    },
                    //新增物资时查询最大编码
                    getMaterialNum : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/getMaterialNum.json',data,WITH_CREDENTIALS);
                    },
                    //新增物资
                    addMaterial : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/addMaterial.json',data,WITH_CREDENTIALS);
                    }
                };
            }
        ]);
});

