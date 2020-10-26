import React,{Component}from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import ProductHome from './home'
import Addproduct from './addproduct'
import Detail from './detail'
import './product.less'
export default class Product extends Component{
    render(){
        return(
            <Switch>
                <Route path ='/product' component={ProductHome} exact></Route> 
                <Route path ='/product/addproduct' component={Addproduct}></Route>
                <Route path ='/product/detail' component={Detail}></Route>
                <Redirect to='/product'></Redirect>
            </Switch>
        )
    }
}