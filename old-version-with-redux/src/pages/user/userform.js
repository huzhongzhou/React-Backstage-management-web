import React , {Component}from  'react'
import {Form,Select,Input } from 'antd'



 class Userform extends Component{
     /* componentWillMount(){
       
     } */
    render(){
        const rolelist =this.props.rolelist
        const user = this.props.user ||{}
        this.props.setForm(this.props.form)
        const {getFieldDecorator} = this.props.form
       const formItemLayout= {
           labelCol:{span:4},
           wrapperCol:{span:15},
       }
       
        return(
            <Form {...formItemLayout}>    

                <Form.Item label='username'>
                {getFieldDecorator('name',{
                        initialValue:user.name,
                        rules:[{required:true,message:'role名称'}]
                    })(<Input placeholder='input role '></Input>)}
                    </Form.Item>
                
                    <Form.Item label='createtime'>
                {getFieldDecorator('time',{
                        initialValue:user.time,
                        rules:[{required:true,message:'role名称'}]
                    })(<Input placeholder='input time '></Input>)}
                    </Form.Item>

                    <Form.Item label='email'>
                {getFieldDecorator('email',{
                        initialValue:user.email,
                        rules:[{required:true,message:'role名称'}]
                    })(<Input placeholder='input email '></Input>)}
                    </Form.Item>

                    <Form.Item label='role'>
                {getFieldDecorator('role',{
                        initialValue:user.role,
                        rules:[{required:true,message:'role名称'}]
                    })(
                    <Select placeholder='plz select'>
                        {Object.keys(rolelist).map((item,index) =><Select.Option key={index}>{rolelist[item].name}</Select.Option>)}
                        
                    </Select>
                    )
                    }
                    </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(Userform)


//受控组件自动收集数据， 需要添加onchange 事件监听 