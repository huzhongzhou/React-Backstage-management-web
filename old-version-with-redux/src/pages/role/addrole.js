import React , {Component}from  'react'
import {Form,Select,Input } from 'antd'



 class AddRole extends Component{
    render(){
        this.props.setForm(this.props.form)
        const {getFieldDecorator} = this.props.form
       const formItemLayout= {
           labelCol:{span:4},
           wrapperCol:{span:15},
       }
       
        return(
            <Form>
                

                <Form.Item label='rolename'{...formItemLayout}>
                {getFieldDecorator('RoleName',{
                        rules:[{required:true,message:'role名称'}]
                    })(<Input placeholder='input role '></Input>)}
                    
                    
                    </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddRole)


//受控组件自动收集数据， 需要添加onchange 事件监听 