import React,{Component} from 'react'
import './login.less'
import { Form, Icon, Input, Button,message } from 'antd';
import {reqLogin} from '../../api'
import memory from '../../utils/memory'
import storage from '../../utils/storageUtil'
import { Redirect } from 'react-router-dom';
 class Login extends Component{
  handleSubmit=(e)=>{
    e.preventDefault()
    //对所有的表单字段进行验证
    this.props.form.validateFields(async(err,values)=>{
      if(!err){
        const {username,password}=values
       // reqLogin(username,password).then(
        //  res =>{
        //    console.log('1111',res.data)
       //   }
       // ).catch(err =>{
       //   console.log('2',err)
       // })
      
        //console.log( values) // 检验成功
       
          const response = await reqLogin(username,password) // async 卸载await 函数定义的左侧
          // async & await 简化promise对象的使用：不用再使用then()指定成功/失败的回掉函数（有回掉函数，必定是异步）
          // 在返回promise的表达式左侧写await：
          // 可以使用try  catch 来写
          const status = response.data    // (status:0,data:user) {status:1,msg:'xxx'}
          if(status.code === 0){
            console.log('qingqiu chenggong ', response.data)
            message.success('success')
            const user =status.data
            //跳转后台页面
            memory.user=user  //保存在内存中
            storage.saveUser(user) //保存到本地
            this.props.history.replace('/home')
            // 还有一个push跳转路由
          }else{
            message.error(status.msg)
          }
          
        
      }else{
        console.log('fail')//检验失败
      }
    })

    const form =this.props.form
    const values = form.getFieldsValue()
    console.log('handleSubmit()',values)
  }

  /*
  对password进行自定义验证 */

  validatePwd =(rule,value,callback) =>{
    console.log('validatePwd()',rule,value)
    if(!value){
      callback('password mush fill')
    }else if(value.length <4){
      callback('password min')
    }else if(value.length >12){
      callback('password max')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('password reg exp')
    }else{
      callback()
    }
    // callback() //验证通过
    // callback('xxxx') //验证失败，并指定提示文本
  }
    render(){
      // 如果用户已经登陆，自动跳转
     /*  const user = memory.user
      if(user && user._id){
        return <Redirect to='/'></Redirect>
      } */
      const form = this.props.form //得到具有强大功能的form对象
      const {getFieldDecorator}= form //获取from里面的函数getFieldDecorator
        return(
            <div className='login'>
            <header className='login-header'>
                <h1> Admin</h1>
            </header>
            <section className='login-content'>
                <h2>user login</h2>
                <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username',{  //必须先用此方法对标签项进行包装
            rules:[{required:true, whitespace: true,  message:'Please input your username!'},// 规则1：必须输入
          {min:4, message:'please min'},   // 最小长度
          {max:12, message:'please max'},   //最大长度
          {pattern: /^[a-zA-Z0-9_]+$/, message:'please reg exp'} //正则表达式判定
          ],
          initialValue:'admin' //设定初始值
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password',{
            rules:[
          {validator:this.validatePwd}
          ],//配置对象：属性名是特定的一些名称 
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
         
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
         
        </Form.Item>
      </Form>
            </section>
            </div>
        )
    }
}


const WrapLogin = Form.create()(Login) /*包装form组件，生产一个新的组件， 新组建会向form组件传递一个强大的对象属性：form */

/* 
1.高阶函数
1）一类特别的函数（两种情况都可）
    a.接受函数类型的参数  b.函数的返回值是函数
2）常见的高阶函数
  a. 定时器 settimeout()/setinterval()
  b. promise: promise(()=>{})      then
  c. 数组遍历的方法： foreach()/filter()/map()/reduce()
  d.fn.bind()   函数对象的bind()
3) 高阶函数更新动态，更加有扩展性
2.高阶组件
1） 本质就是一个函数
2） 接收一个组件（被包装组件），返回一个新组件，新组件内部渲染被包装的组件。包装组件会向被包装组件传入特定的属性
3） 用来扩展组件的功能
4） 高阶组件也是高阶函数：接受一个组件函数，返回是一个新的组件函数

*/
export default WrapLogin


//文档数据库mangodb