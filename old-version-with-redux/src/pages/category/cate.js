import React,{Component}from 'react'
import {Card,Table,Button,Icon, Modal} from 'antd'
import Linkbutton from '../../components/linkbutton'
import {firstCate,subCate2,subCate1,subCate3,updateCate,addfirstCate} from '../../utils/firstcate' 
import Addform from './addform'
import Updateform from './updateform'
export default class Cate extends Component{
    state={
        categorys :firstCate,
        parentid:0,
        ProdCatName:'',
        subcategorys:'',
        showstatus:0,
    }
    showcate =()=>{
        this.setState({
            subcategorys:[],
            parentid:0,
            ProdCatName:''
        })
    }
    showsubcate = (category)=>{
        //显示指定一级分类对象的二级子列表
        console.log(category)
        if(category.ProdId ===1){this.setState({subcategorys:subCate1,parentid:1,ProdCatName:'book' })}
        else if(category.ProdId ===2){this.setState({subcategorys:subCate2,parentid:2,ProdCatName:'instrument'})}
        else if(category.ProdId ===3){this.setState({subcategorys:subCate3,parentid:3,ProdCatName:'gift'})}
    }
    handlecancel =()=>{
        this.form.resetFields()
        this.setState({showstatus:0})
    }
    addcate =()=>{
        this.form.validateFields((err,values)=>{
        if(!err){
            this.setState({showstatus:0})
            //收集数据，并提交添加分类的请求
            const {parentid,ProdName}=this.form.getFieldsValue()
            this.form.resetFields()
            addfirstCate(parentid,ProdName)
        }
        })
        
    }
    updatecate =()=>{
        //进行表单验证，只有通过了才处理
        this.form.validateFields((err,values)=>{
            if(!err){
                 //隐藏确定框
                this.setState({showstatus:0})
                const categoryId = this.category.ProdId
                console.log(this.form)
                const newname = this.form.getFieldValue('catename')
                console.log(categoryId)
                updateCate(categoryId,newname)
                this.setState({
                    categorys:firstCate
                })
                this.form.resetFields() //清除输入数据，所有字段， 避免修改信息后，再次点击保持输入的值
                }
        })
       
    }
    showadd=()=>{
        this.setState({showstatus:1})
    }
    showupdate =(category)=>{
        //保持分类对象
        this.category=category
        this.setState({showstatus:2})
    }
    render(){
        const {categorys,parentid,subcategorys,ProdCatName,showstatus} = this.state
        const title = parentid ===0?'first level cate' :(<span>
            <Linkbutton onClick ={this.showcate}>first level cate</Linkbutton>
            <Icon type ='arrow-right'></Icon>
            <span>{ProdCatName}</span>
        </span>)
        const category = this.category ||{}
        const extra = (
            <Button type ='primary' onClick={this.showadd}>
                <Icon type ='plus'></Icon>
                add
            </Button>
        )
    
        const columns = [{
            title:'分类的名称',
            dataIndex:'ProdName', // 显示数据对应的属性名
        },
            {
                title:'操作',
                width:300,
                render:(category)=>( // 返回需要显示的界面标签
                   
                    <span>
                     { console.log(category)}
                        <Linkbutton onClick={() =>this.showupdate(category)}>修改分类</Linkbutton>
                        {parentid === 0 ?<Linkbutton onClick= {()=>{this.showsubcate(category)}}>查看子分类</Linkbutton> :''}
                        {/* <Linkbutton onClick= {()=>{this.showsubcate(category)}}>查看子分类</Linkbutton> */}
                    </span>
                    
                )
            }
        ]
        console.log(subcategorys)
        return(
           <Card title ={title} extra ={ extra}>
              <Table
              columns={columns}
              dataSource ={parentid === 0 ? categorys :subcategorys}
              bordered
              rowKey = 'ProdId'
              pagination = {{defaultPageSize:5,showQuickJumper:true}}
              >

              </Table>
                    <Modal
                    title = '更新分类'
                    visible ={showstatus===2}
                    onOk ={this.updatecate}
                    onCancel={this.handlecancel}
                    >
                    <Updateform category={category} setForm={(form)=>{this.form=form /*在函数中传递form， 然后用this.form=form储存form信息  */}}></Updateform>
                    </Modal>

                    <Modal
                    title = '添加分类'
                    visible ={showstatus===1}
                    onOk ={this.addcate}
                    onCancel={this.handlecancel}
                    >
                    <Addform categorys={categorys} parentid ={parentid} setForm={(form)=>{this.form=form}}></Addform>
                    </Modal>
           </Card>
        )
    }
}

