import React,{Component}from 'react'
import {Card,Button,Table , Modal} from 'antd'
import Linkbutton from '../../components/linkbutton'
import {userlist,deleteuser,addnewuser} from './userlist'
import Userform from './userform'
import {rolelist} from '../role/roleconfig'
export default class User extends Component{
    state={
        users:userlist,
        isshow:false ,
        rolelist:rolelist
    }
    initcolumn=()=>{
        this.columns=[
            {title:'username',
             dataIndex:'name'
            },
            {title:'createtime',
             dataIndex:'time'
            },
            {title:'email',
             dataIndex:'email'
            },
            {title:'role',
             dataIndex:'role'
            },
            {title:'操作',
             render:(user)=>(
                 <span>
                     <Linkbutton onClick={()=>this.showupdate(user)}>change</Linkbutton>
                     <Linkbutton onClick={()=>this.deleteuser(user)}>delete</Linkbutton>
                 </span>
             )
            },
        ]
    }
    deleteuser=(user)=>{
        Modal.confirm({
            title:`确认删除${user.name}?`,
            onOk:()=>{
                deleteuser(user._id)
                console.log(userlist)
                this.setState({users:userlist})
            }
        })
    }
    add=()=>{
        //收集数据
        this.setState({isshow:false})
    const newuser =this.form.getFieldsValue()
    this.form.resetFields()
    console.log(newuser)
        //提交添加请求
        addnewuser(newuser)
    }
    showupdate=(user)=>{
        this.user=user //保持user
        this.setState({isshow:true})
    }
    componentWillMount(){
        this.initcolumn()
    }
    render(){
        const {users,isshow,rolelist} =this.state
        const user = this.user
        const title =<Button type='primary' onClick={()=>{
            this.user=null
            this.setState({isshow:true})
        }}> 创建用户</Button>
        return(
           <Card title={title}>
               <Table
              columns={this.columns}
              dataSource ={users}
              bordered
              rowKey = '_Id'
              pagination = {{defaultPageSize:5,showQuickJumper:true}}
              >
              </Table>
            <Modal
             title = {user ?'change':'add'}
             visible = {isshow}
             onOk={this.add}
             onCancel={()=>{
                 this.form.resetFields()
                 this.setState({isshow:false})}}
            >
                <Userform rolelist={rolelist} user={user} setForm={form=>this.form =form}></Userform>
            </Modal>
           </Card>
        )
    }
}