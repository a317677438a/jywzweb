/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('inventoryVerificationController',
    [
        '$scope',
        'commonQuery',
        'ngDialog',
        'indexService',
        'API_ENDPOINT',
        '$filter',
        function($scope,commonQuery,ngDialog,indexService,API_ENDPOINT,$filter){

            $scope.conf = {};
            $scope.conf.putin_storehouse_code = '';
            $scope.conf.jy_material_id = '';
            $scope.message = 'Please Wait...';
            //仓库查询
            $scope.paramquery = function(){
                indexService.paramquery({exeid:'MS0000EQ001',param_type:'storehouse'}).success(function(data){
                    if(data.success=="true"){
                        $scope.paramqueryArr = data.returndata.rows;
                        $scope.conf.putout_storehouse_code = $scope.paramqueryArr[0].key;
                    }
                });
            };
            $scope.paramquery();
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
                $scope.conf.jy_material_id = '';
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
                requestData.storehouse_code = $scope.conf.putout_storehouse_code;
                requestData.material_id = $scope.conf.jy_material_id;

                //项目信息列表查询
                $scope.promise = indexService.materialNumber(requestData).success(function(data){
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
                //    .error(function(){
                //    window.location.href = 'views/common/error.html'
                //})
            };
            //查询
            $scope.search = function(){
                $scope.getEmployeesPage();
            };
            //下载文档
            $scope.downLoad = function(){
                var downloadDetail = {
                    storehouse_code : $scope.conf.putout_storehouse_code,
                    material_id : $scope.conf.jy_material_id
                };
                $scope.promise = indexService.downloadTakestock(downloadDetail).success(function(data){
                    if(data){
                        var url=API_ENDPOINT.url+'takestock/downloadTakestock.json?'+$.param(downloadDetail);
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