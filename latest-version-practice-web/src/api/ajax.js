// 发送异步ajax请求的模块
//统一处理请求异常
import axios from 'axios'
import {message} from 'antd'
export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject)=>{
        let promise
        //1 执行异步ajax请求
        if(type ==='GET'){
            promise= axios.get(url,{//配置对象
                params:{ID:1234}//指定请求参数为ID：1234
            })
        }else{
           promise= axios.post(url,data)
        }
        promise.then(res=>{
            resolve(res)
        }).catch(err=>{
            message.error('请求错误' +err.message)
        })
        //2如果成功调用resolve

        //如果失败不调用reject，不然会进入try catch流程，而是提示异常信息
    })
    
}
//请求登陆接口
//ajax('/register',{username:'huzhongzhou',password:'huzhongzhou'},'POST').then()
//添加用户
