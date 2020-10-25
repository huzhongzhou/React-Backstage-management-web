import React,{Component} from 'react'
import{Card,Button,Table,Modal} from 'antd'
import { roless ,addnewrole} from '../../config/roleconfig'
import Addrole from "./addrole";
import Authform from "./authform";
import memoryutils from "../../utils/mermory";
import { formateDate } from "../../utils/date";

export default class Role extends Component{
    auth = React.createRef();
    formRef=React.createRef();
    state={
        roles:[], //所有角色的列表
        role:{} ,//选中的role
        showadd:false,
        showset:false,
    }
    initcolumn =()=>{
        this.columns=[
            {
                title:'角色名称',
                dataIndex:'name'
            },
            {
                title:'创建时间',
                dataIndex:'createtime',
                //假设有api获取的时间
                // render:(createtime)=>formateDate(createtime)
            },
            {
                title:'授权时间',
                dataIndex:'authtime'
            },
            {   title:'授权人',
                dataIndex:'authname'
            }
        ]
    }
    onRow=(role)=>{
        return {
            onClick:event=>{
                this.setState({
                    role
                })
            }
        }
    }
    addrole=()=>{
        this.setState({showadd:false})
        const newrolename =this.formRef.current.formRef.current.getFieldsValue().newrolename
        console.log(newrolename)
       //更新roles状态：基于原本状态数据更新
        this.setState(
            state=>({
                roles:[...state.roles,addnewrole(newrolename)]
            })
        )

    }
    setauth=()=>{
        this.setState({
            showset:false
        })
        const role=this.state.role
       const newmenus= this.auth.current.getmenus()
       role.menus =newmenus
       role.authtime =formateDate(Date.now())
       role.authname=memoryutils.user.username
       console.log(newmenus)
       //更新
       //这里变化的是role但是引起roles也变化了，是因为role是引用变量，role是在onrow这个方法中从roles提取出来，指向的都是同一个内存地址
       this.setState({
           roles:[...this.state.roles]
       })
       
    }
    componentWillMount(){
        this.initcolumn()
    }
    componentDidMount(){
        this.setState({roles:roless})
    }
    render(){
        const {roles,role,showadd,showset} =this.state
  
        const title =(
            <span>
                <Button type='primary' style={{marginRight:20}} onClick={()=>this.setState({showadd:true})}>创建角色</Button>
                <Button type='primary' disabled={!role.id} onClick={()=>this.setState({showset:true})}>设置角色权限</Button>
            </span>
        )
        return(
            <Card title={title}>
                <Table bordered 
                dataSource={roles} 
                columns={this.columns} 
                rowKey="id" 
                pagination={{defaultPageSize:3,showQuickJumper:true}}
                rowSelection={{type:'radio',selectedRowKeys:[role.id],
                onSelect:(role)=>{
                    this.setState({
                        role
                    })//一旦点击选择框前面的圆按钮也选中
                }
            }} //type定义了是单选还是复选，后面配置的是根据id来选中
                onRow={this.onRow} //onrow是table内置当点击行或者对行有其他操作时，产生的回调函数
                >

                </Table>
                <Modal
                  title="addrole"
                  visible={showadd}
                  onOk={this.addrole}
                  onCancel={()=>{this.setState({showadd:false})}}
                  >
                  <Addrole  ref={this.formRef}></Addrole>
                 
                </Modal>

                <Modal
                  title="设置权限"
                  visible={showset}
                  onOk={this.setauth}
                  onCancel={()=>{this.setState({showset:false})}}
                  //this.form.resetfields()
                  >
                  <Authform  role={role} ref={this.auth}></Authform>
                 
                </Modal>
            </Card>
        )
    }
}