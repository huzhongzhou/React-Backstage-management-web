//发送异步ajax请求的函数模块
// 函数的返回值是promise对象

import axios from 'axios'
import { message } from 'antd'
export default function ajax(url,data={},type='GET'){

/* if(type ==='GET'){
  return  axios.get(url,{
      params:data //指定请求参数
  })
}else{ //post 请求
    return axios.post(url,data)
}    可替换*/

//优化版本
/*在外层包一个自己创建的promise对象，在请求出错时，不reject（error），而是显示错误 
*/
return new Promise((resolve,reject)=>{
    let promise
    //1.执行异步ajax请求
    if(type ==='GET'){
        promise= axios.get(url,{
            params:data
        })
    }else{
        promise = axios.post(url,data)
    }
    promise.then(response=>{  //2.如果成功了，调用resolve（value）
        resolve(response)
        //3.如果失败率，不调用reject(reason),而是提示异常信息
    }).catch(err=>{
        message.error("request fail:"+err.message)
    })
})
}

