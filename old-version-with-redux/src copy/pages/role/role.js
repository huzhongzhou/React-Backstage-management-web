import React,{Component}from 'react'
import{ Card, Table,Button, Modal} from 'antd'
import Addrole from './addrole'
import AuthForm from './authform'
import {rolelist , addnewrole,updateRole} from './roleconfig'
import memoryutil from '../../utils/memory'
import {formateDate} from '../../utils/dataUtil'
export default class Role extends Component{
    constructor(props){
        super(props)
        this.auth = React.createRef() // 创建一个容器组件传递给子组件，因为子组件有状态更新，将更新值放入容器，我父组件想要得到时就读取次容器
    }
    state={
        roles:rolelist,
    role:{},
    isshow:false, //是否显示
    isauth:false
    }
    initColumn=()=>{
        this.columns = [
            {
                title:'name',
                dataIndex:'name'
            },
            {
                title:'time',
                dataIndex:'time'
            },
            {
                title:'auttime',
                dataIndex:'auttime'
            },
            {
                title:'modifier',
                dataIndex:'modifier'
            },
        ]
        
    }
    onRow =(role)=>{
        return {
            onClick:event =>{
                this.setState({
                    role 
                })
            }
        }
    }
    addrole=()=>{
        //进行表单验证
        this.form.validateFields((err,value)=>{
            if(!err){ 
                this.setState({isshow:false})
                const {RoleName}= value
                this.form.resetFields()// 清空输入框数据，避免再次打开时显示上次输入信息
                console.log(RoleName)
                //收集输入数据
                addnewrole(RoleName)
        //请求添加
                /* const role = result.data
                this.setState(state=>({
                    roles:[...state.roles,role]  更新roles状态：是基于原本状态数据更新
                })) */
        // 根据结果提示/更新列表显示
            }
        })

    }

    updaterole=()=>{
        const role =this.state.role
        const menus =this.auth.current.getmenus()
        role.menus = menus
        updateRole() // 暂时没有改变初始值
        this.setState({isauth:false})
        role.modifier=memoryutil.user.username
        role.auttime =formateDate( Date.now())
    }
    componentWillMount(){
        this.initColumn()
    }
    render(){
        const {roles,role,isshow,isauth} =this.state
        const title =(
            <span>
                <Button type='primary' onClick={()=>this.setState({isshow:true})}>创建role</Button>
                <Button type='primary' disabled={role._id?false:true} onClick={()=>this.setState({isauth:true})}>设置权限</Button>
            </span>
        )
        return(
            <Card title= {title}>
                <Table
                bordered
                rowKey='_id'
                dataSource={roles}
                columns ={this.columns}
                rowSelection ={{type:'Radio',selectedRowKeys:[role._id],
                onSelect:(role)=>{ //选择某个radio回调
                    this.setState({
                        role
                    })
                }}}
                onRow={this.onRow}
                ></Table>
                 <Modal
                    title = '添加分类'
                    visible ={isshow}
                    onOk ={this.addrole}
                    onCancel={()=>{this.setState({
                        isshow:false
                    })
                    this.form.resetFields()}}
                    >
                    <Addrole 
                    setForm={(form)=>{this.form=form}}></Addrole>
                    </Modal>
                    <Modal
                    title = '设置权限'
                    visible ={isauth}
                    onOk ={this.updaterole}
                    onCancel={()=>{this.setState({
                        isauth:false
                    })
                    /* this.form.resetFields() */}}
                    >
                    <AuthForm ref={this.auth} role={role}
                    ></AuthForm>
                    </Modal>
            </Card>
        )
    }
}


//setstate区别
/* 对象方式是函数方式的简写
如果新状态不依赖于原状态 ===》使用对象方式
如果新状态依赖于原状态 ===》使用函数方式 */
//如果需要在setstate（）后获取最新的状态数据，在第二个callback函数中读取
/* test1 =()=>{
    this.setState(state =>({count:state.count+1}))
    //在这里如果console数值还是1 不是加1后的值。且这里用的是函数方式，因为改变count是根据原来state改变的
}

test2=()=>{
    const count = this.state.count+1
    this.setState({
        count
    })  //这是对象方式
}
test3 =()=>{
    this.setState(state =>({count:state.count+1}),()=>{
        console.log(count) //这里是个callback回调函数，此时打印出来是增加后的值
    })
} */

// react相关回调中：异步 ， 其他异步回调：同步  settimeout/promise/h2.onclick