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
                    //公共信息查询
                    paramquery : function(data){
                        return  $http.post(API_ENDPOINT.url+'base/paramquery.json',data,WITH_CREDENTIALS);
                    },
                    //权限、登录url
                    queryUserLoginInfo : function(data){
                        return  $http.post(API_ENDPOINT.url+'queryUserLoginInfo.json',data,WITH_CREDENTIALS);
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
                    //用户信息列表查询
                    userListQuery : function(data){
                        return $http.post(API_ENDPOINT.url+'user/userListQuery.json',data,WITH_CREDENTIALS);
                    },
                    //新增用户
                    userAdd : function(data){
                        return $http.post(API_ENDPOINT.url+'user/userAdd.json',data,WITH_CREDENTIALS);
                    },
                    //修改用户
                    userModify : function(data){
                        return $http.post(API_ENDPOINT.url+'user/userModify.json',data,WITH_CREDENTIALS);
                    },
                    //停用用户
                    stopUserService : function(data){
                        return $http.post(API_ENDPOINT.url+'user/stopUserService.json',data,WITH_CREDENTIALS);
                    },
                    //启用用户
                    startUserService : function(data){
                        return $http.post(API_ENDPOINT.url+'user/startUserService.json',data,WITH_CREDENTIALS);
                    },
                    //重置密码
                    resetPasswd : function(data){
                        return $http.post(API_ENDPOINT.url+'user/resetPasswd.json',data,WITH_CREDENTIALS);
                    },
                    //查询某个角色下的用户列表。
                    getUserByRole : function(data){
                        return $http.post(API_ENDPOINT.url+'base/getUserByRole.json',data,WITH_CREDENTIALS);
                    },
                    //用户仓库编码列表查询
                    haveStorehouseCode : function(data){
                        return $http.post(API_ENDPOINT.url+'user/haveStorehouseCode.json',data,WITH_CREDENTIALS);
                    },
                    //除登录用户之外的仓库编码列表查询
                    otherHaveStorehouseCode : function(data){
                        return $http.post(API_ENDPOINT.url+'user/otherHaveStorehouseCode.json',data,WITH_CREDENTIALS);
                    },
                    //设置仓库员仓库编码
                    setStorehouseCode : function(data){
                        return $http.post(API_ENDPOINT.url+'user/setStorehouseCode.json',data,WITH_CREDENTIALS);
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
                    },
                    //查询物资类型编号与物资类型名称
                    getMaterialTypeAndName : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/getMaterialTypeAndName.json',data,WITH_CREDENTIALS);
                    },
                    //修改物资信息
                    modifyMaterial : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/modifyMaterial.json',data,WITH_CREDENTIALS);
                    },
                    //删除物资
                    deleteMaterial : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/deleteMaterial.json',data,WITH_CREDENTIALS);
                    },
                    //查询所有入库单
                    getAllStock : function(data){
                        return $http.post(API_ENDPOINT.url+'/stockManagement/getAllStock.json',data,WITH_CREDENTIALS);
                    },
                    //新增入库单--自动生成入库单号
                    getCode : function(data){
                        return $http.post(API_ENDPOINT.url+'/base/getCode.json',data,WITH_CREDENTIALS);
                    },
                    //新增入库单--查询入库仓库编码
                    haveStorehouseCodeList : function(data){
                        return $http.post(API_ENDPOINT.url+'user/haveStorehouseCodeList.json',data,WITH_CREDENTIALS);
                    },
                    //新增入库单--添加物资--所有物资下拉列表
                    getALLMaterialList : function(data){
                        return $http.post(API_ENDPOINT.url+'/base/getALLMaterialList.json',data,WITH_CREDENTIALS);
                    },
                    //新增入库单--根据物资id查询物资信息
                    getMaterialById : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/getMaterialById.json',data,WITH_CREDENTIALS);
                    },
                    //新增入库单--查询物资id与物资名称
                    getMaterialAndId : function(data){
                        return $http.post(API_ENDPOINT.url+'/stockManagement/getMaterialAndId.json',data,WITH_CREDENTIALS);
                    },
                    //新增入库单
                    addStock : function(data){
                        return $http.post(API_ENDPOINT.url+'/stockManagement/addStock.json',data,WITH_CREDENTIALS);
                    },
                    //确认入库
                    inboundGoodsConfirmation : function(data){
                        return $http.post(API_ENDPOINT.url+'/stockManagement/inboundGoodsConfirmation.json',data,WITH_CREDENTIALS);
                    },
                    //查询入库单对应的入库明细
                    fromStockGetMaterial : function(data){
                        return $http.post(API_ENDPOINT.url+'/stockManagement/fromStockGetMaterial.json',data,WITH_CREDENTIALS);
                    },
                    //确定修改入库单
                    modifyOneStock : function(data){
                        return $http.post(API_ENDPOINT.url+'/stockManagement/modifyOneStock.json',data,WITH_CREDENTIALS);
                    },
                    //删除入库单
                    deleteOneStock : function(data){
                        return $http.post(API_ENDPOINT.url+'/stockManagement/deleteOneStock.json',data,WITH_CREDENTIALS);
                    },
                    //入库查询统计
                    procurementStorage : function(data){
                        return $http.post(API_ENDPOINT.url+'/stockManagement/procurementStorage.json',data,WITH_CREDENTIALS);
                    },
                    //新增领料申请
                    addApply : function(data){
                        return $http.post(API_ENDPOINT.url+'/apply/addApply.json',data,WITH_CREDENTIALS);
                    },
                    //新增领料申请---查询查询物资在仓库的存量=入库数量-出库数据。以及用户持有物资的数量。
                    materialOwnNumber : function(data){
                        return $http.post(API_ENDPOINT.url+'/apply/materialOwnNumber.json',data,WITH_CREDENTIALS);
                    },
                    //修改一条申请记录
                    modifyApply : function(data){
                        return $http.post(API_ENDPOINT.url+'/apply/modifyApply.json',data,WITH_CREDENTIALS);
                    },
                    //删除一条申请记录
                    deleteApply : function(data){
                        return $http.post(API_ENDPOINT.url+'/apply/deleteApply.json',data,WITH_CREDENTIALS);
                    },
                    //领料审批 --  审核
                    reviewApply : function(data){
                        return $http.post(API_ENDPOINT.url+'/apply/reviewApply.json',data,WITH_CREDENTIALS);
                    },
                    //领料审批 --  出库登记
                    receiveApplyMaterial : function(data){
                        return $http.post(API_ENDPOINT.url+'/apply/receiveApplyMaterial.json',data,WITH_CREDENTIALS);
                    },
                    //出库查询统计 --  记录导出
                    downloadDetail : function(data){
                        return $http.post(API_ENDPOINT.url+'/storehouseout/downloadDetail.json',data,WITH_CREDENTIALS);
                    },
                    //入库查询统计 --  记录导出
                    downloadDetailIno : function(data){
                        return $http.post(API_ENDPOINT.url+'/storehousein/downloadDetail.json',data,WITH_CREDENTIALS);
                    },
                    //物资申领--申领查询 --  记录导出
                    downloadDetailApply : function(data){
                        return $http.post(API_ENDPOINT.url+'/apply/downloadDetail.json',data,WITH_CREDENTIALS);
                    },
                    //退库入库列表---确认入库
                    materialbackconfirm : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialback/confirm.json',data,WITH_CREDENTIALS);
                    },
                    /***
                     *  物资使用情况
                     */
                    //当前用户持有某个物资库存
                    materialOwnNumberMaterialuse : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialuse/materialOwnNumber.json',data,WITH_CREDENTIALS);
                    },
                    //新增物资使用信息
                    addMaterialuse : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialuse/add.json',data,WITH_CREDENTIALS);
                    },
                    //新增物资退回单
                    addMaterialback : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialback/add.json',data,WITH_CREDENTIALS);
                    },
                    //修改物资退回单
                    modifyMaterialback : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialback/modify.json',data,WITH_CREDENTIALS);
                    },
                    //物资退回单删除
                    deleteMaterialback : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialback/delete.json',data,WITH_CREDENTIALS);
                    },
                    //查看持有情况
                    materialsOwnNumber : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialown/materialsOwnNumber.json',data,WITH_CREDENTIALS);
                    },
                    //下载查看持有情况
                    downloadOwnNumber : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialown/downloadOwnNumber.json',data,WITH_CREDENTIALS);
                    },
                    //仓库调拨--当前出库仓库管理员对应仓库的物资库存
                    storeNumber : function(data){
                        return $http.post(API_ENDPOINT.url+'/transfer/storeNumber.json',data,WITH_CREDENTIALS);
                    },
                    //仓库调拨--新增调拨单
                    addTransfer : function(data){
                        return $http.post(API_ENDPOINT.url+'/transfer/addTransfer.json',data,WITH_CREDENTIALS);
                    },
                    //仓库调拨--修改调拨单
                    modifyTransfer : function(data){
                        return $http.post(API_ENDPOINT.url+'/transfer/modifyTransfer.json',data,WITH_CREDENTIALS);
                    },
                    //仓库调拨--删除调拨单
                    deleteTransfer : function(data){
                        return $http.post(API_ENDPOINT.url+'/transfer/deleteTransfer.json',data,WITH_CREDENTIALS);
                    },
                    //仓库调拨--确认物资调拨
                    comfirmTransfer : function(data){
                        return $http.post(API_ENDPOINT.url+'/transfer/comfirmTransfer.json',data,WITH_CREDENTIALS);
                    },
                    //仓库盘点--库存盘点
                    materialNumber : function(data){
                        return $http.post(API_ENDPOINT.url+'/takestock/materialNumber.json',data,WITH_CREDENTIALS);
                    },
                    //仓库盘点--下载
                    downloadTakestock : function(data){
                        return $http.post(API_ENDPOINT.url+'/takestock/downloadTakestock.json',data,WITH_CREDENTIALS);
                    },
                    //库存预警--新增库存预警
                    addmaterialwarn : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialwarn/add.json',data,WITH_CREDENTIALS);
                    },
                    //库存预警--删除预警
                    deletematerialwarn : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialwarn/delete.json',data,WITH_CREDENTIALS);
                    },
                    //消息提醒--标记为已读
                    haveToRead : function(data){
                        return $http.post(API_ENDPOINT.url+'/message/read.json',data,WITH_CREDENTIALS);
                    },
                    //系统管理-设置物资限制
                    modifyMaterialUselimit : function(data){
                        return $http.post(API_ENDPOINT.url+'/materialsType/modifyMaterialUselimit.json',data,WITH_CREDENTIALS);
                    }
                };
            }
        ]);
});

