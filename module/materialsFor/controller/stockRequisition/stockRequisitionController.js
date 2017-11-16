/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('stockRequisitionController',
        [
            '$scope',
            'commonQuery',
            'indexService',
            'ngDialog',
            '$filter',
            '$validator',
            '$rootScope',
            function($scope,commonQuery,indexService,ngDialog,$filter,$validator,$rootScope){

                $scope.conf = {};
                $scope.message = 'Please Wait...';
                $scope.storageModel = {}; //新增入库单对象
                //申领状态
                commonQuery.meiJuQuery({enum:'xft.workbench.backstage.base.enumeration.material.ApplyStatus'}).success(function(data){
                    if(data.success=="true"){
                        $scope.ApplyStatus = data.returndata;
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
                //查询某个角色下的用户列表。
                $scope.getUserByRole = function(type){
                    $scope.promise = indexService.getUserByRole({role:type,exeid:'MS0002EQ01'}).success(function(data){  //查询物资已经对应的id
                        if(data.success=="true"){
                            if(type==2){
                                $scope.UserByRole_canguan = data.returndata;
                            }else if(type==3){
                                $scope.UserByRole_lingdao = data.returndata;
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
                //新增申领单---查询出库人对应的仓库编码
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
                //新增申领单---自动生成申领单号
                $scope.getCode = function(){
                    $scope.promise = indexService.getCode({codeType:'SQ'}).success(function(data){
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
                //新增申领单---添加物资--所有物资下拉列表
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
                //点击新增申领单
                $scope.addMateriel = function(){
                    $scope.showAdd = true;
                    $scope.storageModel.apply_user_name = $rootScope.name;
                    $scope.storageModel.apply_user = $rootScope.id;
                    $scope.storageModel.storehouse_user = ''; //出库人
                    $scope.storageModel.apply_storehouse_code = ''; //领料仓库
                    $scope.storageModel.review_user = ''; //审批人
                    $scope.storageModel.apply_date = new Date();
                    $scope.MaterialList = [];
                    $scope.getCode();
                    $scope.getUserByRole(2);
                    $scope.getUserByRole(3);
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
                };
                //确定新增物资
                $scope.addSureAddMaterial = function(){
                    $validator.validate($scope,'AddStock').success(function() {   //继续申领
                        $scope.doSure = function(){
                            ngDialog.close();
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
                            if($scope.conf.storeNumber=='' || $scope.conf.storeNumber==='0'){
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = "该物资库存为零，不可申领!";
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
                                    apply_number:$scope.conf.apply_number
                                }
                            );
                            $scope.showAddMaterial = false;
                        };
                        //取消申领
                        $scope.doCancel = function(){
                            ngDialog.close();
                        };
                        if(parseInt($scope.conf.ownNumber)>0){
                            ngDialog.open({
                                template: 'views/common/confirmstock.html',
                                className: 'confirm',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.confirmMsg = "该物资您当前已拥有" + $scope.conf.ownNumber +"个,是否继续申领？";
                                }]
                            });
                        }else{
                            $scope.doSure();
                        }
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
                //确定新增申领单
                $scope.addOneStorageSure = function(){
                    $scope.storageModel_copy = angular.copy($scope.storageModel);
                    $scope.storageModel_copy.apply_date = $filter('datePickerFormat2')($scope.storageModel_copy.apply_date);
                    var getInfo = {
                        applyInfo : $scope.storageModel_copy,
                        applyDetailList : $scope.MaterialList
                    };
                    $scope.promise = indexService.addApply(getInfo).success(function(data){
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
                //查询一条申请单的物资明细信息
                $scope.fromStockGetMaterial = function(id){
                    $scope.promise = commonQuery.listQuery({id:id,exeid:'JY3001EQ003'}).success(function(data){
                        if(data.success=="true"){
                            $scope.MaterialListModify = data.returndata.rows;
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
                /**************************************************************修改**********************************************************/
                $scope.storageModelModify = {};  //修改入库信息的对象
                //点击修改
                $scope.modifyMateriel = function(id,item){
                    $scope.jy_storehouse_in_id = id;
                    $scope.showModify = true;
                    $scope.fromStockGetMaterial(id);
                    $scope.storageModelModify = item;
                    $scope.storageModelModify.apply_date = $filter('timeFilter')($scope.storageModelModify.apply_date);
                    $scope.getUserByRole(2);
                    $scope.getUserByRole(3);
                    $scope.haveStorehouseCode($scope.storageModelModify.storehouse_user);
                };
                //点击新增一个物资
                $scope.addMaterialModify = function(){
                    $validator.validate($scope,'modify_securities_name').success(function() {
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

                $scope.addSureModifyMaterial = function(){
                    $validator.validate($scope,'ModifyStock').success(function() {//继续申领
                        $scope.doSure = function(){
                            for(var i=0;i<$scope.MaterialListModify.length;i++){
                                if($scope.conf.code == $scope.MaterialListModify[i].code){
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
                            $scope.MaterialListModify.push(
                                {
                                    code : $scope.conf.code,
                                    name : $scope.conf.name,
                                    codename : $scope.conf.codename,
                                    model : $scope.conf.model,
                                    supplier : $scope.conf.supplier,
                                    jy_material_id:$scope.conf.material_key,
                                    apply_number:$scope.conf.apply_number
                                }
                            );
                            $scope.showAddMaterial = false;
                        };
                        //取消申领
                        $scope.doCancel = function(){
                            ngDialog.close();
                        };
                        if(parseInt($scope.conf.ownNumber)>0){
                            ngDialog.open({
                                template: 'views/common/confirmstock.html',
                                className: 'confirm',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.confirmMsg = "该物资您当前已拥有" + $scope.ownNumber +"个,是否继续申领？";
                                }]
                            });
                        }else if(parseInt($scope.conf.apply_number)>parseInt($scope.conf.storeNumber)){
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = "申领数量不能大于库存数量！";
                                }]
                            });
                        }
                        else{
                            $scope.doSure();
                        }
                    })
                };
                //关闭修改申领窗口
                $scope.closeModifyMaterialModify = function(){
                    $scope.showAddMaterial = false;
                };
                //删除一个物资
                $scope.deleteOneModifyMaterial = function(id){
                    $scope.MaterialListModify.splice(id,1);
                };
                //确定修改
                $scope.modifyOneStorageSure = function(){
                    $scope.storageModelModify_copy = angular.copy($scope.storageModelModify);
                    $scope.storageModelModify_copy.apply_date = $filter('datePickerFormat2')($scope.storageModelModify_copy.apply_date);
                    var getInfo = {
                        applyInfo : $scope.storageModelModify_copy,
                        applyDetailList : $scope.MaterialListModify
                    };
                    $scope.promise = indexService.modifyApply(getInfo).success(function(data){
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
                /********************************************************删除申请单*************************************************/
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
                    $scope.promise = indexService.deleteApply({id:$scope.id}).success(function(data){
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
            }
        ]);
});