/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('withdrawingMoneyController',
    [
        '$scope',
        'indexService',
        'ngDialog',
        'API_ENDPOINT',
        '$filter',
        'commonQuery',
        function($scope,indexService,ngDialog,API_ENDPOINT,$filter,commonQuery){

            $scope.conf = {};
            $scope.message = 'Please Wait...';
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
                requestData.exeid='JY6001EQ002';
                requestData.putin_type = '2';
                requestData.putin_code = $scope.conf.putin_code;
                requestData.cancel_user_name = $scope.conf.cancel_user_name;
                requestData.date_start = $filter('datePickerFormat')($scope.conf.startDate);
                requestData.date_end = $filter('datePickerFormat')($scope.conf.endDate);

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
            //确认入库
            $scope.inboundGoodsConfirmation = function(id){
                $scope.promise = indexService.materialbackconfirm({id:id}).success(function(data){
                    if(data.success=="true"){
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
        }
    ]);
});