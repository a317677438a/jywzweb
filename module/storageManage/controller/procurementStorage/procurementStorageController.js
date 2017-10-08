/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('procurementStorageController',
        [
            '$scope',
            'ngDialog',
            'indexService',
            'commonQuery',
            '$filter',
            '$rootScope',
            '$validator',
            function($scope,ngDialog,indexService,commonQuery,$filter,$rootScope,$validator){

                $scope.conf = {};
                $scope.message = 'Please Wait...';
                $scope.storageModel = {}; //新增入库单对象
                //入库类型枚举
                commonQuery.meiJuQuery({enum:'xft.workbench.backstage.base.enumeration.material.StockType'}).success(function(data){
                    if(data.success=="true"){
                        $scope.StockType = data.returndata;
                    }
                });

                //获取当前日期与时间
                $scope.getNewDate = function(type){
                    var newDate = new Date();
                    var year = String(newDate.getFullYear())+String((newDate.getMonth()+1))+String(newDate.getDate());
                    var time = String(newDate.getHours())+String(newDate.getMinutes())+String(newDate.getSeconds());
                    if(type=='1'){
                        return year;
                    }else if(type=='2'){
                        return time;
                    }
                };

                //输入第二个日期时检查是否大于等于第一个日期
                $scope.checkMinDate = function(start,end){
                    var sDate = parseInt($filter('datePickerFormat')(start));
                    var eDate = parseInt($filter('datePickerFormat')(end));
                    if(sDate>eDate){
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = "此日期需要大于或等于第一个日期";
                                $scope.conf.endDate = '';
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
                            }]
                        })
                    }
                };
                ////查询物资已经对应的id
                $scope.getMaterialAndId = function(){
                    $scope.promise = indexService.getMaterialAndId().success(function(data){  //查询物资已经对应的id
                        if(data.success=="true"){
                            $scope.MaterialAndId = data.returndata;
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
                $scope.getMaterialAndId();
                //新增入库---自动生成入库单号
                $scope.getCode = function(){
                    $scope.promise = indexService.getCode({codeType:'CG'}).success(function(data){  //查询物资已经对应的id
                        if(data.success=="true"){
                            $scope.storageModel.putin_code = data.returndata.code;
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
                //新增入库---查询入库仓库编码
                $scope.haveStorehouseCodeList = function(){
                    $scope.promise = indexService.haveStorehouseCodeList({id:$rootScope.id}).success(function(data){  //查询物资已经对应的id
                        if(data.success=="true"){
                            $scope.houseCodeList = data.returndata;
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
                //新增入库---添加物资--所有物资下拉列表
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
                //点击新增入库
                $scope.addMateriel = function(){
                    $scope.showAdd = true;
                    $scope.storageModel.putin_type = '1';
                    $scope.storageModel.putin_user_name = $rootScope.name;
                    $scope.storageModel.putin_date = new Date();
                    $scope.getCode();
                    $scope.haveStorehouseCodeList();
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
                $scope.addSureAddMaterial = function(){
                    $validator.validate($scope,'AddMaterial').success(function() {
                        $scope.showAddMaterial = false;
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
                    })
                };
                //关闭新增物资
                $scope.closeAddMaterialModify = function(){
                    $scope.showAddMaterialModify = false;
                };
                //删除一个物资
                $scope.deleteOneMaterial =function(id){
                    $scope.MaterialList.splice(id,1);
                };
                //确定新增入库单
                $scope.addOneStorageSure = function(){
                    var year = $scope.getNewDate('1');
                    var time = $scope.getNewDate('2');
                    $scope.storageModel.crt_date = year;
                    $scope.storageModel.crt_time = time;
                    $scope.storageModel_copy = angular.copy($scope.storageModel);
                    $scope.storageModel_copy.putin_date = $filter('datePickerFormat2')($scope.storageModel_copy.putin_date);
                    $scope.storageModel_copy.status = 1;
                    var getInfo = {
                        stockInfo : $scope.storageModel_copy,
                        stockDetailsList : $scope.MaterialList
                    };
                    if($scope.MaterialList.length>0){
                        $scope.promise = indexService.addStock(getInfo).success(function(data){
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
                    requestData.contract_no = $scope.conf.contract_no;
                    requestData.putin_date_start = $scope.conf.startDate;
                    requestData.putin_date_end = $scope.conf.endDate;
                    requestData.putin_type = 1;

                    //项目信息列表查询
                    $scope.promise = indexService.getAllStock(requestData).success(function(data){
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
                //查询入库单对应的入库明细
                $scope.fromStockGetMaterial = function(id){
                    $scope.promise = indexService.fromStockGetMaterial({id:id}).success(function(data){
                        if(data.success=="true"){
                            $scope.MaterialListModify = data.returndata;
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
                //查询入库单的物资明细
                $scope.getMaterialModifyList = function(id){
                    $scope.promise = commonQuery.listQuery({exeid:'JY2001EQ008',id:id}).success(function(data){
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
                    //$scope.fromStockGetMaterial(id);
                    $scope.getMaterialModifyList(id);
                    $scope.haveStorehouseCodeList();
                    $scope.getALLMaterialList();
                    $scope.storageModelModify = item;
                    $scope.storageModelModify.putin_date = $filter('timeFilter')($scope.storageModelModify.putin_date);
                    $scope.storageModelModify.putin_user_name = $rootScope.name;
                };
                //修改--点击新增一条
                $scope.addMaterialModify = function(){
                    $scope.conf = {};
                    $scope.showAddMaterialModify = true;
                    //$scope.MaterialModifyList.push({jy_storehouse_in_id:$scope.jy_storehouse_in_id,jy_material_id:'',putin_number:''});
                };
                //修改---确认新增一条
                $scope.addSureAddMaterialModify = function(){
                    $validator.validate($scope,'AddMaterial').success(function() {
                        $scope.showAddMaterialModify = false;
                        for(var i=0;i<$scope.MaterialModifyList.length;i++){
                            if($scope.conf.code == $scope.MaterialModifyList[i].code){
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
                                code : $scope.conf.code,
                                name : $scope.conf.name,
                                codename : $scope.conf.codename,
                                model : $scope.conf.model,
                                supplier : $scope.conf.supplier,
                                jy_material_id:$scope.conf.material_key,
                                putin_number:$scope.conf.putin_number
                            }
                        );
                    })
                };
                //删除一条
                $scope.deleteOneMaterialModify = function(id){
                    $scope.MaterialModifyList.splice(id,1);
                };
                //确定修改
                $scope.modifyOneStorageSure = function(){
                    $scope.storageModelModify_copy = angular.copy($scope.storageModelModify);
                    $scope.storageModelModify_copy.putin_date = $filter('datePickerFormat2')($scope.storageModelModify_copy.putin_date);
                    $scope.storageModelModify_copy.status = 1;
                    var getInfo = {
                        stockInfo : $scope.storageModelModify_copy,
                        stockDetailsList : $scope.MaterialModifyList
                    };
                    $scope.promise = indexService.modifyOneStock(getInfo).success(function(data){
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
                    $scope.id = id;
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
                    $scope.promise = indexService.deleteOneStock({id:$scope.id}).success(function(data){
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
                    $scope.promise = indexService.inboundGoodsConfirmation({id:$scope.id}).success(function(data){
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
                    $scope.showDetails = true;
                    $scope.jy_storehouse_in_id = id;
                    $scope.getMaterialModifyList(id);
                    $scope.haveStorehouseCodeList();
                    $scope.getALLMaterialList();
                    $scope.storageModelModify = item;
                    $scope.storageModelModify.putin_date = $filter('timeFilter')($scope.storageModelModify.putin_date);
                    $scope.storageModelModify.putin_user_name = $rootScope.name;
                };
                //关闭
                $scope.closeMaterialModifyDetails = function(){
                    $scope.showDetails = false;
                }
            }
        ]);
});