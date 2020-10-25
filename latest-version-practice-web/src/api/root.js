//包含应用中所有接口请求函数的模块
//export default{
    //xxx(){}
    //yyy(){}
//}
//每个函数的返回值都是promise
import ajax from './ajax'
// export function reqlogin(username,password){
//    return ajax('/register',{username,password},'POST')
// }
const BASE =''
export const reqlogin =(username,password)=> ajax(BASE+'/login',{username,password},'POST')
export const register=(username,password)=> ajax('/register',{username,password},'POST')