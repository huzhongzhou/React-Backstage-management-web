import React , {Component}from  'react'
import {Form,Input,Tree } from 'antd'
import menuConfig from '../../config/menuconfig'


const {TreeNode}= Tree
 export default class AuthForm extends Component{
    constructor(props){
        super(props)
        //根据传入角色的menus生成初始状态
        const {menus} = this.props.role
        this.state={
            checkedKeys:menus
        }
    }
    //为父组件提交获取最新menus的方法
    getmenus =()=>
        this.state.checkedKeys
    
    gettreenodes=(menuConfig)=>{
        return menuConfig.reduce((pre,Item)=>{
            pre.push(
                <TreeNode title ={Item.title} key = {Item.key}>
                    {Item.children ? this.gettreenodes(Item.children):null}
                </TreeNode>
            )
            return pre
        },[])
    }
    //选中某个node时的回调
    onCheck=checkedKeys=>{
        this.setState({checkedKeys})
    }
    componentWillMount(){
        this.treenodes = this.gettreenodes(menuConfig)
    }
    //根据新传入的role来更新checkedkeys状态
    componentWillReceiveProps(nextProps){ //接收到新属性时调用，render之前
        const menus = nextProps.role.menus // 此时为最新role
        this.setState({
            checkedKeys:menus
        })
    }
    render(){
        const {role} = this.props
        const {checkedKeys} = this.state
       const formItemLayout= {
           labelCol:{span:4},
           wrapperCol:{span:15},
       }
       
        return(
            <Form>          
                <Form.Item label='rolename'{...formItemLayout}>                  
                <Input value={role.name} disabled></Input>
                </Form.Item>
                <Tree checkable
                defaultExpandAll={true}
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
                >
                <TreeNode title='平台权限' key='0-0'>
                   {/*  <TreeNode title= 'parent 1-0' key='0-0-0'>
                        <TreeNode title= 'leaf' key='0-0-0-0'></TreeNode>
                        <TreeNode title = 'leaf' key='0-0-0-1'></TreeNode>
                        </TreeNode>
                    <TreeNode title ='parent 1-1' key='0-0-1'>
                        <TreeNode title = 'sss' key='0-0-1-0'></TreeNode>
                    </TreeNode> */}

                    {this.treenodes}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}



//受控组件自动收集数据， 需要添加onchange 事件监听 