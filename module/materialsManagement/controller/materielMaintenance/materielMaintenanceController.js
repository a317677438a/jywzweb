
/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('materielMaintenanceController',
    [
        '$scope',
        'ngDialog',
        'FileUploader',
        'API_ENDPOINT',
        function($scope,ngDialog,FileUploader,API_ENDPOINT){
            //保证当前导航菜单高亮
            var url=localStorage.getItem('url');
            if(document.getElementById('menuList')){
                var tagA=document.getElementById('menuList').getElementsByTagName('a');
                for(var i in tagA){
                    if(tagA.hasOwnProperty(i) && tagA[i].hash==url){
                        tagA[i].className='on';
                    }
                }
            }
            $scope.isNow = 1;
            $scope.showLoad = false;
            //切换tab页
            $scope.getActive = function (id) {
                $scope.isNow = id;
            };
            //上传
            var uploader = $scope.uploader = new FileUploader(  //直接导入
                {
                    url: API_ENDPOINT.url + 'business/externalDataImport.json',
                    withCredentials: true,
                    removeAfterUpload: true
                    //formData: [{ts_project_info_id: $scope.procurementStorage.project_name}]
                }
            );
            $scope.forUpload = function(){
                $scope.showLoad = true;
                //ngDialog.open({
                //    template: 'views/common/importFor.html',
                //    className: 'alert',
                //    showClose: true,
                //    scope: $scope,
                //    controller: ['$scope', function ($scope) {
                //        var uploader = $scope.uploader = new FileUploader({
                //            url: API_ENDPOINT.url+'asset/uploadFile.json',
                //            withCredentials : true,
                //            removeAfterUpload: true,
                //        });
                //    }]
                //})
            };
            //关闭
            $scope.closeFileForm = function(){
                $scope.showLoad = false;
            }
        }
    ]);
});