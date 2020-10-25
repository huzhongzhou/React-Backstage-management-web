import React,{Component} from 'react'
import { Form ,Tree,Input} from "antd";
import menulist from "../../config/menu";

const Item =Form.Item

export default class Authform extends Component{
    // formRef=React.createRef();
    //     componentDidUpdate(){
    //         this.formRef.current.setFieldsValue({
    //             catename:this.props.newrolename
    //         })
    // state={
    //     checkedkeys:[]
    // }
    //根据传入的role对象生成初始状态
    constructor(props){
        super(props)
        const {menus} =this.props.role
        this.state={
            checkedkeys:menus
        }
    }
    //选中某个node时回调
    onCheck = (checkedkeys, info) => {
        this.setState({checkedkeys})
        console.log('onCheck', checkedkeys, info);
      };
    gettree=(menulist)=>{
       
        
        return menulist.reduce((pre,item)=>{
            pre.push({
                title:item.title,
                key:item.key,
                children:item.children?this.gettree(item.children):null
            })
            return pre
        },[])
    
    }
    //为父组件提交获取最新menus的数据
    getmenus=()=>this.state.checkedkeys
    
    //根据新传入的role来更新checkedkeys状态
    componentWillReceiveProps(nextprops){
        const menus =nextprops.role.menus
        this.setState({
            checkedkeys:menus
        })
    }
    render(){
        const {role} =this.props
        const {checkedkeys}=this.state
        //在外围添加一个父treenode去包裹所有的menu
        const newmenulist =[{title:'平台权限',key:'all',children:menulist}]
        const treenode=this.gettree(newmenulist)
        // console.log(this.gettree(menulist))
        
        const formitemlayout ={
            labelCol:{span:6},
            wrapperCol:{span:14},
        }
        return(
            <div>
                
                <Item label='角色名称' {...formitemlayout} >
                <Input value={role.name} disabled/>
                </Item>
                <Tree
                checkable
                // defaultExpandedKeys={['0-0-0', '0-0-1']}
                defaultExpandAll
                checkedKeys={checkedkeys}
                // defaultSelectedKeys={['0-0-0', '0-0-1']}
                // defaultCheckedKeys={['0-0-0', '0-0-1']}
                // onSelect={onSelect}
                onCheck={ this.onCheck}
                treeData={treenode}
                />
            </div>
        )
    }
}