import React,{Component}from 'react'
import{Card, Icon,List} from 'antd'
import Linkbutton from '../../components/linkbutton'

const Item = List.Item
export default class Detail extends Component{
    state ={
        cname1:'',
        cname2:'',
    }
    render(      
    ){
        console.log( this.props.location.state)
        const {name,desc,price,detail} = this.props.location.state.product

        const title =(<span>
          <Linkbutton onClick ={()=>this.props.history.goBack()}>back up</Linkbutton>
            <span >商品详情</span>
        </span>)
        return(
            <Card title ={title} className='product-detail'>
                <List>
                    <Item className='setjc'>
                        <span className='left'>商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item className='setjc'>
                        <span className='left'>商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item className='setjc'>
                        <span className='left'>商品价格：</span>
                        <span>{price}</span>
                    </Item>
                    <Item className='setjc'>
                        <span className='left'>所属分类：</span>
                        <span>thinkpad</span>
                    </Item>
                    <Item className='setjc'>
                        <span className='left'>商品图片：</span>
                        <span><img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583917782708&di=e1d36095d6ade033f4098b286302c50b&imgtype=0&src=http%3A%2F%2Fpic15.photophoto.cn%2F20100617%2F0037037554403146_b.jpg' alt='' className='productimg'></img></span>
                    </Item>
                    <Item className='setjc'>
                        <span className='left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:'<h1>商品详情的内容标题</h1>'}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}

// 一次性发送多个请求，只有都成功了，才正常处理

/*
exp:  const results  = await Promise.all([reqCategoryid(pcategoryid),reqCategoryid(categoryid)])
const Cname1 = results[0].data.name
const Cname2 = results[1].data.name
*/