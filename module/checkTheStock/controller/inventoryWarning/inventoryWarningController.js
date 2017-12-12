/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('inventoryWarningController',
    [
        '$scope',
        'indexService',
        'ngDialog',
        'API_ENDPOINT',
        'commonQuery',
        '$validator',
        function($scope,indexService,ngDialog,API_ENDPOINT,commonQuery,$validator){

            $scope.conf = {};
            $scope.message = 'Please Wait...';
            $scope.showAdd = false;
            $scope.add = {};
            //查询所有仓库
            $scope.promise = indexService.paramquery({exeid:'MS0000EQ001',param_type:'storehouse'}).success(function(data){
                if(data.success=="true"){
                    $scope.storehouseList =  data.returndata.rows;
                    if($scope.storehouseList.length>0){
                        $scope.conf.warn_storehouse_code = $scope.storehouseList[0].key;
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
            //添加物资--当前出库仓库管理员对应仓库的物资库存
            $scope.storeNumber = function(code,id){
                $scope.promise = indexService.materialOwnNumber({storehouse_code:code,material_id:id}).success(function(data){
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
            $scope.getALLMaterialList();
            //点击新增预警
            $scope.addWarning = function(){
                $scope.showAdd = true;
            };
            //点击鼠标显示下拉菜单
            $scope.showMenuAdd = function(){
                $scope.isShowMenuAdd = true;
            };
            //点击下拉的将上面的值替换掉
            $scope.changevalueAdd = function(name,key){
                $scope.conf.material = name;
                $scope.conf.material_key = key;
                $scope.isShowMenuAdd = false;
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
                $scope.storeNumber($scope.conf.warn_storehouse_code,$scope.conf.material_key);
            };
            //点击其他地方关闭下拉框
            $scope.notShowAdd = function(){
                $scope.isShowMenuAdd = false;
            };
            //清除所选
            $scope.removeNameAdd = function(){
                $scope.conf.material = '';
                $scope.conf.material_key = '';
            };
            //切换存放仓库
            $scope.getMaterial = function(){
                $scope.conf.code = '';
                $scope.conf.codename = '';
                $scope.conf.model = '';
                $scope.conf.supplier = '';
                $scope.conf.name = '';
                $scope.conf.material = '';
                $scope.conf.material_key = '';
                $scope.conf.storeNumber = '';
                $scope.conf.warn_number = '';
                $scope.conf.transfer_number = '';
            };
            //确认新增
            $scope.addSureAddMaterial = function(){
                $validator.validate($scope,'AddMaterial').success(function() {
                    if(parseFloat($scope.conf.storeNumber)>0){
                        var addmaterialwarn = {
                            jy_material_id : $scope.conf.material_key,
                            warn_storehouse_code : $scope.conf.warn_storehouse_code,
                            warn_number : $scope.conf.transfer_number,
                            remark : $scope.conf.remark
                        };
                        $scope.promise = indexService.addmaterialwarn({materialWarnInfo:addmaterialwarn}).success(function(data){
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
                    }
                })
            };
            //关闭新增
            $scope.closeAddMaterial = function(){
                $scope.showAdd = false;
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
                requestData.exeid='JY8001EQ003';
                requestData.warn_storehouse_code = $scope.add.putout_storehouse_code;
                requestData.jy_material_id = $scope.add.jy_material_name;


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
            //点击鼠标显示下拉菜单
            $scope.showMenu = function(){
                $scope.isShowMenu = true;
            };
            //点击下拉的将上面的值替换掉
            $scope.changevalue = function(name,key){
                $scope.add.material = name;
                $scope.add.material_key = key;
                $scope.isShowMenu = false;
            };
            //点击其他地方关闭下拉框
            $scope.notShow = function(){
                $scope.isShowMenu = false;
            };
            //清除所选
            $scope.removeName = function(){
                $scope.add.material = '';
                $scope.add.material_key = '';
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
                $scope.promise = indexService.deletematerialwarn({id:$scope.m_id}).success(function(data){
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