/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('materialTypeController',
    [
        '$scope',
        '$state',
        'ngDialog',
        function($scope,$state,ngDialog){

            $scope.conf = {};
            $scope.data = [];
            //新增一条
            $scope.addMeterialType = function(){
                $scope.showAdd = true;
                $scope.nowAdd = true;
            };
            //确定新增
            $scope.addSure = function(){
                $scope.data.push({code:$scope.conf.code,name:$scope.conf.name});
                $scope.showAdd = false;
                $scope.conf = {};
                ngDialog.open({
                    template: 'views/common/alert.html',
                    className: 'alert',
                    showClose: true,
                    scope: $scope,
                    controller: ['$scope', function ($scope) {
                        $scope.response = "新增物资类型成功！";
                        setTimeout(function(){
                            ngDialog.close();
                        },2000)
                    }]
                })
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
                $scope.data.splice($scope.id,1,$scope.conf);
                $scope.showAdd = false;
                $scope.conf = {};
                ngDialog.open({
                    template: 'views/common/alert.html',
                    className: 'alert',
                    showClose: true,
                    scope: $scope,
                    controller: ['$scope', function ($scope) {
                        $scope.response = "修改物资类型成功！";
                        setTimeout(function(){
                            ngDialog.close();
                        },2000)
                    }]
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
                $scope.data.splice($scope.id,1);
                ngDialog.open({
                    template: 'views/common/alert.html',
                    className: 'alert',
                    showClose: true,
                    scope: $scope,
                    controller: ['$scope', function ($scope) {
                        $scope.response = "删除物资类型成功！";
                        setTimeout(function(){
                            ngDialog.close();
                        },2000)
                    }]
                })
            };
            //取消删除
            $scope.BeCancel = function(){
                ngDialog.close();
            };
        }
    ]);
});