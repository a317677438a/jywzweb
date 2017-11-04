/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('modifyGoodsReturnedController',
        [
            '$scope',
            'ngDialog',
            'indexService',
            '$validator',
            '$rootScope',
            '$filter',
            'commonQuery',
            function($scope,ngDialog,indexService,$validator,$rootScope,$filter,commonQuery){

                $scope.conf = {};
                $scope.message = 'Please Wait...';
                $scope.storageModel = {}; //新增退库单对象

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
                    requestData.exeid = 'JY3001EQ002';
                    requestData.status = $scope.conf.status;
                    requestData.putin_date_start = $filter('datePickerFormat')($scope.conf.startDate);
                    requestData.putin_date_end = $filter('datePickerFormat')($scope.conf.endDate);

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
                };
                //默认查询页面数据
                $scope.getEmployeesPage();
                //查询
                $scope.search = function(){
                    $scope.getEmployeesPage();
                };
                //所有物资下拉列表
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
                //查询查询物资在仓库的存量=入库数量-出库数据。以及用户持有物资的数量。
                $scope.materialOwnNumber = function(){
                    $scope.promise = indexService.materialOwnNumber({storehouse_code:$scope.storageModel.apply_storehouse_code,material_id:$scope.conf.material_key}).success(function(data){
                        if(data.success=="true"){
                            $scope.conf.storeNumber = data.returndata.storeNumber; //库存
                            $scope.conf.ownNumber = data.returndata.ownNumber; //当前物资拥有数量
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
                //点击新增退回单
                $scope.addMateriel = function(){
                    $scope.showAdd = true;
                    $scope.getCode();
                    $scope.getUserByRole();
                    $scope.storageModel.apply_user_name = $rootScope.name;
                    $scope.storageModel.apply_user = $rootScope.id;
                    $scope.storageModel.storehouse_user = ''; //仓管员
                    $scope.storageModel.apply_storehouse_code = ''; //仓库
                    $scope.storageModel.apply_date = new Date();
                };
                //自动生成退回单号
                $scope.getCode = function(){
                    $scope.promise = indexService.getCode({codeType:'TH'}).success(function(data){
                        if(data.success=="true"){
                            $scope.storageModel.apply_code = data.returndata.code;
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
                //查询某个角色下的用户列表。
                $scope.getUserByRole = function(){
                    $scope.promise = indexService.getUserByRole({role:2,exeid:'MS0002EQ01'}).success(function(data){  //查询物资已经对应的id
                        if(data.success=="true"){
                            $scope.UserByRole_canguan = data.returndata;
                            if($scope.UserByRole_canguan.length>0){
                                $scope.storageModel.storehouse_user = $scope.UserByRole_canguan[0].key;
                                $scope.haveStorehouseCode($scope.storageModel.storehouse_user);
                            }
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
                //查询仓管员对应的仓库编码
                $scope.haveStorehouseCode = function(id){
                    $scope.promise = indexService.haveStorehouseCodeList({id:id}).success(function(data){  //查询物资已经对应的id
                        if(data.success=="true"){
                            $scope.houseCodeList = data.returndata;
                            if($scope.houseCodeList.length>0){
                                $scope.storageModel.apply_storehouse_code = $scope.houseCodeList[0].key;
                            }
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
                //切换出库人
                $scope.getMyHouse = function(){
                    $scope.haveStorehouseCode($scope.storageModel.storehouse_user);
                };
                //关闭新增申领窗口
                $scope.closeForm = function(){
                    $scope.showAdd = false;
                };
                //点击新增物资
                $scope.MaterialList=[];
                $scope.addMaterial = function(){
                    $validator.validate($scope,'securities_name').success(function() {
                        $scope.showAddMaterial = true;
                        $scope.getALLMaterialList();
                        $scope.conf.material = '';
                        $scope.conf.code = '';
                        $scope.conf.name = '';
                        $scope.conf.codename = '';
                        $scope.conf.model = '';
                        $scope.conf.supplier = '';
                        $scope.conf.apply_number = '';
                    });
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
                    $scope.materialOwnNumber();
                };
                //点击其他地方关闭下拉框
                $scope.notShow = function(){
                    $scope.isShowMenu = false;
                };
                //清除所选
                $scope.removeName = function(){
                    $scope.conf.material = '';
                    $scope.conf.code = '';
                    $scope.conf.name = '';
                    $scope.conf.codename = '';
                    $scope.conf.model = '';
                    $scope.conf.supplier = '';
                    $scope.conf.storeNumber = '';
                    $scope.conf.apply_number = '';
                    $scope.conf.ownNumber = '';
                };
                //确定新增物资
                $scope.addSureAddMaterial = function(){
                    $validator.validate($scope,'AddStock').success(function() {   //继续申领
                        if($scope.conf.ownNumber == '0'){
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = "未拥有该物资!";
                                }]
                            });
                            return;
                        }
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
                        $scope.MaterialList.push(
                            {
                                code : $scope.conf.code,
                                name : $scope.conf.name,
                                codename : $scope.conf.codename,
                                model : $scope.conf.model,
                                supplier : $scope.conf.supplier,
                                jy_material_id:$scope.conf.material_key,
                                putin_number:$scope.conf.putin_number
                            }
                        );
                        $scope.showAddMaterial = false;
                    })
                };
                //关闭新增物资
                $scope.closeAddMaterialModify = function(){
                    $scope.showAddMaterial = false;
                };
                //删除一个物资
                $scope.deleteOneMaterial =function(id){
                    $scope.MaterialList.splice(id,1);
                };
                //关闭新增物资
                $scope.closeAddMaterial = function(){
                    $scope.showAddMaterial = false;
                };
                //确定新增退回单
                $scope.addOneStorageSure = function(){
                    $scope.storageModel_copy = angular.copy($scope.storageModel);
                    $scope.storageModel_copy.apply_date = $filter('datePickerFormat2')($scope.storageModel_copy.apply_date);
                    var getInfo = {
                        putin_code : $scope.storageModel_copy.apply_code,
                        putin_user : $scope.storageModel_copy.storehouse_user,
                        putin_date : $scope.storageModel_copy.apply_date,
                        putin_storehouse_code : $scope.storageModel_copy.apply_storehouse_code,
                        remark : $scope.storageModel_copy.remark
                    };
                    $scope.promise = indexService.addMaterialback({materialBackInfo:getInfo,materialBackDetails:$scope.MaterialList}).success(function(data){
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
                };
            }
        ]);
});