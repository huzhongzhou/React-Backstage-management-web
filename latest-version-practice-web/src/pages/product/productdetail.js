import React,{Component} from 'react'
import { Card,List } from "antd";
import {
    ArrowLeftOutlined
  } from '@ant-design/icons';
import Linkbutton from '../../components/linkbutton';


const Item =List.Item
export default class ProductDetail extends Component{
    render(){
        console.log(this.props.location.state)
        const product= this.props.location.state
        
        const title =(
            <span>
                <Linkbutton >
                <ArrowLeftOutlined style={{marginRight:15}} onClick={()=>this.props.history.goBack()}/>
                </Linkbutton>
                
                <span>商品详情</span>
            </span>
        )
        return(
           <Card title={title} className='detail'>
               <List>
                   <Item>
                       <span className='detailitem'>商品名称:</span>
        <span className='detaildesc'>{product.name}</span>
                   </Item>
                   <Item>
                       <span className='detailitem'>商品描述:</span>
        <span className='detaildesc'>{product.desc}</span>
                   </Item>
                   <Item>
                       <span className='detailitem'>商品价格:</span>
        <span className='detaildesc'>{product.price}元</span>
                   </Item>
                   <Item>
                       <span className='detailitem'>catedesc:</span>
                       <span className='detaildesc'
                       dangerouslySetInnerHTML={{__html:'<h1 style="color:red"> cate desc title</h1>'}}
                       >

                       </span>
                   </Item>
               </List>
           </Card>
        )
    }
}