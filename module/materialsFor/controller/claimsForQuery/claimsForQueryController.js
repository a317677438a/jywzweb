/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('claimsForQueryController',
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
                //仓库查询
                $scope.paramquery = function(){
                    indexService.paramquery({exeid:'MS0000EQ001',param_type:'storehouse'}).success(function(data){
                        if(data.success=="true"){
                            $scope.paramqueryArr = data.returndata.rows;
                        }
                    });
                };
                $scope.paramquery();
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
                    requestData.exeid = 'JY3001EQ008';
                    requestData.apply_code = $scope.conf.apply_code;
                    requestData.apply_storehouse_code = $scope.conf.apply_storehouse_code;
                    requestData.apply_user_name = $scope.conf.apply_user_name;


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
            }
        ]);
});