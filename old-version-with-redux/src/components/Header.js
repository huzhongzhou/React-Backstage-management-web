import React,{Component, memo} from 'react'
import './Header.less'
import {formateDate}from '../utils/dataUtil'
import {Modal, message,Button}from 'antd'
import memory from '../utils/memory'
import storageUtil from '../utils/storageUtil' 
import menuList from '../config/menuconfig'
import {reqWeather} from '../api/'
import { withRouter } from 'react-router-dom'
import Linkbutton from '../components/linkbutton' 
import {connect} from 'react-redux'
class Header extends Component{
    state={
        currenttime : formateDate(Date.now()),
        dayPictureUrl:'http://api.map.baidu.com/images/weather/day/duoyun.png',
        weather:'多云'
    }
    getTime=()=>{

    this.intervalid= setInterval(()=>{
            const currenttime =formateDate(Date.now())
            this.setState({currenttime})
        },1000)
        console.log('8')
    }
    getWeather = async()=>{
        console.log('ss')
    const {dayPictureUrl,weather} =  await reqWeather('北京')   //因为这是返回的promise，所以调用async 异步 也可以用.then
    console.log('asd')
    this.setState({dayPictureUrl,weather})
       
    }
    getTitle =()=>{
        const path = this.props.location.pathname
        let title
        menuList.forEach(item =>{
            if(item.key ===path){
                title = item.title
            }else if(item.children) {
                const cItem = item.children.find(cItem =>path.indexOf(cItem.key)===0) // find回调函数返回值为true/false // 这里path.indexof返回的是citem.key的序列号，因为我在设置array时只每个数组只有一个，所以如果path匹配，则显示0
                 //如果有值说明有匹配的
                if(cItem){
                    //取出title
                    title = cItem.title
                }
            }
        })
        return title 
    }

    logout =()=>{
        Modal.confirm({
            title:'do you want to logout',
            content:'some descriptions',
            onOk :()=>{ //删除数据，跳转login
                storageUtil.removeUser()
                memory.user ={}
                this.props.history.replace('/login')
            },
            onCancel(){
                
            }
        })
    }
    /* getWeather =()=>{
        reqWeather('北京').then(res=>{
            const result = res.data
            console.log(result)
            console.log
        })
    } */
    componentDidMount(){
        //一般在此执行异步操作， ajax，或定时器
        this.getTime()    
        this.getWeather()
        console.log('1')
    }
    componentWillUnmount(){ //当前组件卸载之前
        //清楚定时器
        clearInterval( this.intervalid)
    }
    render(){
        const {currenttime,dayPictureUrl,weather}= this.state
        const username =memory.user.username
       /*  const title = this.getTitle() */ // 下一行换成redux写法
       const title = this.props.headtitle
        return(
            <div className='head'>
                <div className ='head-top'>
                    <span>{username}</span>
                    <Linkbutton onClick={this.logout}>sign out</Linkbutton> {/* //signout 是linkbutton 的children属性传下去 */}
                    {/* <Button onClick ={this.logout}>sign out</Button> */}
                </div>
                <div className= 'head-bottom'>
                    <div className='header-bottom-left'>
                            {title}
                    </div>
                    <div className ='header-bottom-right'>
                        <span>{currenttime}</span>
                        <img src={dayPictureUrl}></img>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>

        )
    }
}
export default connect(
    state =>({headtitle:state.headtitle}),
    {}
) (withRouter(Header))