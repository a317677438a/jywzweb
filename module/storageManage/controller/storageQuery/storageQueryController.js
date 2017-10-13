/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('storageQueryController',
    [
        '$scope',
        'indexService',
        'ngDialog',
        'API_ENDPOINT',
        '$filter',
        'commonQuery',
        function($scope,indexService,ngDialog,API_ENDPOINT,$filter,commonQuery){

            $scope.conf = {};
            $scope.conf.startDate = '';
            $scope.conf.endDate = '';
            $scope.conf.putin_storehouse_code = '';
            $scope.conf.putin_code = '';
            $scope.conf.putin_user_name = '';
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
                requestData.exeid='JY2001EQ009';
                requestData.putin_storehouse_code = $scope.conf.putin_storehouse_code;
                requestData.putin_code = $scope.conf.putin_code;
                requestData.putin_user_name = $scope.conf.putin_user_name;

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
            //下载文档
            $scope.downLoad = function(ul,filename,suffix){
                var downloadDetail = {
                    exeid : 'JY2001EQ009',
                    putin_storehouse_code : $scope.conf.putin_storehouse_code,
                    putin_code : $scope.conf.putin_code,
                    putin_user_name : $scope.conf.putin_user_name,
                    putin_date_start : $filter('datePickerFormat')($scope.conf.startDate),
                    putin_date_end : $filter('datePickerFormat')($scope.conf.endDate)
                }
                $scope.promise = indexService.downloadDetailIno(downloadDetail).success(function(data){
                    if(data){
                        var url=API_ENDPOINT.url+'storehousein/downloadDetail.json?'+$.param(downloadDetail);
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