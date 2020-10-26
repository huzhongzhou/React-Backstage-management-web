import React,{Component}from 'react'
import {Card,Table,Select,Input,Button,Icon} from 'antd'
import Linkbutton from '../../components/linkbutton'
import {products} from '../../utils/products'
const Option = Select.Option
export default class ProductHome extends Component{
    state = {
        products:products,
        searchtype:'productName',
        searchname:''
    }
    initcolumns =()=>{
        this.columns =[{
            title:'商品名称',
            dataIndex:'name'
        },
    {
            title:'商品描述',
            dataIndex:'desc'
    },{
            title:'价格',
            dataIndex:'price',
            render:(price)=>
                '￥' + price  //已指定对应的属性，传入的是对应的熟悉
            
    },
    {
        width:100,
        title:'状态',
        dataIndex:'status',
        render:(status)=>{
            return (
                <span>
                    <Button type='primary'>下架</Button>
                    <span>在售</span>
                </span>
            )
        }
        /* this.pagenum= pagenum // 保存页码到this ,保证后面方法如果刷新还能知道显示那一页 */
},,{
    title:'操作',
    render:(product)=>{
        return(
            <span>
                {/* //将product对象使用state传递给目标路由组件 */}
                <Linkbutton onClick ={()=>this.props.history.push('/product/detail',{product})}> 详情</Linkbutton>
                <Linkbutton onClick={()=>this.props.history.push('/product/addproduct',product)}>修改</Linkbutton>
            </span>
        )
    }
}
]
    }
    render(){
        this.initcolumns()
        const {products,searchtype,searchname}= this.state

        const title =(
            <span>
                <Select value={searchtype} style={{width:120}} onChange={value=>this.setState({searchtype:value})}>
                    <Select.Option value='productName'>按名称搜索</Select.Option>
                    <Select.Option value='productDesc'>按描述搜索</Select.Option>
                </Select>
                <Input placeholder='关键字' style ={{width:200, margin:'0 15px'}}value={searchname} onChange={event =>this.setState({searchname:event.target.value})}></Input>
                <Button>search</Button>
            </span>
        )
        const extra =(
            <Button type='primary' onClick={()=>this.props.history.push('/product/addproduct')}>
                <Icon type='plus'></Icon>
                add
            </Button>
        )
        return(
           <Card title={title} extra={extra}>
               <Table dataSource={products} columns={this.columns} rowKey ='_id' bordered>
                   
               </Table>
           </Card>
        )
    }
}