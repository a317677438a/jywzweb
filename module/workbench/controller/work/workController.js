/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('workController',
        [
            '$scope',
            function($scope){
                //初始化提醒控件
                var date = new Date();
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
                $scope.remindInfos = [];
                setTimeout(function(){
                    $('.calendar').fullCalendar({
                        header: {
                            left: 'prev,next,today',
                            center: 'title',
                            right: 'month,agendaWeek,agendaDay'
                        },
                        buttonText:{
                            today:'跳转到当天'
                        },
                        name : 'month',
                        selectable: true,
                        selectHelper: true,
                        //select: function(start, end) {  //点击日期弹出浏览器默认的新增事件窗口
                        //    var title = prompt('新增提醒：');
                        //    var eventData;
                        //    if (title) {
                        //        eventData = {
                        //            title: title,
                        //            start: start,
                        //            end: end
                        //        };
                        //        $('.calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                        //    }
                        //    $('.calendar').fullCalendar('unselect');
                        //},
                        editable: false,
                        eventLimit: true,
                        events: $scope.remindInfos,
                        dayClick: function(event, jsEvent, view) {
                            ngDialog.close();
                            $scope.clickName = "新增事件";
                            $scope.clickType = 1;
                            $("#reservebox").dialog({
                                width:800,
                                onClose:function(){
                                    $(this).dialog('destroy');
                                }
                            });
                            $("#reservebox").dialog("open");
                            $("#projectFile").css('display', 'block');
                            $scope.$apply(function(){
                                $scope.conf.usename = $rootScope.logoName;
                                $scope.conf.node = '';
                                $scope.conf.startDate = $filter('timeFilter')($filter('datePickerFormat')(event));
                            })
                            //确定新增
                            $scope.assetSure = function(){
                                ngDialog.close();
                                $scope.clickName = "新增事件";
                                $scope.clickType = 1;
                                $("#reservebox").dialog({
                                    width:800,
                                    onClose:function(){
                                        $(this).dialog('destroy');
                                    }
                                });
                                $("#reservebox").dialog("open");
                                $("#projectFile").css('display', 'block');
                                //$scope.$apply(function(){
                                $scope.conf.startDate = $filter('timeFilter')($filter('datePickerFormat')(event));
                                //})
                            }
                            //取消
                            $scope.assetCancel = function(){
                                ngDialog.close();
                            }
                        },
                        eventClick: function(event) {
                            $scope.$apply(function(){
                                $scope.canModify = true;
                                $scope.clickName = "事件";
                                $scope.clickType = 2;
                                $scope.modifyId = event.id;
                                $scope.create_user_id = event.create_user_id;
                                $scope.modifyDate = event.start;
                                if(event.title_copy.indexOf('：')>0){
                                    $scope.conf.node = event.title_copy.substring(event.title_copy.indexOf('：')+1,event.title_copy.length);
                                }else{
                                    $scope.conf.node = event.title_copy
                                }
                                $scope.conf.usename = event.create_user_name;
                                $scope.conf.startDate = $filter('timeFilter')($filter('datePickerFormat')($scope.modifyDate));
                                if($scope.create_user_id != $rootScope.userId){  //判断是不是本人操作
                                    $scope.canModify = false;
                                }
                            })
                            $("#reservebox").dialog({
                                width:800,
                                onClose:function(){
                                    $(this).dialog('destroy');
                                }
                            });
                            $("#reservebox").dialog("open");
                            $("#projectFile").css('display', 'block');
                            return false;
                        },
                    });
                },500);
            }
        ]);
});