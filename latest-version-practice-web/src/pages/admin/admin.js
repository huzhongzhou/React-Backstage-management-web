import React,{Component}from 'react'
import memory from '../../utils/mermory'
import {Redirect, Route,Switch,} from 'react-router-dom'
import { Layout } from 'antd';
import Leftnav from '../../components/left-nav'
import Headert from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Chart from '../charts/chart'
import Line from '../charts/line'
import Notfound from "../not-found/notfound";

const {  Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    render(){
        const user =memory.user
        if(!user||!user._id){
            //在render中如何跳转界面
            return <Redirect to='/login'></Redirect>
        }
        return(
            <Layout style ={{minHeight:'100%',position:'absolute',width:'100%'}}>
            <Sider>
                <Leftnav></Leftnav>
            </Sider>
            <Layout>
              
                  <Headert></Headert>
                
              <Content style={{backgroundColor:'#fff',margin:20}}>
                  <Switch>
                      <Redirect exact from='/'  to='/home'></Redirect>
                  <Route path='/home' component={Home}/>
                  <Route path='/category' component={Category}/>
                  <Route path='/product' component={Product}/>
                  <Route path='/role' component={Role}/>
                  <Route path='/user' component={User}/>
                  <Route path='/bar' component={Bar}/>
                  <Route path='/chart' component={Chart}/>
                  <Route path='/line' component={Line}/>
                  {/* <Redirect to='/home'></Redirect> */}
                  <Route component={Notfound}></Route> {/*以上没有一个匹配项则显示 */}
                  </Switch>
              </Content>
              <Footer style={{textAlign:'center'}}>Footer1234567890</Footer>
            </Layout>
          </Layout>
        )
    }
}