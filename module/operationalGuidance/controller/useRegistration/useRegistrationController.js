/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('useRegistrationController',
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
                $scope.getALLMaterialList();
                //点击鼠标显示下拉菜单
                $scope.showMenu = function(){
                    $scope.isShowMenu = true;
                };
                //点击下拉的将上面的值替换掉
                $scope.changevalue = function(name,key){
                    $scope.conf.jy_material_name = name;
                    $scope.conf.jy_material_id = key;
                    $scope.isShowMenu = false;
                };
                //点击其他地方关闭下拉框
                $scope.notShow = function(){
                    $scope.isShowMenu = false;
                };
                //清除所选
                $scope.removeName = function(){
                    $scope.conf.jy_material_name = '';
                };
                //查询物资使用情况
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
                    requestData.exeid='JY5001EQ001';
                    requestData.date_start = $filter('datePickerFormat2')($scope.conf.startDate);
                    requestData.date_end = $filter('datePickerFormat2')($scope.conf.endDate);
                    requestData.jy_material_id = $scope.conf.jy_material_id;

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
                };
                $scope.getEmployeesPage();
                //当前用户持有某个物资库存
                $scope.materialOwnNumber = function(){
                    $scope.promise = indexService.materialOwnNumberMaterialuse({material_id:$scope.conf.material_key}).success(function(data){
                        if(data.success=="true"){
                            $scope.conf.ownNumber = data.returndata.ownNumber;
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
                //点击新增使用情况
                $scope.addMateriel = function(){
                    $scope.showAdd = true;
                    $scope.storageModel.putin_user_name = $rootScope.name;
                    $scope.conf.use_date = new Date();
                    $scope.conf.remark = '';
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
                    //$scope.MaterialList.push({jy_material_id:'',putin_number:''});
                };
                //点击鼠标显示下拉菜单
                $scope.showAMenu = function(){
                    $scope.isShowAMenu = true;
                };
                //点击下拉的将上面的值替换掉
                $scope.changeAvalue = function(name,key){
                    $scope.conf.material = name;
                    $scope.conf.material_key = key;
                    $scope.isShowAMenu = false;
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
                    $scope.materialOwnNumber();  //查询拥有的物资数量
                };
                //点击其他地方关闭下拉框
                $scope.notAShow = function(){
                    $scope.isShowAMenu = false;
                };
                //清除所选
                $scope.removeAName = function(){
                    $scope.conf.material = ''
                };
                //关闭新增物资
                $scope.closeAddMaterial = function(){
                    $scope.showAdd = false;
                };
                //确定新增使用情况
                $scope.addSureAddMaterial = function(){
                    $scope.conf.use_date_copy = $filter('datePickerFormat2')(angular.copy($scope.conf.use_date));
                    var getInfo = {
                        jy_material_id : $scope.conf.material_key,
                        use_date : $scope.conf.use_date_copy,
                        use_number : $scope.conf.use_number,
                        remark : $scope.conf.remark
                    };
                    $validator.validate($scope,'AddMaterial').success(function() {
                        $scope.promise = indexService.addMaterialuse({materialUseInfo:getInfo}).success(function(data){
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
                    })
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
            }
        ]);
});