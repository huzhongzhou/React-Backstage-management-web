import React,{Component} from 'react'
import { Card,Table,Button,Modal } from "antd";
import Linkbutton from '../../components/linkbutton';
import {catemenu,changemenu,addmenu} from "../../config/catemenu";
import {
  ArrowRightOutlined
} from '@ant-design/icons';
import Addform from './addform';
import Updateform from './updatefor';
export default class Category extends Component{
  
  formRef=React.createRef(); //通过ref获得form实体

  state = {
    categorys:[],
    parentid:'0',
    subcategory:[],
    parentname:'',
    showstatus:0,//控制确认框是否显示
  }
// constructor(props){
//   super(props);
//   this.state={
//     categorys:[],
//     parentid:'0',
//     subcategory:[],
//     parentname:'',
//     showstatus:0,//控制确认框是否显示
//   }
// }
  getcategorys=()=>{
    this.setState({
      categorys:catemenu
    })
  }
  // componentDidUpdate(oldprops){
  //   if(oldprops !== this.props){
  //     console.log('componentdidupdate')
  //     this.setState({
  //       categorys:this.newmenu
  //     })
  //   }
  // }
  
  componentWillMount(){
    this.getcategorys()
  }
// shouldComponentUpdate(nextstate){
//   if(nextstate.categorys ==this.state.categorys){
//     console.log(this.state,'fail')
//     return false
//   }else{
    
//     console.log(this.state,'success')
//     return true}
// }

  showsecond=(category)=>{
    console.log(category)
    this.setState({parentid:category.id,parentname:category.name
    },
      ()=>{ //在状态更新且重新render后执行
        console.log(this.state.parentid)
        // if(this.state.parentid==='1'){
        //   this.setState({subcategory:subcategory})
        // }
        this.setState({
          subcategory:category.children
        })
      })//最原始的setstate写法，后面跟一个callback回调函数

      //setstate不能立即获取最新的状态：因为setstate是异步更新状态的
    
  }
  showcate=()=>{
    //更新显示1st level
    this.setState({parentid:'0',parentname:'',subcategory:[]})
  }
  handleCancel=()=>{
    //隐藏确认框
    this.setState({
      showstatus:0
    })
  }
  add=()=>{
    //能添加数据，但是不会触发重新渲染，rendux maybe
    this.setState({
      showstatus:0
    })
    // const {categorys} = this.state
    const {parentid,newcatename}=this.formRef.current.formRef.current.getFieldsValue()
    console.log(newcatename  )
    // addmenu(parentid,newcatename  ) //添加
    //重新渲染添加后的数据
    this.setState({
      categorys:addmenu(parentid,newcatename )
    })
    console.log(this.state.categorys)
    console.log( this.state.parentid)
    // this.newmenu = addmenu(parentid,newcatename )
  }
  update=()=>{
    //用下面的写法，会改变数据，但是不能触发重新渲染，redux来解决
    //需要先进行表单验证
    // this.formRef.current.formRef.current.validateFields().then(values=>{
    //   //隐藏对话框
    // this.setState({
    //   showstatus:0
    // })
    // console.log(values)
    // //this里有储存过的category并获取id

    // const categoryid= this.category.id
    // const newname =values.catename
    // console.log(categoryid)
    // console.log(this.formRef.current.formRef.current.validateFields)
    // // this.formRef.resetFields()
    // console.log(this.formRef.current)
    // changemenu(categoryid,newname)
    // })
      //隐藏对话框
      this.setState({
        showstatus:0
      })
     
      //this里有储存过的category并获取id
  
      const categoryid= this.category.id
      const newname =this.formRef.current.formRef.current.getFieldsValue().catename
      console.log(categoryid)
      console.log(this.formRef.current.formRef.current.validateFields)
      // this.formRef.resetFields()
      console.log(this.formRef.current)
      changemenu(categoryid,newname)
    
  }
  showadd=()=>{
    this.setState({
      showstatus:1
    })
  }
  showupdate=(category)=>{
    //保存分类对象
   
    this.category=category
    console.log(this.category)
    this.setState({
      showstatus:2
    })
   
  }
  
    render(){
      const {subcategory,parentid,parentname,showstatus}=this.state
      let temp =[...this.state.categorys] //https://blog.csdn.net/qq_28060549/article/details/88051741
      //读取指定分类
      const category = this.category ||{ } //加上｜｜是因为第一次render没有值
      console.log(temp)
      //定义title
        const title=parentid==='0'?'1st level':(
          <span>
            <Linkbutton onClick={this.showcate}>1st level</Linkbutton>
            <ArrowRightOutlined />
            <span>{parentname}</span>
          </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showadd}>add</Button>
            
        )
        // const dataSource = [
        //     {
        //       parentid:'0',
        //       id:'1',
        //       name:'电脑'
        //     },
        //     {
        //         parentid:'0',
        //         id:'2',
        //         name:'电脑2'
        //     },
        //     {parentid:'0',
        //     id:'3',
        //     name:'电脑3'}
            
        //   ];
      
          
          const columns = [
            {
              title: '分类名称',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '操作',
              width:250,
             render:(category)=>( //返回需要显示的界面标签,这里可以拿到每一个cate的信息
             <span>
                 <Linkbutton onClick={()=>this.showupdate(category)}>修改</Linkbutton>
                 {this.state.parentid==='0'?<Linkbutton onClick={()=>{this.showsecond(category)}}>查看</Linkbutton>:null}
                 
             </span>),
            }, //此数据应该放在生命周期只跑一次，避免多次渲染
            
          ];
          

        return(
            <Card title={title} extra={extra} >
               <Table  bordered dataSource={parentid==='0'?temp:subcategory} columns={columns} rowKey="id" pagination={{defaultPageSize:3,showQuickJumper:true}}/>;
               <Modal
                  title="add"
                  visible={showstatus===1}
                  onOk={this.add}
                  onCancel={this.handleCancel}
                  >
                  <Addform categorys={temp} parentid={parentid} ref={this.formRef}></Addform>
                 
                </Modal>
                <Modal
                  title="change"
                  visible={showstatus===2}
                  onOk={this.update}
                  onCancel={this.handleCancel}
                  >
                 {/* 通过ref获得子组件的form */}
                <Updateform categoryName={category.name} ref={this.formRef}></Updateform>
                  
                </Modal>
             </Card>
        )
    }
}