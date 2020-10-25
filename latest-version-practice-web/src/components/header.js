import React,{Component} from 'react'
import { withRouter } from 'react-router-dom';
import { formateDate } from "../utils/date";
import  memory from "../utils/mermory";
import storeage  from "../utils/storeage";
import menulist from "../config/menu";
import { Modal } from 'antd';
import Linkbutton from './linkbutton';

class Headert extends Component{
    state={
        currenttime : formateDate(Date.now()),
    }
    gettime=()=>{
       this.intervalid= setInterval(()=>{
            const currenttime = formateDate(Date.now())
            this.setState({currenttime})
        },1000)
    }
    gettitle=()=>{
        const path= this.props.location.pathname
        let title
        menulist.forEach(item=>{
            if(item.key===path){
                title = item.title
            }else if(item.children){
               const citem= item.children.find(citem=>path.indexOf(citem.key)===0)
               if(citem){
                   title =citem.title
               }
            }
        })
        return title
    }

    signout =()=>{
        Modal.confirm({
            title: 'Do you Want to sign out?',
            
            content: 'Some descriptions',
            onOk:()=> {
              //删除memory中的user数据并跳转
                storeage.removeuser()
                memory.user={}
              this.props.history.replace('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
          })
    }
    componentDidMount(){
        //render后执行一次，一般用来异步
        this.gettime()
    }
    componentWillUnmount(){
        //在此组件卸载之前
        //每个定时器设置时都会返回一个id
        clearInterval(this.intervalid)
    }
    render(){
        const {currenttime} = this.state
        const username = memory.user.username
        const title = this.gettitle()
        return(
            <div className='header'>
                <div className='header-top'>
                    <span style={{marginRight:5}}>hello,{username}</span>
                    <Linkbutton onClick={this.signout}>sign out</Linkbutton>
                    
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'> {title}</div>
                    <div className='header-bottom-right'>
                        <span style={{marginRight:5}}>{currenttime}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Headert)