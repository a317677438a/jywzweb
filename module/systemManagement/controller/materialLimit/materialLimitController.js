/**
 * Created by huangyao on 2018-1-5.
 */
define(['app'],function(app){
    app.register.controller('materialLimitController',
        [
            '$scope',
            'ngDialog',
            'indexService',
            '$validator',
            function($scope,ngDialog,indexService,$validator){
                $scope.conf = {};
                $scope.data = [];
                $scope.materiel = {};
                $scope.message = 'Please Wait...';
                //查询物资类型编号与物资类型名称
                $scope.promise =indexService.getMaterialTypeAndName().success(function(data){
                    if(data.success=="true"){
                        $scope.TypeAndName = data.returndata;
                    }
                });
                //点击鼠标显示下拉菜单
                $scope.showMenuName = function(){
                    $scope.isShowMenuName = true;
                };
                //点击下拉的将上面的值替换掉
                $scope.changevalue = function(name,key){
                    $scope.conf.jy_material_type_id = name;
                    $scope.conf.jy_material_type_name = key;
                    $scope.isShowMenuName = false;
                };
                //点击其他地方关闭下拉框
                $scope.notShow = function(){
                    $scope.isShowMenuName = false;
                };
                //清楚所选
                $scope.removeName = function(){
                    $scope.conf.jy_material_type_id = '';
                    $scope.conf.jy_material_type_name = '';
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
                $scope.getALLMaterialList();
                //点击新增物资
                $scope.addMaterial = function(){
                    $scope.conf = {};
                    $scope.showAddMaterial = true;
                };
                //点击鼠标显示下拉菜单
                $scope.showMaterialMenu = function(){
                    $scope.isShowMaterialMenu = true;
                };
                //点击下拉的将上面的值替换掉
                $scope.changematerialvalue = function(name,key){
                    $scope.conf.searchName_type = name;
                    $scope.conf.searchName = key;
                    $scope.isShowMaterialMenu = false;
                };
                //点击其他地方关闭下拉框
                $scope.notShowMaterial = function(){
                    $scope.isShowMaterialMenu = false;
                };
                //清除所选
                $scope.removeMaterialName = function(){
                    $scope.conf.searchName_type = '';
                    $scope.conf.searchName = '';
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
                    requestData.exeid='JY0002EQ001';
                    requestData.start=($scope.page.pagenum-1)*$scope.pagesize;
                    requestData.limit=$scope.pagesize;
                    requestData.code = $scope.conf.searchCode;
                    requestData.id = $scope.conf.searchName;
                    requestData.jy_material_type_id = $scope.conf.jy_material_type_name;

                    //项目信息列表查询
                    $scope.promise = indexService.getAllMaterial(requestData).success(function(data){
                        if(data.success=="true"){
                            $scope.data = data.returndata.rows;
                            $scope.totalItems = data.returndata.results;
                            for(var i=0;i<$scope.data.length;i++){
                                for(var j=0;j<$scope.TypeAndName.length;j++){
                                    if($scope.data[i].jy_material_type_id == $scope.TypeAndName[j].key){
                                        $scope.data[i].type_name = $scope.TypeAndName[j].value;
                                    }
                                }
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
                //设置物资限制
                $scope.modifyMateriel = function(id,item){
                    $scope.showAdd = true;
                    $scope.nowAdd = true;
                    $scope.materiel = item;
                    $scope.m_id = id;
                };
                //确认设置限制
                $scope.setMaterial = function(){
                    $validator.validate($scope,'AddStock').success(function() {
                        $scope.promise = indexService.modifyMaterialUselimit({materialId:$scope.m_id,use_limit:$scope.materiel.use_limit}).success(function(data){
                            if(data.success=="true"){
                                $scope.showAdd = false;
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.getEmployeesPage();
                                        $scope.response = data.returnmsg;
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
                //关闭设置
                $scope.closeFileForm = function(){
                    $scope.showAdd = false;
                    $scope.getEmployeesPage();
                }
            }
        ]);
});