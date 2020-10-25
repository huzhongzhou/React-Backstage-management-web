import React,{Component} from 'react'
import { Form ,Input} from "antd";

const Item =Form.Item

export default class AddRole extends Component{
    formRef=React.createRef();
        componentDidUpdate(){
            this.formRef.current.setFieldsValue({
                catename:this.props.newrolename
            })
        }
    render(){

        const formitemlayout ={
            labelCol:{span:6},
            wrapperCol:{span:14},
        }
        return(
            <Form ref={this.formRef} >
                
                <Item name='newrolename' label='角色名称' {...formitemlayout} rules={[
                    {required:true ,message:'please input'}
                ]}>
                <Input placeholder='please input name'/>
                </Item>
            </Form>
        )
    }
}