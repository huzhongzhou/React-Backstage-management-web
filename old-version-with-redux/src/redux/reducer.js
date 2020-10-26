import storageUtil from "../utils/storageUtil"
import {combineReducers} from 'redux'
import {SETHEADER, RECEIVEUSER,SHOWERROR}from './action-types'
//管理头部标题的reducer函数
const initheadtitle = 'home'
function headtitle(state=initheadtitle,action){
    switch(action.type){
        case(SETHEADER):
            return action.data
        default:
            return state
    }
}

//管理当前登陆用户的reducer函数
const inituser = storageUtil.getUser()
function user(state=inituser,action){
    switch(action.type){
        case RECEIVEUSER:
            return action.data
        case SHOWERROR:
            const errormsg = action.data
            return {...state,errormsg}// 如果返回的数据与原数据有关联，则最好使用。。。
        default:
            return state
    }
}

//向外默认暴露的是合并产生的总的reducer函数， 管理的总的state的结构
//{}
export default combineReducers({
    headtitle,
    user
})