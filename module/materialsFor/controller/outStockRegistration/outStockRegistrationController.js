/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('outStockRegistrationController',
        [
            '$scope',
            'commonQuery',
            'ngDialog',
            '$filter',
            '$validator',
            'indexService',
            function($scope,commonQuery,ngDialog,$filter,$validator,indexService){

                $scope.conf = {};
                $scope.message = 'Please Wait...';
                //申领状态
                commonQuery.meiJuQuery({enum:'xft.workbench.backstage.base.enumeration.material.ApplyStatus'}).success(function(data){
                    if(data.success=="true"){
                        $scope.ApplyStatus = data.returndata;
                    }
                });
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
                    requestData.apply_code = $scope.conf.apply_code;
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
                //领料确认
                $scope.registrationSure = function(id){
                    $scope.id = id;
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
                            id : $scope.id,
                            status : '4'
                        };
                        $scope.promise = indexService.receiveApplyMaterial(receiveApplyMaterial).success(function(data){
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
                //审批拒绝
                $scope.refuseStock = function(){
                    $scope.showRefuse = true;
                };
                //关闭确认
                $scope.closeEnter = function(){
                    $scope.showEnter = false;
                };
                //关闭拒绝
                $scope.closeRefuse = function(){
                    $scope.showRefuse = false;
                };
            }
        ]);
});