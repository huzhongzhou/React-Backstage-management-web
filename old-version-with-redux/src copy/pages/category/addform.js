import React , {Component}from  'react'
import {Form,Select,Input } from 'antd'



 class Addform extends Component{
    render(){
        this.props.setForm(this.props.form)
        const {getFieldDecorator} = this.props.form
        const {categorys,parentid}=this.props
       
        return(
            <Form>
                <Form.Item>
                    {getFieldDecorator('parentid',{
                        initialValue:parentid == 0 ?'0':`${categorys[parentid-1].ProdName}`,
                        
                    })(<Select>
                    <Select.Option value ='0'>
                    一级分类        
                    </Select.Option>
                        {
                            categorys.map(c=><Select.Option value={c.ProdId} key={c.ProdId}>{c.ProdName}</Select.Option>)
                        }
                </Select>)}
                </Form.Item>

                <Form.Item>
                {getFieldDecorator('ProdName',{
                        rules:[{required:true,message:'分类名称'}]
                    })(<Input placeholder='input cate '></Input>)}
                    
                    
                    </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(Addform)


//受控组件自动收集数据， 需要添加onchange 事件监听