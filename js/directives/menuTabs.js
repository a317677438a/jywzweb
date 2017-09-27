/**
 * Created by HuangYao on 2016/2/29.
 *
 * 自定义公共指令
 */
angular.module('menuTabs',[])
    //导航栏点击变色和保持变色的指令
    .directive('menuTabs',function($rootScope,$location){
        return{
            restrict:'EA',
            scope : {},
            link:function(scope,ele,attr){
                ele.removeClass('on');
                if(attr.href == location.hash){
                    ele.addClass('on');
                    $rootScope.pageTitle=ele.text();  //浏览器标签页显示的标题
                }

                scope.$on("$locationChangeSuccess", function(){  //路由切换成功
                    if(attr.href == location.hash.split('?')[0]){
                        ele.addClass('on');
                        $rootScope.pageTitle=ele.text();
                        localStorage.setItem('url',location.hash);
                    }
                    else if(attr.href.indexOf('?')>0&&location.hash.indexOf('?')>0){
                        var str1 = attr.href.split('?')[0];
                        var str2 = location.hash.split('?')[0];
                        if(str1 == str2){
                            ele.addClass('on');
                            $rootScope.pageTitle=ele.text();  //浏览器标签页显示的标题
                        }
                    }
                    else{
                        ele.removeClass('on');
                    }
                });
            }
        };
    })
    //下拉多选
    .directive('dragList', function(){
        return {
            replace : true,
            templateUrl : 'drag-list.html',
            scope : {
                data : '=',
                selected : '=',
                type : '=',
                selectInput : '&'
            },
            link : function(scope, el, attrs){
                var tag = attrs.tag;
                var add = function(){
                    if(!scope.selected[tag]) return;
                    var arr = JSON.parse(scope.selected[tag]), type;
                    if(arr instanceof Array){
                        for(var i= 0, len=arr.length; i<len; i++){
                            type = map(arr[i], scope.data);
                            if(type){
                                updateSelection('add', tag, type[1].key, type[1].value);
                                scope.checkbox[type[0]] = true;
                            }
                        }
                    }else{
                        console.log('网络不好');
                    }
                };
                var map = function(key, arr){
                    var n;
                    for(var i= 0, len=arr.length; i<len; i++){
                        n = arr[i];
                        if(key == n.key){
                            return [i,n];
                        }
                    }
                };
                var updateSelection = function(state, tag, id, value){
                    scope.assetTypeTags.push(value);
                    scope.selectInput({
                        state : state,
                        tag : tag,
                        id : id
                    });
                };
                scope.conf = {
                    showList : false
                };
                scope.checkbox = {};

                //var timer = setInterval(function(){
                //    //等待scope.selected和scope.data都有数据时才执行
                //    if(Object.keys(scope.selected).length !== 0 && Object.keys(scope.data).length !== 0){
                //        clearInterval(timer);
                //        scope.$watch('selected', function(newVal){
                //            if(newVal){
                //                scope.assetTypeTags = [];
                //                add();
                //            }
                //        });
                //    }
                //}, 100);
                var timer = setInterval(function(){
                    //等待scope.selected和scope.data都有数据时才执行
                    if(scope.selected!= undefined && scope.data!= undefined){
                        clearInterval(timer);
                        scope.$watch('selected', function(newVal){
                            if(newVal){
                                scope.assetTypeTags = [];
                                add();
                            }
                        });
                    }
                }, 100);
                scope.assetTypeTags = [];
                scope.isShowList = function(e){
                    e.stopPropagation();
                    scope.conf.showList= true;
                };
                scope.updateSelection = function($event,type){
                    var index = 0;
                    if($event.currentTarget.checked){
                        if(scope.type!='0'){
                            updateSelection('add', tag, type.key, type.value);
                        }
                        if(scope.type=='0'){  //返回数据没有key的时候
                            updateSelection('add', tag, type.value, type.value);
                        }
                    }else{
                        if(scope.type!='0'){
                            index = scope.assetTypeTags.indexOf(type.value);
                            scope.assetTypeTags.splice(index, 1);
                            scope.selectInput({
                                state : 'remove',
                                tag : tag,
                                id : type.key
                            });
                        }
                        if(scope.type=='0'){ //返回数据没有key的时候
                            index = scope.assetTypeTags.indexOf(type.value);
                            scope.assetTypeTags.splice(index, 1);
                            scope.selectInput({
                                state : 'remove',
                                tag : tag,
                                id : type.value
                            });
                        }
                    }
                };

                scope.$on('dragclose', function(){  //关闭下拉
                    scope.$apply(function(){
                        scope.conf.showList = false;
                    });
                });
                scope.$on('dragreset', function(){  //重置
                    scope.assetTypeTags = [];
                    for(var i=0;i<scope.data.length;i++){
                        scope.checkbox[i] = false;
                    }
                });
                scope.$on('dragAllAddress', function(){  //全选--地区
                    if(scope.type=='0') { //返回数据没有key的时候
                        for (var i = 0; i < scope.data.length; i++) {
                            scope.checkbox[i] = true;
                            updateSelection('add', tag, scope.data[i].value, scope.data[i].value);
                        }
                    }
                });
                scope.$on('dragAll', function(event,data){  //全选
                    if(scope.type!='0'&&tag==data) {
                        for (var i = 0; i < scope.data.length; i++) {
                            scope.checkbox[i] = true;
                            updateSelection('add', tag, scope.data[i].key, scope.data[i].value);
                        }
                    }
                });
                scope.$on('dragClear', function(event,data){  //取消全选
                    if(scope.type!='0'&&tag==data) {
                        for (var i = 0; i < scope.data.length; i++) {
                            scope.checkbox[i] = false;
                            index = scope.assetTypeTags.indexOf(scope.data[i].value);
                            scope.assetTypeTags.splice(index, 1);
                            scope.selectInput({
                                state : 'remove',
                                tag : tag,
                                id : scope.data[i].key
                            });
                        }
                    }
                   if(scope.type=='0'){
                        for (var j = 0; j < scope.data.length; j++) {
                            scope.checkbox[j] = false;
                            index = scope.assetTypeTags.indexOf(scope.data[j].value);
                            scope.assetTypeTags.splice(index, 1);
                            scope.selectInput({
                                state : 'remove',
                                tag : tag,
                                id : scope.data[j].value
                            });
                        }
                    }
                });
            }
        };
    })
    //弹出框可拖动
    .directive('dragGable', ['$document', function($document) {
        return function(scope, element, attr) {
            var startX = 0, startY = 0, x = 0, y = 0;
            element= angular.element(document.getElementsByClassName("modal-dialog"));
            element.css({
                cursor: 'move'
            });

            element.on('mousedown', function(event) {
                // Prevent default dragging of selected content
                event.preventDefault();
                startX = event.pageX - x;
                startY = event.pageY - y;
                $document.on('mousemove', mousemove);
                $document.on('mouseup', mouseup);
            });

            function mousemove(event) {
                y = event.pageY - startY;
                x = event.pageX - startX;
                element.css({
                    top: y + 'px',
                    left: x + 'px'
                });
            }

            function mouseup() {
                $document.off('mousemove', mousemove);
                $document.off('mouseup', mouseup);
            }
        };
    }]);



