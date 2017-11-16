/**
 * Created by huangyao on 2017-11-11.
 */
define(['app'],function(app){
    app.register.controller('warehouseController',
        [
            '$scope',
            'ngDialog',
            'indexService',
            'commonQuery',
            '$filter',
            '$rootScope',
            '$validator',
            '$q',
            function($scope,ngDialog,indexService,commonQuery,$filter,$rootScope,$validator,$q){

                $scope.conf = {};
                $scope.message = 'Please Wait...';
                $scope.storageModel = {}; //新增调拨单对象
                $scope.userList = [];
                $scope.add = {};
                //调拨类型枚举
                commonQuery.meiJuQuery({enum:'xft.workbench.backstage.base.enumeration.apply.TransferType'}).success(function(data){
                    if(data.success=="true"){
                        $scope.TransferType = data.returndata;
                        $scope.storageModel.transfer_type = $scope.TransferType[0].key;
                    }
                });
                //查询所有仓管员
                $scope.promise = indexService.getUserByRole({role:2,exeid:'MS0002EQ01'}).success(function(data){
                    if(data.success=="true"){
                        $scope.CangUserList =  data.returndata;
                    }else{
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert-error',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = data.returnmsg;
                            }]
                        })
                    }
                });
                //查询所有仓库
                $scope.promise = indexService.paramquery({exeid:'MS0000EQ001',param_type:'storehouse'}).success(function(data){
                    if(data.success=="true"){
                        $scope.storehouseList =  data.returndata.rows;
                    }else{
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert-error',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = data.returnmsg;
                            }]
                        })
                    }
                });
                //新增调拨---自动生成调拨单号
                $scope.getCode = function(){
                    $scope.promise = indexService.getCode({codeType:'DB'}).success(function(data){
                        if(data.success=="true"){
                            $scope.storageModel.transfer_code = data.returndata.code;
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                };
                //查询用户对应的仓库编码
                $scope.haveStorehouseCodeList = function(id){
                    var deferred=$q.defer();
                    var promise=deferred.promise;
                    $scope.promise = indexService.haveStorehouseCodeList({id:id}).success(function(data){
                        if(data.success=="true"){
                            deferred.resolve(data.returndata);//执行成功
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                    return promise;
                };
                //获取入库人对应的仓库
                $scope.getHouseCode = function(){
                    $scope.haveStorehouseCodeList($scope.storageModel.putin_user).then(function(result){
                        $scope.getHouseCodeList =  result;
                        if($scope.getHouseCodeList.length>0){
                            $scope.storageModel.putin_storehouse_code = $scope.getHouseCodeList[0].key;
                        }
                    });
                };
                //查询所有仓管员列表
                $scope.getUserList = function(){
                    var deferred=$q.defer();
                    var promise=deferred.promise;
                    $scope.promise = indexService.getUserByRole({role:2,exeid:'MS0002EQ01'}).success(function(data){
                        if(data.success=="true"){
                            //$scope.userList =  data.returndata;
                            deferred.resolve(data.returndata);//执行成功
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                    return promise;
                };
                //添加物资--所有物资下拉列表
                $scope.getALLMaterialList = function(){
                    $scope.promise = indexService.getALLMaterialList({exeid:'MS0000EQ006'}).success(function(data){
                        if(data.success=="true"){
                            $scope.ALLMaterialList = data.returndata;
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                };
                //添加物资--当前出库仓库管理员对应仓库的物资库存
                $scope.storeNumber = function(code,id){
                    $scope.promise = indexService.storeNumber({storehouse_code:code,material_id:id}).success(function(data){
                        if(data.success=="true"){
                            $scope.conf.storeNumber = data.returndata.storeNumber;
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                };
                //点击新增调拨单
                $scope.addMateriel = function(){
                    $scope.showAdd = true;
                    $scope.storageModel.transfer_type = '1';
                    $scope.storageModel.putout_user_name = $rootScope.name;
                    $scope.storageModel.putout_user = $rootScope.id;
                    $scope.storageModel.transfer_date = new Date();
                    $scope.getCode();
                    $scope.haveStorehouseCodeList($rootScope.id).then(function(result){
                        $scope.houseCodeList = result;
                        if($scope.houseCodeList.length>0){
                            $scope.storageModel.putout_storehouse_code = $scope.houseCodeList[0].key;
                        }
                    });
                    $scope.getUserList().then(function(result){
                        $scope.userList = result;
                        if($scope.userList.length>0){
                            $scope.storageModel.putin_user = $scope.userList[0].key;
                            $scope.getHouseCode();
                        }
                    });
                    //if($scope.userList.length>0){
                    //    $scope.storageModel.putin_user = $scope.userList[0].key;
                    //    $scope.getHouseCode();
                    //    if($scope.getHouseCodeList.length>0){
                    //        $scope.storageModel.putin_storehouse_code = $scope.getHouseCodeList[0].key;
                    //    }
                    //}
                    $scope.getALLMaterialList();
                };
                //关闭新增窗口
                $scope.closeForm = function(){
                    $scope.showAdd = false;
                };
                //点击新增物资
                $scope.MaterialList=[];
                $scope.addMaterial = function(){
                    $scope.conf = {};
                    $scope.showAddMaterial = true;
                    //$scope.MaterialList.push({jy_material_id:'',putin_number:''});
                };
                //点击鼠标显示下拉菜单
                $scope.showMenu = function(){
                    $scope.isShowMenu = true;
                };
                //点击下拉的将上面的值替换掉
                $scope.changevalue = function(name,key){
                    $scope.conf.material = name;
                    $scope.conf.material_key = key;
                    $scope.isShowMenu = false;
                    $scope.promise = indexService.getMaterialById({id:$scope.conf.material_key}).success(function(data){
                        if(data.success=="true"){
                            $scope.conf.code = data.returndata.code;
                            $scope.conf.codename = data.returndata.codename;
                            $scope.conf.model = data.returndata.model;
                            $scope.conf.supplier = data.returndata.supplier;
                            $scope.conf.name = data.returndata.name;
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                    $scope.storeNumber($scope.storageModel.putout_storehouse_code,$scope.conf.material_key);
                };
                //点击其他地方关闭下拉框
                $scope.notShow = function(){
                    $scope.isShowMenu = false;
                };
                //清除所选
                $scope.removeName = function(){
                    $scope.conf.material = ''
                };
                //确定新增物资
                $scope.addSuredeleteMateriel = function(){
                    for(var i=0;i<$scope.MaterialList.length;i++){
                        if($scope.conf.code == $scope.MaterialList[i].code){
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = "该物资已存在,不允许重复添加!";
                                }]
                            });
                            return;
                        }
                    }
                    if($scope.conf.transfer_number == ''){
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = "请填写调拨数量！";
                            }]
                        });
                        return;
                    }
                    if($scope.conf.storeNumber == '' || $scope.conf.storeNumber === '0'){
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = "当前物资没有库存数量！";
                            }]
                        });
                        return;
                    }
                    $scope.MaterialList.push(
                        {
                            code : $scope.conf.code,
                            name : $scope.conf.name,
                            codename : $scope.conf.codename,
                            model : $scope.conf.model,
                            supplier : $scope.conf.supplier,
                            jy_material_id:$scope.conf.material_key,
                            transfer_number:$scope.conf.transfer_number
                        }
                    );
                    $scope.showAddMaterial = false;
                };
                //关闭新增物资
                $scope.closeAddMaterial = function(){
                    $scope.showAddMaterial = false;
                };
                //删除一个物资
                $scope.deleteOneMaterial =function(id){
                    $scope.MaterialList.splice(id,1);
                };
                //确定调拨单
                $scope.addOneStorageSure = function(){
                    $scope.storageModel_copy = angular.copy($scope.storageModel);
                    $scope.storageModel_copy.transfer_date = $filter('datePickerFormat2')($scope.storageModel_copy.transfer_date);
                    $scope.storageModel_copy.status = 1;
                    var getInfo = {
                        transferInfo : $scope.storageModel_copy,
                        transferDetails : $scope.MaterialList
                    };
                    if($scope.MaterialList.length>0){
                        $scope.promise = indexService.addTransfer(getInfo).success(function(data){
                            if(data.success=="true"){
                                $scope.showAdd = false;
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = data.returnmsg;
                                        $scope.getEmployeesPage();
                                    }]
                                })
                            }else{
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert-error',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = data.returnmsg;
                                    }]
                                })
                            }
                        });
                    }else{
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = "物资不能为空!";
                            }]
                        })
                    }
                };
                // 初始化分页
                $scope.page={};
                $scope.pagesize = 10;
                $scope.page.pagenum = 1;
                $scope.spageselect=function(page){
                    $scope.getEmployeesPage(page);
                };

                //检测输入页数是否合法
                $scope.checkPageNum=function(pageNum,numPages){
                    var temp=/^\d+(\.\d+)?$/;
                    if(pageNum){
                        if(temp.test(pageNum)){
                            $scope.page.pagenum=pageNum;
                        }else{
                            $scope.page.pagenum='';
                            alert("请输入一个数字");
                        }
                        if(parseInt(pageNum)>numPages){
                            $scope.page.pagenum=numPages;
                            return false;
                        }
                    }
                };
                $scope.pageChanged = function() {
                    $scope.getEmployeesPage();
                };
                $scope.getEmployeesPage=function(){
                    var requestData = {};
                    requestData.start=($scope.page.pagenum-1)*$scope.pagesize;
                    requestData.limit=$scope.pagesize;
                    requestData.exeid='JY7001EQ002';
                    requestData.transfer_code = $scope.conf.transfer_code;
                    requestData.putin_user = $scope.add.putin_user;
                    requestData.putout_user = $scope.add.putout_user;
                    requestData.putin_storehouse_code = $scope.add.putin_storehouse_code;
                    requestData.putout_storehouse_code = $scope.add.putout_storehouse_code;
                    requestData.date_start = $filter('datePickerFormat')($scope.conf.startDate);
                    requestData.date_end = $filter('datePickerFormat')($scope.conf.endDate);


                    //项目信息列表查询
                    $scope.promise = commonQuery.listQuery(requestData).success(function(data){
                        if(data.success=="true"){
                            $scope.data = data.returndata.rows;
                            $scope.totalItems = data.returndata.results;
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                    //    .error(function(){
                    //    window.location.href = 'views/common/error.html'
                    //})
                };
                //默认查询页面数据
                $scope.getEmployeesPage();
                //查询
                $scope.search = function(){
                    $scope.getEmployeesPage();
                };
                //查询调拨单的物资明细
                $scope.getMaterialModifyList = function(id){
                    $scope.promise = commonQuery.listQuery({exeid:'JY7001EQ003',id:id}).success(function(data){
                        if(data.success=="true"){
                            $scope.MaterialModifyList = data.returndata.rows;
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                };
                $scope.storageModelModify = {};  //修改入库信息的对象
                //点击修改
                $scope.modifyMateriel = function(id,item){
                    $scope.jy_storehouse_in_id = id;
                    $scope.showModify = true;
                    $scope.getMaterialModifyList(id);
                    $scope.haveStorehouseCodeList($rootScope.id).then(function(result){
                        $scope.houseCodeList = result;
                    });
                    $scope.getUserList();
                    $scope.getHouseCode();
                    $scope.getALLMaterialList();
                    $scope.storageModelModify = item;
                    $scope.storageModelModify.transfer_date = $filter('timeFilter')($scope.storageModelModify.transfer_date);
                    $scope.storageModelModify.putout_user_name = $rootScope.name;
                };
                //关闭新增物资
                $scope.closeAddMaterialModify = function(){
                    $scope.showAddMaterialModify = false;
                };
                //修改--点击新增一条
                $scope.addMaterialModify = function(){
                    $scope.conf = {};
                    $scope.showAddMaterialModify = true;
                    //$scope.MaterialModifyList.push({jy_storehouse_in_id:$scope.jy_storehouse_in_id,jy_material_id:'',putin_number:''});
                };
                //点击下拉的将上面的值替换掉
                $scope.changevalue2 = function(name,key){
                    $scope.conf.material = name;
                    $scope.conf.material_key = key;
                    $scope.isShowMenu = false;
                    $scope.promise = indexService.getMaterialById({id:$scope.conf.material_key}).success(function(data){
                        if(data.success=="true"){
                            $scope.conf.code = data.returndata.code;
                            $scope.conf.codename = data.returndata.codename;
                            $scope.conf.model = data.returndata.model;
                            $scope.conf.supplier = data.returndata.supplier;
                            $scope.conf.name = data.returndata.name;
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                    $scope.storeNumber($scope.storageModelModify.putout_storehouse_code,$scope.conf.material_key);
                };
                //修改---确认新增一条
                $scope.addSureAddMaterialModify = function(){
                    $validator.validate($scope,'AddMaterial').success(function() {
                        $scope.showAddMaterialModify = false;
                        for(var i=0;i<$scope.MaterialModifyList.length;i++){
                            if($scope.conf.code == $scope.MaterialModifyList[i].material_code){
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = "该物资已存在,不允许重复添加!";
                                    }]
                                });
                                return;
                            }
                        }
                        $scope.MaterialModifyList.push(
                            {
                                material_code : $scope.conf.code,
                                material_name : $scope.conf.name,
                                material_type_name : $scope.conf.codename,
                                model : $scope.conf.model,
                                supplier : $scope.conf.supplier,
                                jy_material_id:$scope.conf.material_key,
                                transfer_number:$scope.conf.transfer_number
                            }
                        );
                    }).error(function(){

                    })
                };
                //删除一条
                $scope.deleteOneMaterialModify = function(id){
                    $scope.MaterialModifyList.splice(id,1);
                };
                //确定修改
                $scope.modifyOneStorageSure = function(){
                    $scope.storageModelModify_copy = angular.copy($scope.storageModelModify);
                    $scope.storageModelModify_copy.transfer_date = $filter('datePickerFormat2')($scope.storageModelModify_copy.transfer_date);
                    var getInfo = {
                        transferInfo : $scope.storageModelModify_copy,
                        transferDetails : $scope.MaterialModifyList
                    };
                    $scope.promise = indexService.modifyTransfer(getInfo).success(function(data){
                        if(data.success=="true"){
                            $scope.showModify = false;
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    $scope.getEmployeesPage();
                                }]
                            })
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                };
                //关闭修改
                $scope.closeForm2 = function(){
                    $scope.showModify = false;
                };
                //点击删除
                $scope.deleteMateriel = function(id){
                    $scope.m_id = id;
                    ngDialog.open({
                        template: 'views/common/confirm.html',
                        className: 'confirm',
                        showClose: true,
                        scope: $scope,
                        controller: ['$scope', function ($scope) {
                            $scope.confirmMsg = "是否确定删除！";
                        }]
                    })
                };
                //确定删除
                $scope.BeSure = function(){
                    $scope.promise = indexService.deleteTransfer({id:$scope.m_id}).success(function(data){
                        if(data.success=="true"){
                            ngDialog.close();
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    $scope.getEmployeesPage();
                                }]
                            })
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                };
                //取消删除
                $scope.BeCancel = function(){
                    ngDialog.close();
                };
                //确认入库
                $scope.inboundGoodsConfirmation = function(id){
                    $scope.promise = indexService.comfirmTransfer({id:id}).success(function(data){
                        if(data.success=="true"){
                            $scope.getEmployeesPage();
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    $scope.getEmployeesPage();
                                }]
                            })
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                }]
                            })
                        }
                    });
                };
                //详情
                $scope.MaterielDetails = function(id,item){
                    $scope.jy_storehouse_in_id = id;
                    $scope.showDetails = true;
                    $scope.getMaterialModifyList(id);
                    $scope.storageModelModify = item;
                    $scope.storageModelModify.transfer_date = $filter('timeFilter')($scope.storageModelModify.transfer_date);
                    $scope.storageModelModify.putout_user_name = $rootScope.name;
                };
                //关闭
                $scope.closeMaterialModifyDetails = function(){
                    $scope.showDetails = false;
                };
                //领料确认
                $scope.registrationSure = function(id){
                    $scope.sure_id = id;
                    $scope.showEnter = true;
                    $scope.conf.loginname = '';
                    $scope.conf.passwd = '';
                };
                //输入密码确认
                $scope.stockSure = function(){
                    $validator.validate($scope,'group_name').success(function() {
                        var receiveApplyMaterial = {
                            loginname : $scope.conf.loginname,
                            passwd : $scope.conf.passwd,
                            id : $scope.sure_id
                        };
                        $scope.promise = indexService.comfirmTransfer(receiveApplyMaterial).success(function(data){
                            if(data.success=="true"){
                                $scope.showEnter = false;
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = data.returnmsg;
                                        $scope.getEmployeesPage();
                                    }]
                                })
                            }else{
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert-error',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = data.returnmsg;
                                    }]
                                })
                            }
                        });
                    })
                };
                //关闭确认
                $scope.closeEnter = function(){
                    $scope.showEnter = false;
                };
            }
        ]);
});