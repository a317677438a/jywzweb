
/**
 * Created by HuangYao on 2017/5/16.
 *
 * 公共url管理常量 API_ENDPOINT
 */
angular.module('app.constants',[])
.constant('API_ENDPOINT',{
        //url:'http://192.168.4.115:8086/workbench_bs'   //huangyao linux
        //url:'http://192.168.6.19:8080/workbench_bs/' //panli
        //url:'http://localhost:8080/workbench_bs/'   //huangyao
        url:'http://localhost:8081/jywz/' //本地
        //url:'http://192.168.6.15:8080/workbench_bs/'    //fandx
        //url:'http://192.168.6.22:8080/workbench_bs/'   //yangfei
        //url:'http://192.168.6.20:8080/workbench_bs/'   //chengzh
    })

.constant('WITH_CREDENTIALS',{
        withCredentials : true, //设置请求后台跨域的问题
        timeout : 300000  //设置请求服务器的时间限制  超过此时间则返回error  单位毫秒
    });
