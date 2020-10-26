import {SETHEADER,RECEIVEUSER,SHOWERROR,resetuser} from './action-types'
import {reqLogin} from '../api'
import { message } from 'antd'
import storageUtil from '../utils/storageUtil'

export const setheader =(head)=>
({
    type:SETHEADER ,
    data:head
})
//设置头部标题的同步action

//接收user的同步action
export const receive = (user)=>({
    type:RECEIVEUSER,
    data:user
})

//显示错误信息的同步action
 export const showerror =(error)=>({
     type:SHOWERROR,
     data:error
 })

 //推出登陆，清空user信息
 export const logout =()=>{
     //删除local中的user
     storageUtil.removeUser()
     //返回action对象
     return {type:resetuser}
 }

//登陆的异步action
export const login=(username,password)=>{
    return async dispatch=>{
        //执行异步ajax请求
    const result = await reqLogin(username,password)
    if(result.data.status ===0){ //如果成功，分发成功同步的action
        const user = result.data.data
        dispatch(receive(user))//更新redux状态
        //还要保存在local中
        storageUtil.saveUser(user)
    }else{ // 如果失败
        /* const msg = result.msg
        message.error(msg) */
        const msg = result.msg
        dispatch(showerror(msg))
    }
    }
}