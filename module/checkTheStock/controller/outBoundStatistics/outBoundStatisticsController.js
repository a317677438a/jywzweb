/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('outBoundStatisticsController',
        [
            '$scope',
            'commonQuery',
            'ngDialog',
            'indexService',
            'API_ENDPOINT',
            '$filter',
            function($scope,commonQuery,ngDialog,indexService,API_ENDPOINT,$filter){

                $scope.conf = {};
                $scope.conf.putout_code = '';
                $scope.conf.putout_storehouse_code = '';
                $scope.conf.putout_user_name = '';
                $scope.conf.startDate = '';
                $scope.conf.endDate = '';
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
                    requestData.exeid = 'JY4001EQ004';
                    requestData.putout_code = $scope.conf.putout_code;
                    requestData.putout_storehouse_code = $scope.conf.putout_storehouse_code;
                    requestData.putout_user_name = $scope.conf.putout_user_name;
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

                //下载文档
                $scope.downLoad = function(ul,filename,suffix){
                    var downloadDetail = {
                        exeid : 'JY4001EQ004',
                        putout_storehouse_code : $scope.conf.putout_storehouse_code,
                        putout_code : $scope.conf.putout_code,
                        putout_user_name : $scope.conf.putout_user_name
                    }
                    $scope.promise = indexService.downloadDetail(downloadDetail).success(function(data){
                        if(data){
                            var url=API_ENDPOINT.url+'storehouseout/downloadDetail.json?'+$.param(downloadDetail);
                            setTimeout(function(){
                                window.open(url);
                            },1000)
                        }
                    }).error(function(){
                        window.location.href = 'views/common/error.html';
                    })
                }
            }
        ]);
});