import React,{Component} from 'react'
import { Card,Form,Input,Cascader,Button, message } from "antd";
import Linkbutton from '../../components/linkbutton';
import {
    ArrowLeftOutlined
  } from '@ant-design/icons';
  import { catemenu ,getsubmenu} from "../../config/catemenu";
import Picture from "./picture";
import Richtexteditor from './richtexteditor';
import { updateproduct,addnewproduct } from "../../config/productconfig";

const Item = Form.Item
const {TextArea} =Input


export default class Productadd extends Component{
    // constructor(props){
    //     super(props)
    //     //创建用来保存ref标识的标签对象的容器
    //     // this.img=React.createRef
    //     this.editor=React.createRef
    // }

    handlesubmit=(values)=>{
        // const imgs =this.pw.current.getimgs()
        // const detail=this.editor.current.getdetail()
        const {name,desc,price,categoryid} =values
        let pid ,cid
        // if(this.isupdate){
        //     console.log(this.product.cid)
        //     }
        
        if(categoryid.length===1){
            pid='0'
            cid=categoryid[0]
        }else{
            pid=categoryid[0]
            cid=categoryid[1]
        }
        //如果存在接口api可以只定义一个接口函数 用product.id来判定是更新还是添加
        const product={name,desc,price,pid}
        //如果是更新，需要添加id
        if(this.isupdate){
            product.id=this.product.cid
            updateproduct(product)
            message.success('更新成功')
            this.props.history.goBack()
        }else{
            addnewproduct(product)
            message.success('添加成功')
            this.props.history.goBack()
        }

        // message.success(`${this.isupdate?'更新':'添加'}success`)
       
   
    }
    state = {
        options:[],
      };

      componentWillMount(){
          const product = this.props.location.state
          //这个值可能有也可能没有，看究竟是add界面还是修改界面，由是否传递数据进来判断
          this.isupdate = !!product //强制转换类型，如果product有值就返回true，反之false
          console.log(this.isupdate)
          this.product=product ||{}
      
      }
    componentDidMount(){
        this.initoptions(catemenu)
    }

    initoptions =(categorys)=>{
        //根据menu数组生成option数组
       const options= categorys.map((c,index)=>({
            value:c.id,
            label:c.name,
            isLeaf:false,
            key:index,
        })) //如果箭头函数生成的需要是一个数组需要在{}外加一个（）

        //如果是一个二级分类商品的更新
        const {isupdate,product}=this
        const {pid}=product //cid
        if(isupdate&&pid!=='0'){
            //获取对应的二级分类列表
            const secondmenu =getsubmenu(pid).children
            console.log(secondmenu)
            const coption = secondmenu.map((c,index)=>({
                
                value:c.id,
                label:c.name,
                isLeaf:true,    
                key:index,
            }))
            //找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value===pid)
            
            //然后需要关联到对应的一级分类option上
            targetOption.children=coption
            console.log(targetOption.children)
        }

        //更新options状态
        this.setState({
            options
        })
    }
    //自定义price的验证
    // validateprice =(rule,value,callback)=>{
    //     if(value *1>0){
    //         callback()
    //     }else{
    //         callback('价格必须大于0')
    //     }
        
    // }
    
    validateprice=(rule,value)=>{
        if(value*1>0){
            return Promise.resolve()
        }else{
            return Promise.reject('价格必须大于0')
        }
    }
    loadData = selectedOptions => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
    
       

        // load options lazily
        setTimeout(() => {
          targetOption.loading = false;
           //根据选中的分类，请求获取二级分类列表
           console.log(targetOption.value)
        const subcategorys= getsubmenu(targetOption.value).children
        console.log(subcategorys)
        if(subcategorys && subcategorys.length >0){
            //生成一个二级列表的options
            const coptions = subcategorys.map((c,index)=>({
                
                value:c.id,
                label:c.name,
                isLeaf:true,
                key:index,
            }))
            //关联到当前option上
            targetOption.children=coptions

        }else{
            targetOption.isLeaf = true
        }
          
        //   targetOption.children = [
        //     {
        //       label: `${targetOption.label} Dynamic 1`,
        //       value: 'dynamic1',
        //     },
        //     {
        //       label: `${targetOption.label} Dynamic 2`,
        //       value: 'dynamic2',
        //     },
        //   ];
          //因为此时target option已经发生改变，所以需要更新state
          this.setState({
            options: [...this.state.options],
          });
        }, 1000);
      };
    render(){
        const {isupdate,product }= this
        const {pid,cid}=product
        //用于生成二级级链id
        const categoryids =[]
        if(isupdate){
            //商品是一个一级分类商品
            if(pid==='0'){
                categoryids.push(cid)
            }   //这里数据pid如果是0代表是一级分类
            else{
                categoryids.push(pid)
                categoryids.push(cid)
            }
            //商品是一个二级分类商品
           
        }
        const formitemlayout ={
            labelCol:{span:6},
            wrapperCol:{span:14},
        }
        const title =(
            <span>
                <Linkbutton onClick={()=>this.props.history.goBack()}>
                <ArrowLeftOutlined></ArrowLeftOutlined>
                </Linkbutton>
                <span>
                    {isupdate?'修改':'添加'}
                </span>
            </span>

        )
        return(
            
            <Card title={title}>
                <Form {...formitemlayout} onFinish={this.handlesubmit} initialValues={{
                    name:product.name,
                    desc:product.desc,
                    price:product.price,
                    categoryid:categoryids
                }}>
                    <Item name='name' label='商品名称'  rules={[
                    {required:true,message:'please input name'}
                ]}>
                        <Input placeholder='please input'></Input>
                    </Item>
                    <Item name='desc' label='商品描述' rules={[
                    {required:true,message:'please input name'}
                ]}>
                        <TextArea placeholder='please input' autoSize></TextArea>
                    </Item>
                    <Item name='price' label='商品价格' rules={[
                    {required:true,message:'please input name'},
                    {validator:this.validateprice}
                ]}>
                        <Input type='number' placeholder='please input' addonAfter='元'></Input>
                    </Item>
                    <Item name='categoryid' label='商品分类' label='商品分类' rules={[
                    {required:true,message:'please input name'},
                    
                ]}>
                    <Cascader
                        options={this.state.options} //需要显示的列表数据数组
                        loadData={this.loadData}  //当选择某个加载项，加载下一级列表的监听回调
                        
                        changeOnSelect
                    />
                    </Item>
                    <Item label='商品图片'>
                        {/* ref={this.img} */}
                        <Picture ></Picture>
                    </Item>
                    <Item label='商品详情' labelCol={{span:2}} wrapperCol={{span:20}}>
                        <Richtexteditor ></Richtexteditor>
                        {/* ref={this.editor} */}
                    
                    </Item>
                    <Item>
                        <Button type='primary' htmlType="submit" >提交</Button>
                    </Item>
                </Form>

            </Card>
        )
    }
}