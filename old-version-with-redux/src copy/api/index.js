/* 
包含应用中所有接口请求函数的模块
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

/* export function reqLogin(username,password){
    ajax('/login',{username,password},'POST')
} */

export const reqLogin =(username,password)=> ajax('/login',{username,password},'POST')

export const reqAddUser =(user)=>ajax('/register',user,'POST')

export const reqWeather = (city)=>{ // 因为请求返回值都是promise对象，
    return new Promise((resolve,reject)=>{
        const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=jason&ak=3p49MVra6urFRGOT9s8UBWr2`
        console.log(url)
        jsonp(url,{},(err,data)=>{
        if(!err /* & data.status ==='success' */){ // 如果成功
            console.log(data)
          const {dayPictureUrl,weather} = data.results[0].weather_data[0] //取出需要数据
          resolve({dayPictureUrl,weather})
        } else{
            message.error('req failed1')
        }
    }) // jsonp 浏览器端通过script标签发请求 （js代码一般） 只能解决GET类型ajax跨域请求，，不是ajax请求而是一般的get请求
    })

    /*基本原理：
    浏览器端：动态生成<script>来请求后台接口（src就是接口的url）
    定义好用于接受响应数据的函数（fn），并将函数名通过请求参数提交给后台（exp：callback=fn）
    服务器端：接收到请求处理产生结果数据后，返回一个函数调用的js代码，并将结果数据作为实参传入函数调用

    浏览器端：收到响应自动执行函数调用的js代码，也就执行了提前定义好的回掉函数，并得到需要的结果数据
    */
}



/*搜索商品分页列表（根据商品名称
searchtype： 搜索的类型， prodname/prodtype
pagnum:页码数 ； pagesize：每一页多少数据； searchname：用户输入的根据什么进行搜索， searchtype：用name或者desc来搜索
*/
export const reqSearchProducts= ({pageNum,pageSize,searchName,searchType})=>ajax ('/login',{pageNum,pageSize,[searchType]:searchName},'POST')
// 这里的[searchName] 是指将传入的searchType的值作为属性名