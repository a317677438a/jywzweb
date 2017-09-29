/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('materialTypeController',
    [
        '$scope',
        '$state',
        'ngDialog',
        'indexService',
        function($scope,$state,ngDialog,indexService){

            $scope.conf = {};
            $scope.data = [];
            $scope.message = 'Please Wait...';
            // 初始化分页
            $scope.page={};
            $scope.pagesize = 10;
            $scope.page.pagenum = 1;
            $scope.spageselect=function(page){
                $scope.getEmployeesPage(page);
            }

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
            }
            $scope.pageChanged = function() {
                $scope.getEmployeesPage();
            };
            $scope.getEmployeesPage=function(){
                var requestData = {};
                requestData.exeid='JY0001EQ002';
                requestData.start=($scope.page.pagenum-1)*$scope.pagesize;
                requestData.limit=$scope.pagesize;
                requestData.code = $scope.conf.searchCode;
                requestData.name = $scope.conf.searchName;

                //项目信息列表查询
                $scope.promise = indexService.getAllType(requestData).success(function(data){
                    if(data.success=="true"){
                        $scope.data=data.returndata.rows;
                        $scope.totalItems = data.returndata.results;
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
                }).error(function(){
                    window.location.href = 'views/common/error.html'
                })
            }
            //默认查询页面数据
            $scope.getEmployeesPage();
            //查询
            $scope.search = function(){
                $scope.getEmployeesPage();
            };

            //新增一条
            $scope.addMeterialType = function(){
                $scope.showAdd = true;
                $scope.nowAdd = true;
                $scope.promise =indexService.getMaterialType().success(function(data){
                    if(data.success=="true"){
                        $scope.maxNum = data.returndata;
                        $scope.conf.code = "JYWZLX"+$scope.maxNum;
                    }
                })
            };
            //确定新增
            $scope.addSure = function(){
                $scope.promise =indexService.addType({code:$scope.conf.code,name:$scope.conf.name}).success(function(data){
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
            //修改一条
            $scope.modify = function(id,item){
                $scope.id = id;
                $scope.conf = item;
                $scope.showAdd = true;
                $scope.nowAdd = false;
            };
            //确定修改
            $scope.modifySure = function(){
                $scope.showAdd = false;
                var type = {
                    id:$scope.id,
                    name:$scope.conf.name
                };
                $scope.promise = indexService.modifyType(type).success(function(data){
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
            };
            //删除
            $scope.delete = function(id){
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
                $scope.promise = indexService.deleteType({id:$scope.id}).success(function(data){
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