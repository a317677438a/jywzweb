/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('ViewHoldController',
        [
            '$scope',
            '$filter',
            'commonQuery',
            'ngDialog',
            'indexService',
            'API_ENDPOINT',
            function($scope,$filter,commonQuery,ngDialog,indexService,API_ENDPOINT){

                $scope.message = 'Please Wait...';
                //输入第二个日期时检查是否大于等于第一个日期
                $scope.checkMinDate = function(start,end){
                    var sDate = parseInt($filter('datePickerFormat')(start));
                    var eDate = parseInt($filter('datePickerFormat')(end));
                    if(sDate>eDate){
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = "此日期需要大于或等于第一个日期";
                                $scope.conf.endDate = '';
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
                            }]
                        })
                    }
                };
                //所有物资下拉列表
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
                //点击鼠标显示下拉菜单
                $scope.showMenu = function(){
                    $scope.isShowMenu = true;
                };
                //点击下拉的将上面的值替换掉
                $scope.changevalue = function(name,key){
                    $scope.conf.jy_material_name = name;
                    $scope.conf.jy_material_id = key;
                    $scope.isShowMenu = false;
                };
                //点击其他地方关闭下拉框
                $scope.notShow = function(){
                    $scope.isShowMenu = false;
                };
                //清除所选
                $scope.removeName = function(){
                    $scope.conf.jy_material_name = '';
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
                    //项目信息列表查询
                    var info = {
                        jy_material_id : $scope.conf.jy_material_id
                    }
                    $scope.promise = indexService.materialsOwnNumber(info).success(function(data){
                        if(data.success=="true"){
                            $scope.data = data.returndata;
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
                $scope.getEmployeesPage();
                //下载
                $scope.downLoad = function(){
                    $scope.promise = indexService.downloadOwnNumber({}).success(function(data){
                        if(data){
                            var url=API_ENDPOINT.url+'materialown/downloadOwnNumber.json';
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