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
            function($scope,commonQuery,indexService,ngDialog){

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
                //点击新增入库
                $scope.addMateriel = function(){
                    $scope.showAdd = true;
                    $scope.storageModel.putin_type = '1';
                };
                //关闭新增窗口
                $scope.closeForm = function(){
                    $scope.showAdd = false;
                };
                //点击新增物资
                $scope.MaterialList=[];
                $scope.addMaterial = function(){
                    $scope.MaterialList.push({jy_material_id:'',putin_number:''});
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
                $scope.storageModelModify = {};  //修改入库信息的对象
                //点击修改
                $scope.modifyMateriel = function(id,item){
                    $scope.jy_storehouse_in_id = id;
                    $scope.showModify = true;
                    $scope.fromStockGetMaterial(id);
                    $scope.storageModelModify = item;
                    $scope.storageModelModify.putin_date = $filter('timeFilter')($scope.storageModelModify.putin_date);
                };
                $scope.addMaterialModify = function(){
                    $scope.MaterialListModify.push({jy_storehouse_in_id:$scope.jy_storehouse_in_id,jy_material_id:'',putin_number:''});
                };
                $scope.deleteOneMaterialModify = function(id){
                    $scope.MaterialListModify.splice(id,1);
                };
                //确定修改
                $scope.modifyOneStorageSure = function(){
                    $scope.storageModelModify_copy = angular.copy($scope.storageModelModify);
                    $scope.storageModelModify_copy.putin_date = $filter('datePickerFormat2')($scope.storageModelModify_copy.putin_date);
                    $scope.storageModelModify_copy.status = 1;
                    var getInfo = {
                        stockInfo : $scope.storageModelModify_copy,
                        stockDetailsList : $scope.MaterialListModify
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
            }
        ]);
});