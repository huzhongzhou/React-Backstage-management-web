import React,{Component} from 'react'
import { Button, Layout } from 'antd'
import memory from '../../utils/memory'
import { Redirect, Switch,Route} from 'react-router-dom'
import LeftNav from '../../components/leftNav'
import Header from '../../components/Header'
import Home from '../home/home'
import Cate from '../category/cate'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
const { Footer, Sider,Content}= Layout
export default class Admin extends Component{
    render(){
        const user = memory.user
        if(!user ||!user._id){ // 如果内存中没有存储信息 == 未登录
            return <Redirect to ='./login'></Redirect>   //自动跳转到login , 在render中
        }
        return(
            <div>
                {/* <Button>ssss</Button>
                <div>Admin {user.username}</div> */}
                <Layout style={{height:'100vh'}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                    <Layout>
                        <Header></Header>
                        <Content style={{backgroundColor:'grey'}}>
                            <Switch>
                                <Route path='/home' component={Home}></Route>
                                <Route path='/Category' component={Cate}></Route>
                                <Route path='/product' component={Product}></Route>
                                <Route path='/role' component={Role}></Route>
                                <Route path='/user' component={User}></Route>
                                <Route path='/Bar' component={Bar}></Route>
                                <Route path='/line' component={Line}></Route>
                                <Route path='/pie' component={Pie}></Route>
                                <Redirect to= '/home'></Redirect>
                            </Switch>
                        </Content>
                        <Footer>Footer</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}