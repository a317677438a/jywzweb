/**
 * Created by huangyao on 2017/5/25.
 */
define(['app'],function(app){
    app.register.controller('addProjectController',
        [
            '$scope',
            function($scope){
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
                $scope.One = {};
                $scope.conf = {};
                $scope.conf.showPlan={};
                $scope.conf.name={};
                $scope.conf.phone={};
                $scope.conf.company={};
                $scope.conf.email={};
                $scope.conf.note={};
                $scope.isNow = 1;
                $scope.myArr = [
                    {name:1,phone:1,company:1,email:1,note:1},
                    {name:2,phone:2,company:1,email:1,note:1},
                    {name:1,phone:1,company:1,email:1,note:1}
                ];
                //点击新增项目相关人员
                $scope.addShow = function(){
                    $scope.ShowAdd = true;
                };
                //关闭新增页面
                $scope.closeAdd = function(){
                    $scope.ShowAdd = false;
                };
                //关闭下拉多选框
                angular.element(document.body).on('click', function(){
                    $scope.$broadcast('dragclose');
                });

                /**************项目通讯录****************/
                $scope.addOneMsg = function(){  //点击新增一条按钮
                    $scope.One = {};
                    $scope.isShowPlan = true; //新增一条的判断依据
                };
                $scope.savePlan = function(){  //保存 新增一条
                    $scope.myArr.push($scope.One);
                    $scope.isShowPlan = false;
                };
                $scope.closeDoor = function(){  //关闭 新增一条
                    $scope.isShowPlan = false;
                };
                //初始化不显示修改的输入框
                $scope.reset = function(){
                    $scope.myArr.forEach(function(el,i){
                        $scope.conf.showPlan[i] = false;
                    });
                };
                $scope.reset();
                //点击修改一条记录
                $scope.modifyPlan = function(id){
                    $scope.myArr.forEach(function(el,i){
                        if(id==i){
                            $scope.conf.showPlan[i] = true;
                            $scope.conf.name[i] = el.name;
                            $scope.conf.phone[i] = el.phone;
                            $scope.conf.company[i] = el.company;
                            $scope.conf.email[i] = el.email;
                            $scope.conf.note[i] = el.note;
                        }
                    });
                };
                //确定修改一条记录
                $scope.modifyPlanSure = function(id){
                    $scope.myArr[id].name = $scope.conf.name[id];
                    $scope.myArr[id].phone = $scope.conf.phone[id];
                    $scope.myArr[id].company = $scope.conf.company[id];
                    $scope.myArr[id].email = $scope.conf.email[id];
                    $scope.myArr[id].note = $scope.conf.note[id];
                    $scope.reset();
                };
                //删除一条记录
                $scope.deletePlan = function(id){
                    $scope.myArr.splice(id,1);
                };
            }
        ]);
});