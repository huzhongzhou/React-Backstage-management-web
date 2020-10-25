import React,{Component} from 'react'
import { Card,Button,Table,Modal } from "antd";
import Linkbutton from '../../components/linkbutton';
import { roless } from "../../config/roleconfig";
import { users,deleteuser,adduser,updateuser} from "../../config/userconfig";
import AddUser from './adduser';

export default class User extends Component{
    formRef=React.createRef()
    state ={
        users:[],
        roles:[],
        ishow:false,
    }
    initrolenames=(roles)=>{
        const rolenames =roles.reduce((pre,role)=>{
            pre[role.id]=role.name
            return pre
        },{})
        this.rolenames=rolenames
    }

    add=()=>{
        if(this.user !=null){ //修改
        const values=this.formRef.current.formRef.current.getFieldsValue()
        console.log(values)
        const userid=this.user.userid
        this.setState(
            state=>({
                users:updateuser(userid,values)
            })
        )
        console.log(this.user.userid)
        console.log('update',values)
        }else{
        //收集输入数据
        const values=this.formRef.current.formRef.current.getFieldsValue()
        console.log('add',values)
        // console.log(adduser(values))
        this.setState(
            state=>({
                users:[...state.users,adduser(values)]
            })
        )
        }
        
        this.setState({
            ishow:false
        })

    }
    showupdate=(user)=>{
        this.user=user
        console.log(user)
        this.setState({
            ishow:true
        })
    }
    showadd=()=>{
        this.user=null //清楚user
        this.setState({ishow:true})
    }
    deleteuser=(user)=>{
      
        Modal.confirm({
            title:`确定要删除${user.username}`,
            onOk:()=>{
                this.setState(
                    state=>({
                        users:deleteuser(user.userid)
                    })
                )
                console.log(this.state.users)
                this.setState({
                    ishow:false
                })
                    
            },
            onCancel(){

            }
        })
    }
    initcolumn=()=>{
        this.columns=[
            {
                title:'用户名',
                dataIndex:'username',
            },
            {
                title:'邮箱',
                dataIndex:'email',
            },
            {
                title:'电话',
                dataIndex:'phone',
            },
            {
                title:'注册时间',
                dataIndex:'time',
            },
            {
                title:'所属角色',
                dataIndex:'roleid',
                render:(roleid)=>this.state.roles.find(citem=>citem.id===roleid).name
                //this.rolenames[roleid]
            },
            {
                title:'操作',
                //user
                render:(user)=>(
                    <span>
                        <Linkbutton onClick={()=>this.showupdate(user)}>修改</Linkbutton>
                        <Linkbutton onClick ={()=>this.deleteuser(user)}>删除</Linkbutton>
                    </span>
                )
            },
            
        ]
    }
    componentWillMount(){
        this.initcolumn()
        this.setState({roles:roless})
        this.initrolenames(roless)
        this.setState({users:users})


    }

    render(){
        const {ishow,roles}=this.state
        const user =this.user ||{}
        const users =[...this.state.users]
        console.log(users)
        // console.log(roles)
        // console.log(this.rolenames)
        const title= <Button type='primary' onClick={this.showadd}>创建用户</Button>
        return(
            <Card title={title}>
                 <Table  bordered 
                 dataSource={users} 
                 columns={this.columns} 
                 rowKey="id" 
                 pagination={{defaultPageSize:3,showQuickJumper:true}}/>;
                 <Modal
                  title={user.userid?'updateuser':"adduser"}
                  visible={ishow}
                  onOk={this.add}
                  onCancel={()=>{
                    this.formRef.current.formRef.current.resetFields()  
                    this.setState({ishow:false})}}
                  >
                  {/* <Addform categorys={temp} parentid={parentid} ref={this.formRef}></Addform> */}
                 <AddUser ref={this.formRef} roles={roles} user={user}></AddUser>
                </Modal>
            </Card>
        )
    }
}