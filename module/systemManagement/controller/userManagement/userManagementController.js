/**
 * Created by huangyao on 2017/5/16.
 */
define(['app'],function(app){
    app.register.controller('userManagementController',
        [
            '$scope',
            'commonQuery',
            'indexService',
            'ngDialog',
            '$state',
            '$validator',
            '$rootScope',
            function($scope,commonQuery,indexService,ngDialog,$state,$validator,$rootScope){
                $scope.delay = 3000;
                $scope.message = 'Please Wait...';
                $scope.promise = null;
                $scope.conf={
                    check_array:''
                };
                $scope.code={};
                $scope.adUser={};
                $scope.conf.userstatus = '';
                //组织下拉查询
                indexService.paramquery({exeid:'MS0000EQ001',param_type:'organize'}).success(function(data){
                    if(data.success=="true"){
                        $scope.paramquery = data.returndata.rows;
                    }else{
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert-error',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = data.returnmsg;
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
                            }]
                        })
                    }
                }).error(function(){
                    window.location.href = 'views/common/error.html';
                });
                //组织下拉查询
                indexService.paramquery({exeid:'MS0000EQ001',param_type:'storehouse'}).success(function(data){
                    if(data.success=="true"){
                        $scope.storehouse = data.returndata.rows;
                    }else{
                        ngDialog.open({
                            template: 'views/common/alert.html',
                            className: 'alert-error',
                            showClose: true,
                            scope: $scope,
                            controller: ['$scope', function ($scope) {
                                $scope.response = data.returnmsg;
                                setTimeout(function(){
                                    ngDialog.close();
                                },2000)
                            }]
                        })
                    }
                }).error(function(){
                    window.location.href = 'views/common/error.html';
                });
                //用户角色枚举
                commonQuery.meiJuQuery({enum:'xft.workbench.backstage.base.enumeration.user.UserRole'}).success(function(data){
                    if(data.success=="true"){
                        $scope.UserRole = data.returndata;
                    }
                });
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
                    requestData.exeid='MS0002EQ01';
                    requestData.start=($scope.page.pagenum-1)*$scope.pagesize;
                    requestData.limit=$scope.pagesize;
                    requestData.name = $scope.conf.name;
                    requestData.code = $scope.conf.code;
                    requestData.loginname = $scope.conf.loginname;
                    requestData.organize_code = $scope.conf.organize_code;
                    //用户信息列表查询
                    $scope.promise = indexService.userListQuery(requestData).success(function(data){
                        if(data.success=="true"){
                            $scope.data = data.returndata.rows;
                            $scope.totalItems = data.returndata.results;
                            for(var i=0;i<$scope.data.length;i++){
                                for(var j=0;j<$scope.paramquery.length;j++){
                                    if($scope.data[i].organize_code == $scope.paramquery[j].key){
                                        $scope.data[i].organize_code_name = $scope.paramquery[j].value;
                                    }
                                }
                            }
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    setTimeout(function(){
                                        ngDialog.close();
                                    },2000)
                                }]
                            })
                        }
                    }).error(function(){
                        window.location.href = 'views/common/error.html';
                    });
                };
                //默认查询列表数据
                $scope.getEmployeesPage();
                //初始化新增对象
                $scope.User = {
                    loginname : '',
                    name : '',
                    passwd : '',
                    role : '',
                    organize_code : '',
                    code : '',
                    ophone : '',
                    mphone : ''
                };
                /****************************新增用户**************************/
                //点击新增按钮
                $scope.addMenu = function(){
                    $scope.isShowfile=true;
                    $scope.adUser = {};
                };
                $scope.cancel = function(){
                    $scope.isShowfile=false;
                };
                //确认新增
                $scope.addUser = function(){
                    $scope.User = {
                        loginname : $scope.adUser.loginname,
                        passwd : $scope.adUser.passwd,
                        role : $scope.adUser.role,
                        organize_code : $scope.adUser.organize_code,
                        code : $scope.adUser.code,
                        name : $scope.adUser.name,
                        ophone : $scope.adUser.ophone,
                        mphone : $scope.adUser.mphone
                    };
                    $validator.validate($scope,'group_name').success(function() {
                        indexService.userAdd($scope.User).success(function (data) {
                            if (data.success == "true") {
                                $scope.isShowfile = false;
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = data.returnmsg;
                                        $scope.getEmployeesPage();
                                    }]
                                })
                            }else{
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert-error',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = data.returnmsg;
                                        setTimeout(function(){
                                            ngDialog.close();
                                        },2000)
                                    }]
                                })
                            }
                        }).error(function(){
                            window.location.href = 'views/common/error.html';
                        });
                    })
                };
                //修改用户
                //进入修改页面
                $scope.modify = function(item){
                    $scope.code = item;
                    $scope.code.passwd = '';
                    $scope.isShowmodify = true;
                };
                //取消修改
                $scope.cclModify = function(){
                    $scope.isShowmodify = false;
                };
                //确认修改
                $scope.modifyAtSure = function(){
                    var userModify = {
                        loginname : $scope.code.loginname,
                        name : $scope.code.name,
                        passwd : $scope.code.passwd,
                        role : $scope.code.role,
                        organize_code : $scope.code.organize_code,
                        code : $scope.code.code,
                        ophone : $scope.code.ophone,
                        mphone : $scope.code.mphone,
                        id : $scope.code.id
                    };
                    $validator.validate($scope,'user_name').success(function() {
                        indexService.userModify(userModify).success(function (data) {
                            if (data.success == "true") {
                                $scope.isShowmodify = false;
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = data.returnmsg;
                                        $scope.getEmployeesPage();
                                    }]
                                })
                            }else{
                                ngDialog.open({
                                    template: 'views/common/alert.html',
                                    className: 'alert-error',
                                    showClose: true,
                                    scope: $scope,
                                    controller: ['$scope', function ($scope) {
                                        $scope.response = data.returnmsg;
                                        setTimeout(function(){
                                            ngDialog.close();
                                        },2000)
                                    }]
                                })
                            }
                        }).error(function(){
                            window.location.href = 'views/common/error.html';
                        });
                    })
                };
                //关闭弹出框
                $scope.sure = function(){
                    ngDialog.close();
                };
                //停用  用户权限
                $scope.restore = function(index,id,userstatus){
                    indexService.stopUserService({id:id}).success(function(data){
                        if(data.success=="true"){
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    $scope.getEmployeesPage();
                                }]
                            })
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    setTimeout(function(){
                                        ngDialog.close();
                                    },2000)
                                }]
                            })
                        }
                    }).error(function(){
                        window.location.href = 'views/common/error.html';
                    });
                };
                //恢复用户权限
                $scope.restart = function(index,id,userstatus){
                    indexService.startUserService({id:id}).success(function(data){
                        if(data.success=="true"){
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    $scope.getEmployeesPage();
                                }]
                            })
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    setTimeout(function(){
                                        ngDialog.close();
                                    },2000)
                                }]
                            })
                        }
                    }).error(function(){
                        window.location.href = 'views/common/error.html';
                    });
                };
                //用户仓库编码列表查询
                $scope.haveStorehouseCode = function(){
                    indexService.haveStorehouseCode({id:$rootScope.id}).success(function(data){
                        if(data.success=="true"){
                            $scope.storeCode = data.returndata;
                            $('input:checkbox').each(function () {
                                for(var i=0;i<$scope.storeCode.length;i++){
                                    if ($(this).context.name === $scope.storeCode[i]) {
                                        $(this).attr('checked',true);
                                    }
                                }
                            });
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    setTimeout(function(){
                                        ngDialog.close();
                                    },2000)
                                }]
                            })
                        }
                    }).error(function(){
                        window.location.href = 'views/common/error.html';
                    });
                };
                //除登录用户之外的仓库编码列表查询
                $scope.otherHaveStorehouseCode = function(){
                    indexService.otherHaveStorehouseCode({id:$rootScope.id}).success(function(data){
                        if(data.success=="true"){
                            $scope.haveStoreCode = data.returndata;
                            $('input:checkbox').each(function () {
                                for(var i=0;i<$scope.haveStoreCode.length;i++){
                                    if ($(this).context.name === $scope.haveStoreCode[i]) {
                                        $(this).attr('checked',true);
                                        $(this).attr('disabled',true);
                                    }
                                }
                            });
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    setTimeout(function(){
                                        ngDialog.close();
                                    },2000)
                                }]
                            })
                        }
                    }).error(function(){
                        window.location.href = 'views/common/error.html';
                    });
                };
                //仓库设置
                $scope.setEntrepot = function(){
                    $scope.isShowEntrepot = true;
                    $scope.haveStorehouseCode();
                    $scope.otherHaveStorehouseCode();
                };
                //确认设置
                $scope.addEntrepot = function(){
                    $scope.storehouseCodesArr = [];
                    $('input:checkbox').each(function () {
                        if($(this).attr('checked')=='checked'){
                            $scope.storehouseCodesArr.push($(this).val());
                        }
                    });
                    for(var i=0;i<$scope.haveStoreCode.length;i++){
                        for(var j=0;j<$scope.storehouseCodesArr.length;j++){
                            if($scope.haveStoreCode[i] == $scope.storehouseCodesArr[j]){
                                $scope.storehouseCodesArr.splice(j,1)
                            }
                        }
                    }
                    indexService.setStorehouseCode({id:$rootScope.id,storehouseCodes:$scope.storehouseCodesArr}).success(function(data){
                        if(data.success=="true"){
                            $scope.isShowEntrepot = false;
                            $scope.getEmployeesPage();
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    setTimeout(function(){
                                        ngDialog.close();
                                    },2000)
                                }]
                            })
                        }else{
                            ngDialog.open({
                                template: 'views/common/alert.html',
                                className: 'alert-error',
                                showClose: true,
                                scope: $scope,
                                controller: ['$scope', function ($scope) {
                                    $scope.response = data.returnmsg;
                                    setTimeout(function(){
                                        ngDialog.close();
                                    },2000)
                                }]
                            })
                        }
                    }).error(function(){
                        window.location.href = 'views/common/error.html';
                    });
                };
                //取消设置
                $scope.cancelEntrepot = function(){
                    $scope.isShowEntrepot = false;
                };
            }
        ])
});