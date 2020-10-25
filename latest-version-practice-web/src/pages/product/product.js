import React,{Component} from 'react'
import {Switch ,Route, Redirect} from 'react-router-dom'
import Productadd from "./productadd";
import Productdetail from "./productdetail";
import Productsub from "./productsub";

export default class Product extends Component{
    render(){
        return(
            <Switch>
                <Route path='/product' component={Productsub} exact></Route>
                <Route path='/product/add' component={Productadd}></Route>
                <Route path='/product/detail' component={Productdetail}></Route>
                <Redirect to='/product'></Redirect>
            </Switch>
        )
    }
}