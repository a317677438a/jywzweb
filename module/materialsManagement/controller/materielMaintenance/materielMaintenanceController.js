
/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('materielMaintenanceController',
    [
        '$scope',
        'ngDialog',
        'indexService',
        '$validator',
        function($scope,ngDialog,indexService,$validator){

            $scope.conf = {};
            $scope.data = [];
            $scope.message = 'Please Wait...';
            //查询物资类型编号与物资类型名称
            $scope.promise =indexService.getMaterialTypeAndName().success(function(data){
                if(data.success=="true"){
                    $scope.TypeAndName = data.returndata;
                }
            })
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
                requestData.name = $scope.conf.searchName;

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
                            template: 'views/common/alertButton.html',
                            className: 'alertButton-error',
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
            //点击新增
            $scope.addMateriel = function(){
                $scope.showAdd = true;
                $scope.nowAdd = true;
                $scope.promise =indexService.getMaterialNum().success(function(data){
                    if(data.success=="true"){
                        $scope.maxNum = data.returndata;
                        if($scope.maxNum===0){
                            $scope.conf.code = "WZ1";
                        }else{
                            $scope.conf.code = "WZ"+$scope.maxNum;
                        }
                    }else{
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert-error',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = data.returnmsg;
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
                            }]
                        })
                    }
                });
            };
            //确定新增
            $scope.addSure = function(){
                var addMaterial = {
                    code : $scope.conf.code,
                    name : $scope.conf.name,
                    jy_material_type_id : $scope.conf.jy_material_type_id,
                    model : $scope.conf.model,
                    supplier : $scope.conf.supplier
                };
                $scope.promise =indexService.addMaterial(addMaterial).success(function(data){
                    if(data.success=="true"){
                        $scope.showAdd = false;
                        $scope.conf = {};
                        $scope.getEmployeesPage();
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = data.returnmsg;
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
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
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
                            }]
                        })
                    }
                });
            };
            //关闭新增
            $scope.closeFileForm = function(){
                $scope.showAdd = false;
            };
            //点击修改
            $scope.modifyMateriel = function(id,item){
                $scope.id = id;
                $scope.conf = item;
                $scope.showAdd = true;
                $scope.nowAdd = false;
            };
            //确定修改
            $scope.modifySure = function(){
                $scope.showAdd = false;
                var material = {
                    id:$scope.id,
                    jy_material_type_id:$scope.conf.jy_material_type_id,
                    code:$scope.conf.code,
                    name:$scope.conf.name,
                    model:$scope.conf.model,
                    supplier:$scope.conf.supplier
                };
                $validator.validate($scope,'group_name').success(function() {
                    $scope.promise = indexService.modifyMaterial(material).success(function(data){
                        if(data.success=="true"){
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
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
                    })
                })
            };
            //删除
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
                $scope.promise = indexService.deleteMaterial({id:$scope.id}).success(function(data){
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