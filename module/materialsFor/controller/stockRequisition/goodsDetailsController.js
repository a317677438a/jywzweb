/**
 * Created by huangyao on 2017/10/5.
 */
define(['app'],function(app){
    app.register.controller('goodsDetailsController',
        [
            '$scope',
            'commonQuery',
            'indexService',
            'ngDialog',
            function($scope,commonQuery,indexService,ngDialog){

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
            }
        ]);
});