import React,{Component} from 'react'
import { Card,Select,Input,Button,Table, message } from "antd";
import Linkbutton from '../../components/linkbutton';
import { productmenu,searchnew,updatestatus } from "../../config/productconfig";


const Option =Select.Option
export default class Productsub extends Component{
    state ={
        products:[ ],
        searchname:'',// 搜索关键字
        searchtype:'name',
    }
// componentDidUpdate(prevstate){
//     if(this.state.products !== prevstate.products){
//         console.log(this.state)
//         const abc =this.search()
//         this.setState({products:abc})
//     }
// }
    search=()=>{
        const {searchname,searchtype}= this.state
        searchnew(searchtype,searchname)
        console.log(searchnew(searchtype,searchname),'newproduct')
      this.setState({products:searchnew(searchtype,searchname)})
    }
    componentWillMount(){
        this.setState({products:productmenu})
    }
    //更新商品状态
    updateproductstatus=(id,status)=>{
        message.success('已经更新商品情况')
        this.setState({products:updatestatus(id,status)})
        
    }
    render(){
        const {products,searchname,searchtype} =this.state
          
          const columns = [
            {
              title: '商品名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '商品描述',
              dataIndex: 'desc',
              key: 'age',
            },
            {
              title: '价格',
              dataIndex: 'price',//指定的数据
              key: 'address',
              render:(price)=>'¥'+price //当前指定对应的属性，传入的就是对应的属性值，否则就是每一行的整体数据
            },
            {   width:100,
                title: '状态',
                //dataIndex: 'status',
                key: 'age',
                render:(product)=>{
                    const {status,id}=product
                    return(
                        <span>
                            <Button type='primary' onClick={()=>this.updateproductstatus(id,status===1?2:1)}>{
                            status ===1 ?'下架':'上架'}
                            </Button>
                            <span>{status ===1?'在售':'已下架'}</span>
                        </span>
                    )
                }
              },
              {width:100,
                title: '操作',
                key: 'age',
                render:(product)=>{
                    return(
                        <span>
                            {/* 将product对象传递给路由指向的目标组件作为state, 用this.props.location.state 取出,可以用{}包裹起来当作对象传入 */}
                            <Linkbutton onClick={()=>this.props.history.push('/product/detail',product)}>详情</Linkbutton>
                            <Linkbutton onClick={()=>this.props.history.push('/product/add',product)}>修改    </Linkbutton>
                        </span>
                    )

                }
              },
          ];
        const title =(
            <span>
                <Select value={searchtype} style={{width:150}} onChange={value=>this.setState({searchtype:value})}>
                    <Option value='name'>name</Option>
                    <Option value='desc'>desc</Option>
                </Select>
                <Input placeholder='key value' 
                onChange={event=>this.setState({searchname:event.target.value})} //input传的event取值需要。target
                value={searchname} style={{width:150, margin:'0 15px'}}></Input>
                <Button type='primary' onClick={this.search}> search</Button>
            </span>
        )
        const extra=(
            <Button type='primary' onClick={()=>this.props.history.push('/product/add')}>add</Button>
        )
        return(
            <Card title={title} extra={extra}>
                <Table bordered rowKey="id" dataSource={products} columns={columns} />;
            </Card>
        )
    }
}