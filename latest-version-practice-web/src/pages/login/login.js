import React,{Component}from 'react'
import { Form, Input, Button, Checkbox, message} from 'antd';
import { UserOutlined ,LockOutlined} from '@ant-design/icons';
import{reqlogin} from '../../api/root'
import memory from '../../utils/mermory'
import './login.css'
import storeage from '../../utils/storeage';
import { Redirect } from 'react-router-dom';


class Login extends Component{
    handlesubmit=async(values)=>{
       console.log(values)
       const {username,password} =values
    //    reqlogin(username,password).then(response=>{
    //         console.log('success',response.data)
    //    }).catch(err=>{
    //         console.log('fail')
    //    })
    
        const response = await reqlogin(username,password)  
        console.log('success',response.data)
        const result =response.data
        if(result.code ===0){
            message.success('success')
            const user = result.data
            memory.user = user
            storeage.saveuser(user)
            this.props.history.replace('/')
        }else{
            message.error(result.msg)
        }
       

    }
    render(){
        //得到具有强大功能的form对象
        // const form =this.props.form;
        // const{getFieldDecorator}= form;
        
        //判断用户是否登陆，自动跳转
        const user = memory.user
        if(user &&user._id){
            return <Redirect to=''></Redirect>
        }
        return(
            <div className='login'>
                <header className='login-header'>
                    <h1>react backend</h1>
                    </header>
                <section className='login-content'>
                    <h2>Login</h2>
                
        <Form onFinish={this.handlesubmit}>    
            {/* <Form.Item>{getFieldDecorator('username',{
                rules:[{required:true,messafe:'please input your username'}]
            })
                (<Input prefix={<UserOutlined/>} placeholder='user'/>)}
            </Form.Item> */}
            <Form.Item name='username' rules={[
                {required:true,message:'please input your username'},
                {min:4,message:'must at least 4'},
                {max:12,message:'12 max'},
                {pattern:/^[a-zA-Z0-9]+$/,message:'english or number'}
            ]}>
                <Input prefix={<UserOutlined/>} placeholder='user'/>
            </Form.Item>

            <Form.Item name='password' rules={[
                {required:true,message:'please input your password'},

            ]}>
            <Input.Password prefix={<LockOutlined />} placeholder='password'/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit" className='login-button'>
                Login
                </Button>
            </Form.Item>
    </Form>
                </section>
            </div>
        )
    }
}
// 1高阶函数
// 一类特别的函数（接受函数类型的参数，返回值也是函数）
// 定时器（settimeout/setinterval）
// promise（（）=》{}）then(value=>{},reasponse=>{})
// 数组遍历的相关方法：foreach/filter/Map
// 函数对象的bind

// 2高阶组件
// 本质就是一个函数
// 接受一个组件，返回一个新组件，包装组件会向被包装组件传入特定的属性
// 作用：扩展组件的功能
// const Wraplogin = Form.create()(Login)
export default Login

//async和await
// 简化promise对象的使用，不用再使用。then来指定成功或者失败的回调函数
// 以同步编码方式实现异步流程
// 在返回promise的表达式左侧写await：不要promise而要promise异步执行的成功的数据
// 在await所在最近的函数定义的左侧写async