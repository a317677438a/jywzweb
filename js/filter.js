/**
 * Created by huangyao on 2017/5/31.
 */
angular.module('filter', [])
// 用户姓名长度过长
    .filter('nameLength', function () {
        return function (val) {
            if (val) {
                if (val.length > 5) {
                    return val.substring(0, 5) + '...';
                } else {
                    return val;
                }
            }
        };
    })
    //用户类型过滤器
    .filter('userType', function () {
        return function (val) {
            switch (val) {
                case "1" :
                    return '系统管理员';
                case "2" :
                    return '仓管员';
                case "3" :
                    return '领导';
                case "4" :
                    return '物资申请人';
            }
        };
    })
    //用户状态过滤器
    .filter('userstatus', function () {
        return function (val) {
            switch (val) {
                case "1" :
                    return '正常';
                case "2" :
                    return '停用';
            }
        };
    })
    //资产包性质
    .filter('groupProperty', function () {
        return function (val) {
            switch (val) {
                case "0":
                    return '静态';
                case "1":
                    return '循环';
            }
        };
    })
    //入库单状态
    .filter('StorageStatus', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '待确认';
                case "2":
                    return '合格在库';
            }
        };
    })
    //资产还款方式
    .filter('repayType', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '等额本息';
                case "2":
                    return '等额本金';
                case "3":
                    return '气球贷(尾款自成一期)';
                case "4":
                    return '气球贷(尾款合并)';
                case "5":
                    return '到期一次性还本付息';
                case "6":
                    return '按期付息还本';
                case "7":
                    return '先息后本';
                case "8":
                    return '等本等息';
            }
        };
    })
    //还款频率
    .filter('repayment_freq', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '每月';
                case "2":
                    return '每季';
                case "3":
                    return '——';
            }
        };
    })
    //项目类型
    .filter('projectType', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '个人消费贷款';
                case "2":
                    return '汽车抵押贷款';
                case "3":
                    return '住房抵押贷款';
                case "4":
                    return '企业贷款';   //住房公积金贷款
                case "5":
                    return '企业贷款';
                case "6":
                    return '企业应收帐款';
            }
        };
    })
    //项目状态
    .filter('projectStatus', function () {
        return function (val) {
            switch (val) {
                case "0":
                    return '产品设计';
                case "1":
                    return '方案审核完成';
                case "2":
                    return '发行完成';
                default :
                    return val;
            }
        };
    })
    //机构类型
    .filter('orgType', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '发起机构';
                case "2":
                    return '受托机构';
                case "3":
                    return '项目评级机构';
                case "4":
                    return '项目增级机构';
                case "5":
                    return '财务顾问';
                case "6":
                    return '会计事务所';
                case "7":
                    return '律师事务所';
                case "8":
                    return '管理机构';
                case "9":
                    return '投资人';
            }
        };
    })
    //权限类型
    .filter('rightType', function () {
        return function (val) {
            switch (val) {
                case "0":
                    return '业务操作权限';
                case "1":
                    return '系统管理权限';
            }
        };
    })
    //支付类型
    .filter('pay_type', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '税金';

                case "2":
                    return '费用';

                case "3":
                    return '机构报酬';

                case "4":
                    return '本金支出';

                case "5":
                    return '利息支出';

            }
        };
    })
    //产品设计与发行——费用类型
    .filter('feeTypeName', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '税金';

                case "2":
                    return '费用';

                case "3":
                    return '机构报酬';

            }
        };
    })
    //产品设计与发行——支付频率
    .filter('feeCycleName', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '一次性支付';

                case "2":
                    return '按期支付';

                /*   case "3":return '按季支付';
                 break;
                 case "4":return '半年支付';
                 break;
                 case "5":return '按年支付';
                 break;
                 case "6":return '其他';
                 break;*/

            }
        };
    })
    //产品设计与发行——付息频率
    .filter('payName', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '按月付息';

                case "2":
                    return '按季付息';

                case "3":
                    return '按半年付息';

                case "4":
                    return '按年付息';

                case "5":
                    return '到期付息';

                case "6":
                    return '其他';

            }
        };
    })
    //计息方式
    .filter('interest_count', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return 'Act/360';

                case "2":
                    return 'Act/365';

                case "3":
                    return 'Act/Act';

                case "Act":
                    return 'Act';

            }
        };
    })

    //模板类型
    .filter('model_type', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '个人消费贷款';

                case "2":
                    return '汽车抵押贷款';

                case "3":
                    return '住房抵押贷款';

                case "4":
                    return '企业贷款';

                case "5":
                    return '企业贷款';

                case "101":
                    return '动态池数据模板';

                case "102":
                    return '静态池数据模板';

                case "103":
                    return '借款人行业模板';

                case "104":
                    return '财务年报模板';

                case "105":
                    return '资产数据更新模板';
            }
        };
    })

    //业务模板类型
    .filter('bmodel_type', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '计划说明书';

                case "2":
                    return '法律意见书';

                case "3":
                    return '信用评级报告';

                case "4":
                    return '关于专项计划会计处理意见的说明';

                case "5":
                    return '基础资产转 让评估报告/现金流预测分析报告';

                case "6":
                    return '专项计划尽职调查报告';

                case "7":
                    return '专项计划标准条款';

                case "8":
                    return '资产支持证券认购协议与风险揭示书';

                case "9":
                    return '专项计划资产买卖协议';

                case "10":
                    return '专项计划托管协议';

                case "11":
                    return '专项计划监管协议';

                case "12":
                    return '担保协议或担保函、担保方公司内部担保决议/差额支付承诺函';

                case "13":
                    return '专项计划资产服务协议';

                case "14":
                    return '其他补充合同';

            }
        };
    })

    //央行存贷款基准利率类型
    .filter('adjustRateType', function () {
        return function (val) {
            switch (val) {
                case '100':
                    return '存款活期';

                case '110':
                    return '存款定期-三个月';

                case '120':
                    return '存款定期-半年';

                case '130':
                    return '存款定期-一年';

                case '140':
                    return '存款定期-二年';

                case '150':
                    return '存款定期-三年';

                case '160':
                    return '存款定期-五年';

                case '210':
                    return '商业贷款-六个月';

                case '220':
                    return '商业贷款-一年';

                case '230':
                    return '商业贷款-三年';

                case '240':
                    return '商业贷款-五年';

                case '250':
                    return '商业贷款-五年以上';

                case '310':
                    return '公积金贷款-五年';

                case '320':
                    return '公积金贷款-五年以上';

            }
        };
    })
    //本金还款方式
    .filter('SecuriPrinRepm', function () {
        return function (val) {
            switch (val) {
                case '1':
                    return '过手型';

                case '2':
                    return '计划摊还型';

                case '3':
                    return '到期一次性还本付息';

            }
        };
    })
    //信用评级
    .filter('BondRating', function () {
        return function (val) {
            switch (val) {
                case '1':
                    return 'AAA';
                case '2':
                    return 'AA+';
                case '3':
                    return 'AA';
                case '4':
                    return 'AA-';
                case '5':
                    return 'A+';
                case '6':
                    return 'A';
                case '7':
                    return 'A-';
                case '8':
                    return 'BBB+';
                case '9':
                    return 'BBB-';
                case '10':
                    return '-';
            }
        };
    })
    //导入结果---导入文件类型
    .filter('FileTypeEnum', function () {
        return function (val) {
            switch (val) {
                case '1':
                    return '资产数据';
                case '2':
                    return '还本付息计划';
            }
        };
    })
    //导入结果---导入状态
    .filter('ImportStatusEnum', function () {
        return function (val) {
            switch (val) {
                case '0':
                    return '导入中';
                case '1':
                    return '导入完成';
            }
        };
    })
    //循环期状态
    .filter('cycleStatus', function () {
        return function (val) {
            switch (val) {
                case '0':
                    return '购买准备';
                case '1':
                    return '购买确认';
                case '2':
                    return '待复核';
            }
        };
    })
    //证券类型
    .filter('productType', function () {
        return function (val) {
            switch (val) {
                case '1':
                    return '优先档';
                case '2':
                    return '劣后档';
            }
        };
    })
    //审核状态
    .filter('audit_status', function () {
        return function (val) {
            switch (val) {
                case '0':
                    return '待审核';
                case '1':
                    return '核准';
                case '2':
                    return '拒绝';
            }
        };
    })
    //申请资产状态
    .filter('LoanStatusEnum', function () {
        return function (val) {
            switch (val) {
                case '0':
                case 0:
                    return '未标记';
                case '1':
                case 1:
                    return '预标记';
                case '2':
                case 2:
                    return '正式标记';
                case '3':
                case 3:
                    return '处置';
            }
        };
    })
    //资产处置状态
    .filter('AssetDisposalEnum', function () {
        return function (val) {
            switch (val) {
                case '0':
                case 0:
                    return '待审批';
                case '1':
                case 1:
                    return '拒绝';
                case '2':
                case 2:
                    return '待处置';
                case '3':
                case 3:
                    return '已处置';
            }
        };
    })
    //资产处置状态
    .filter('ServiceReportStatus', function () {
        return function (val) {
            switch (val) {
                case '0':
                    return '预约';
                case '1':
                    return '已生成';
                case '2':
                    return '取消预约';
            }
        };
    })
    //标记已读 未读
    .filter('readOrNot', function () {
        return function (val) {
            switch (val) {
                case '0':
                    return '未读';
                case '1':
                    return '已读';
            }
        };
    })
    //成功与否
    .filter('successOrNot', function () {
        return function (val) {
            switch (val) {
                case 0:
                case '0':
                    return '准备';
                case 1:
                case '1':
                    return '成功';
                case 2:
                case '2':
                    return '失败';
            }
        };
    })
    //复核流程
    .filter('rechecked', function () {
        return function (val) {
            switch (val) {
                case '1':
                    return '产品设计-确认资产包';
                case '2':
                    return '产品设计-确认方案';
                case '3':
                    return '存续期-确认购买';
                case '4':
                    return '存续期-资金归集';
                case '5':
                    return '存续期-资产处置';
                case '6':
                    return '项目跟踪-项目结束';
                case '7':
                    return "产品设计-确认发行";
            }
        };
    })
    //将时间加上"-"
    .filter('timeFilter', function () {
        return function (str) {
            if (str === null || str === undefined || str === '') {
                return '';
            }
            str = String(str);
            if (str.indexOf("合计") >= 0) {
                return str;
            } else if (str.match(/\d{8}/g)) {
                return str.slice(0, 4) + '-'
                    + str.slice(4, 6) + '-'
                    + str.slice(6, 8);
            } else {
                return str;
            }
        };
    })
    //去掉日期"-"
    .filter('timeFilterDe', function () {
        return function (str) {
            if (str) {
                str = String(str);
                var dateArr = str.split('-');
                var finalDate = dateArr[0] + dateArr[1] + dateArr[2];
                return finalDate;
            }
        };
    })
    //将数字转化成百分比
    .filter('changePercent', function () {
        return function (val) {
            if (val != '' && val != undefined) {
                var flane = Number(val) * 100;
                return flane;
            } else if (val == '') {
                return '';
            }
        };
    })
    //保留小数点2位
    .filter('point2', function () {
        return function (val) {
            if (val === null || val === undefined) {
                return "—";
            }
            else if (!isNaN(val)) {
                return Number(val).toFixed(2);
            } else {
                return val;
            }
        };
    })
    //保留小数点4位
    .filter('point4', function () {
        return function (val) {
            if (val != null) {
                return Number(val).toFixed(4);
            }
        };
    })
    //保留小数点6位
    .filter('point6', function () {
        return function (val) {
            if (val != null) {
                return Number(val).toFixed(6);
            }
        };
    })
    //格式化日期插件Tue May 19 2015 08:00:00 GMT+0800 (中国标准时间)  ---》 20150519
    .filter('datePickerFormat', function () {
        return function (val) {
            if (val instanceof Date) {
                var year = val.getFullYear();
                var month = (val.getMonth() + 1).toString();
                var date = val.getDate().toString();
                if (month.length == 1) {
                    month = "0" + month;
                }
                if (date.length == 1) {
                    date = "0" + date;
                }
                var finalDate = year + month + date;
                return finalDate;
            } else if (val === '') {
                return '';
            }
            else {
                return val;
            }
        };
    })
    //有默认日期还需要把日期传到后台的时候的日期格式过滤器
    .filter('datePickerFormat2', function () {
        return function (val) {
            if (val != '' && val != null) {
                if (val instanceof Date) {
                    var year = val.getFullYear();
                    var month = (val.getMonth() + 1).toString();
                    var date = val.getDate().toString();
                    if (month.length == 1) {
                        month = "0" + month;
                    }
                    if (date.length == 1) {
                        date = "0" + date;
                    }
                    var finalDate = year + month + date;
                    return finalDate;
                } else if (String(val).indexOf('-') < 0) {
                    var finalDate = val.slice(0, 4) + '-' + val.slice(4, 6) + '-' + val.slice(6, 8);
                    return finalDate;
                } else {
                    str = String(val);
                    var dateArr = str.split('-');
                    var finalDate2 = dateArr[0] + dateArr[1] + dateArr[2];
                    return finalDate2;
                }
            }
            else {
                return '';
            }
        };
    })
    //转化成date格式
    .filter('todatePickerFormat', function () {
        return function (str) {
            var val = Date.parse(str);
            var newDate = new Date(val);
            return newDate;
        };
    })
    //千分符
    .filter('thousandPoints', function () {
        return function (val) {
            if (val !== null && val !== undefined && val !== '') {
                var num = Number(val).toFixed(2);
                var splitNum = String(num).split(".");
                var prevDot = splitNum[0];
                var afterDot = splitNum[1];
                var transNum = prevDot.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
                return transNum + '.' + afterDot;
            } else {
                return '0.00';
            }
        };
    })
    //万元金额处理   或者带数字E的
    .filter('wanYuan', function () {
        return function (val) {
            if (val) {
                var a = val.indexOf("E");
                if (a >= 0) {
                    var str = val.substring(0, a);
                    var end = val.substring(a + 1, val.length);
                    var mi = Math.pow(10, Number(end));
                    var num = Number(str) * mi;
                    var num2 = val * 10000 / 100000000;
                    var last = num2.toFixed(2);
                    return last;
                } else {
                    var num = val * 10000 / 100000000;
                    return num.toFixed(2);
                }
            }
        };
    })
    //亿元金额处理
    .filter('yiYuan', function () {
        return function (val) {
            if (typeof val == "string") {
                var a = val.indexOf("E");
                if (a >= 0) {
                    var str = val.substring(0, a);
                    var end = val.substring(a + 1, val.length);
                    var mi = Math.pow(10, Number(end));
                    var num = Number(str) * mi;
                    var num2 = val * 100000000 / 10000000000000000;
                    var last = num2.toFixed(2);
                    return last;
                } else {
                    var num = val * 100000000 / 10000000000000000;
                    return num.toFixed(2);
                }
            } else {
                return val
            }
        };
    })
    //将带E的数字转化成正常数字，保留两位
    .filter('changenumber', function () {
        return function (val) {
            if (typeof val == 'string') {
                var a = val.indexOf("E");
                if (a >= 0) {
                    var str = val.substring(0, a);
                    var end = val.substring(a + 1, val.length);
                    var mi = Math.pow(10, Number(end));
                    var num = Number(str) * mi;
                    var last = num.toFixed(2);
                    return last;
                }
                else {
                    if (val == '') {
                        return '';
                    } else {
                        var num2 = Number(val);
                        var last2 = num2.toFixed(2);
                        return last2;
                    }
                }
            } else {
                return val
            }
        };
    })
    //时间加上"："
    .filter('Time', function () {
        return function (str) {
            if (str != '' && str != null) {
                str = String(str);
                if (str.indexOf("合计") >= 0) {
                    return str;
                } else if (str != '') {
                    var finalDate = str.slice(0, 2) + ':' + str.slice(2, 4) + ':' + str.slice(4, 6);
                    return finalDate;
                } else if (str === '') {
                    return '';
                }
            }
            else {
                return '';
            }
        };
    })
    //将数字转化成百分比
    .filter('changePercent', function () {
        return function (val) {
            if (val !== '' && val !== undefined) {
                return Number(val) * 100;
            }
        };
    })
    // 用户提示信息过长
    .filter('versionLength', function () {
        return function (val) {
            if (val) {
                if (val.length > 10) {
                    return val.substring(0, 20) + '...';
                } else {
                    return val;
                }
            }
        };
    })
    // 项目状态
    .filter('projStatus', function () {
        return function (data) {
            if (data) {
                if (data == "0") return "准备中";
                if (data == "1") return "产品发行";
                if (data == "2") return "项目结束";
            }
        }
    })
    .filter('monitorStatus', function () {
        return function (data) {
            if (data) {
                if (data == "0") return "已处理";
                if (data == "1") return "未处理";
            }
        };
    })
    .filter('putinType', function () {
        return function (data) {
            if (data) {
                if (data == 1) return "采购入库";
                if (data == 2) return "退库入库";
                if (data == 3) return "移库入库";
            }
        };
    })
    //yyyy-mm-dd转化成中国标准时间格式
    .filter('timeToDate', function () {
        return function (date) {
            if (date) {
                var t = Date.parse(date);
                if (!isNaN(t)) {
                    return new Date(t);
                } else {
                    return new Date();
                }
            }
        };
    })

    .filter('toRail', function () {
        return function (val) {
            if (!val || val === null || val === 'null' || val === '') {
                return '—'
            } else {
                return val;
            }
        };
    })
    //项目状态
    .filter('applyStatus', function () {
        return function (val) {
            switch (val) {
                case "1":
                    return '待审核';
                case "2":
                    return '审批拒绝';
                case "3":
                    return '待领用（审批通过）';
                case "4":
                    return '已领用';
                default :
                    return val;
            }
        };
    })