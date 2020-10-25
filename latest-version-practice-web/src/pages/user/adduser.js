import React,{Component} from 'react'
import { Form ,Select,Input} from "antd";

const Item =Form.Item
const Option = Select.Option
export default class AddUser extends Component{
    formRef=React.createRef();
        componentDidUpdate(){
            this.formRef.current.setFieldsValue({
                catename:this.props.newrolename
            })
        }
    render(){
        const {roles}=this.props
        const user = this.props.user 
        console.log(user)
        const formitemlayout ={
            labelCol:{span:6},
            wrapperCol:{span:14},
        }
        return(
            <Form ref={this.formRef} {...formitemlayout} initialValues={{
                username:user.username,
                phone:user.phone,
                eamil:user.email,
                roleid:user.roleid

            }}>
                
                <Item name='username' label='用户名' rules={[
                    {required:true ,message:'please input username'}
                ]}>
                <Input placeholder='please input name'/>
                </Item>
                {
                    user.userid?null:(
                        <Item name='password' label='密码' rules={[
                            {required:true ,message:'please input password'}
                        ]}>
                        <Input placeholder='please input password'/>
                        </Item>
                    )
                    
                }
              

                <Item name='phone' label='手机号' rules={[
                    {required:true ,message:'please input phone'}
                ]}>
                <Input placeholder='please input phone'/>
                </Item>

                <Item name='eamil' label='邮箱' rules={[
                    {required:true ,message:'please input email'}
                ]}>
                <Input placeholder='please input email'/>
                </Item>

                <Item name='roleid' label='角色' rules={[
                    {required:true ,message:'please input role'}
                ]}>
                    <Select placeholder='please select' >
                       {
                           roles.map(role=><Option key={role.id} value={role.id}>{role.name}</Option>)
                       }
                    </Select>
                </Item>
            </Form>
        )
    }
}