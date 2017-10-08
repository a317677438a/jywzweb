/**
 * Created by huangyao on 2017/5/31.
 *
 * 公共接口(数据字典接口、查询列表接口)
 */
define(['app'],function(app){
    app.factory('commonQuery',
        [
            '$http',
            'API_ENDPOINT',
            'WITH_CREDENTIALS',
            function($http,API_ENDPOINT,WITH_CREDENTIALS){
                return{
                    /**
                     *  基础数据访问--下拉列表
                     *  描述:统中任何基础数据参数/基础业务参数，都可以通过此接口访问得到。
                     */
                    meiJuQuery:function(data){
                        return $http.post(API_ENDPOINT.url+'base/enumquery.json',data,WITH_CREDENTIALS)
                    },
                    /**
                     *  查看资产信息列表
                     *  描述:进入资产管理，根据查询条件：资产状态、资产编号/名称来查询资产的列表信息。
                     */
                    listQuery:function(data){
                        return $http.post(API_ENDPOINT.url+'base/listquery.json',data,WITH_CREDENTIALS)
                    },
                    /**
                     *  查单条记录信息
                     *
                     */
                    infoquery:function(data){
                        return $http.post(API_ENDPOINT.url+'base/infoquery.json',data,WITH_CREDENTIALS)
                    },
                    //项目名称下拉查询
                    projectNameSelect : function(data){
                        return $http.post(API_ENDPOINT.url+'sys/projectNameSelect.json',data,WITH_CREDENTIALS)
                    },
                    // 查询审核人列表
                    reviewerList: function (data) {
                        return $http.post(API_ENDPOINT.url+'base/queryChoiceUser.json',data,WITH_CREDENTIALS)
                    }
                }
            }
        ])
});
