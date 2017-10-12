/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('materialRequisitionController',
        [
            '$scope',
            'commonQuery',
            'ngDialog',
            'indexService',
            '$validator',
            '$filter',
            function($scope,commonQuery,ngDialog,indexService,$validator,$filter){

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
                //同意或者拒绝对象
                $scope.doPass = {};
                $scope.doPass.review_date = new Date();
                //同意
                $scope.passMaterial = function(id,item){
                    $scope.item = item;
                    $scope.showPass = true;
                    $scope.nowAdd = true;
                };
                //确认审核意见
                $scope.addSure = function(){
                    $validator.validate($scope,'group_name').success(function() {
                        var reviewApply = {
                            id :  $scope.item.id,
                            status : '3',
                            review_date : $filter('datePickerFormat')($scope.doPass.review_date),
                            review_remark : $scope.doPass.review_remark
                        };
                        $scope.promise = indexService.reviewApply(reviewApply).success(function(data){
                            if(data.success=="true"){
                                $scope.showPass = false;
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
                //拒绝
                $scope.refuseMaterial = function(item){
                    $scope.item = item;
                    $scope.showPass = true;
                    $scope.nowAdd = false;
                };
                //确认审核意见
                $scope.modifySure = function(){
                    $validator.validate($scope,'group_name').success(function() {
                        var reviewApply = {
                            id :  $scope.item.id,
                            status : '2',
                            review_date : $filter('datePickerFormat')($scope.doPass.review_date),
                            review_remark : $scope.doPass.review_remark
                        };
                        $scope.promise = indexService.reviewApply(reviewApply).success(function(data){
                            if(data.success=="true"){
                                $scope.showPass = false;
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
                //关闭弹出界面
                $scope.closeFileForm = function(){
                    $scope.showPass = false;
                }
            }
        ]);
});