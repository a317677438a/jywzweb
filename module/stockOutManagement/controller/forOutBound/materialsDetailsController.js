/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('materialsDetailsController',
        [
            '$scope',
            'commonQuery',
            'indexService',
            'ngDialog',
            '$stateParams',
            '$rootScope',
            function($scope,commonQuery,indexService,ngDialog,$stateParams,$rootScope){

                $scope.message = 'Please Wait...';
                $scope.type = $stateParams.type;
                //保证当前导航菜单高亮
                var url = localStorage.getItem('url');
                if (document.getElementById('menuList')) {
                    var tagA = document.getElementById('menuList').getElementsByTagName('a');
                    for (var i in tagA) {
                        if (tagA.hasOwnProperty(i) && tagA[i].hash == url) {
                            tagA[i].className = 'on';
                        }
                    }
                }
                $scope.house = $stateParams.house; //领料仓库
                //查询一条申请单的物资明细信息
                //$scope.fromStockGetMaterial = function(id){
                //    $scope.promise = commonQuery.listQuery({id:$stateParams.id,exeid:'JY3001EQ003'}).success(function(data){
                //        if(data.success=="true"){
                //            $scope.MaterialListModify = data.returndata.rows;
                //        }else{
                //            ngDialog.open({
                //                template: 'views/common/alert.html',
                //                className: 'alert-error',
                //                showClose: true,
                //                scope: $scope,
                //                controller: ['$scope', function ($scope) {
                //                    $scope.response = data.returnmsg;
                //                }]
                //            })
                //        }
                //    });
                //};
                //$scope.fromStockGetMaterial();
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
                    //requestData.start=($scope.page.pagenum-1)*$scope.pagesize;
                    //requestData.limit=$scope.pagesize;
                    requestData.exeid = 'JY4001EQ003';
                    requestData.id = $stateParams.id;
                    //requestData.apply_code = $stateParams.code;
                    //requestData.apply_storehouse_code = $scope.house;
                    //requestData.apply_user_name = $rootScope.id;

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
            }
        ]);
});