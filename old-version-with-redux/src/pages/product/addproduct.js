import React,{Component}from 'react'
import {Card,Form,Input,Cascader,Upload,Button, Icon} from 'antd'
import {firstCate,subCate2,subCate1,subCate3} from '../../utils/firstcate'
import Linkbutton from '../../components/linkbutton'
import Pictures from './pictureswall'
import Richtext from './richtext'

//cascader 级联
/* const options=[
    {value:'zhejiang',
    label:'zhejiang',
    isLeaf:false},
    {value:'jiangsu',
    label:'jiangsu',
    isLeaf:false}
]; */
const {TextArea}= Input
 class Addproduct extends Component{
     state={
         options:[]
     }
     constructor(props){
         super(props)
         //创建用来保存ref标识的标签对象的容器
         this.pw = React.createRef()
     }
    submit=()=>{
        //进行表单验证，如果通过才发送请求
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.log(values)
                const imgs = this.pw.current.getimgs()  //得到了自组建picturewall的所有属性，包括方法， 所以调用里面的getimgs
            }
        })
    }
    validateprice =(rule,value,callback)=>{
        if(value *1>0){
            callback() //验证通过
        }else{
            callback('price must positive')
        }
    }

    initoptions = ()=>{
        const options = firstCate.map(c=>({
            value:c.ProdId,
            label:c.ProdName,
            isLeaf:false
        }))

        //如果是一个二级分类商品的更新
        const {isUpdate, product} = this
        const {pcategoryid,categoryid} =product
        if(isUpdate && pcategoryid !==0){
            //获取对应的二级分类列表
            const subcatory = this.getsuboption(pcategoryid)
            //生成二级下拉列表的options
            const childOptions = subcatory.map(c=>({
                value:c.ProdId,
                label:c.ProdName,
                isLeaf:true,
            }))
            //找到当前商品对于的一级option对象
            const targetOption = options.find(option=>option.value === pcategoryid)
            //关联对应的一级option上
            targetOption.children = childOptions
        }
        this.setState({
            options
        })
        console.log(options)
    }

    componentDidMount(){
        this.initoptions()
    }
     
    getsuboption(parentid){
        if(parentid === 1){
            return subCate1
        }else if (parentid ===2){
            return subCate2
        }else if(parentid ===3){
            return subCate3
        }
    }
    loadData = selectedOptions =>{
        const targetOption = selectedOptions[selectedOptions.length -1];//得到选择的option对象
        /* targetOption.loading =true; */ // 显示loading
        //根据选择的分类，请求获取二级分类列表
        const suboption = this.getsuboption(targetOption.value)
        if(suboption && suboption.length>0){

            const childoption = suboption.map(c=>({
                value:c.ProdId,
                label:c.ProdName,
                isLeaf:true,
            }))
            //关联到当前option上
            targetOption.children = childoption
        }else{
            targetOption.isLeaf = true
        }
        this.setState({
            options:[...this.state.options]
        })
    }
    componentWillMount(){
        //取出携带的state
        const product =this.props.location.state   //如果是添加没值，否则有值
        //保存是否是更新的标识
        this.isUpdate = !!product  
        this.product = product ||{}
    }
    render(){
        const {isUpdate, product} = this
        const {pcategoryid,categoryid,imgs} =product
        const categoryids = [] // 用来接受级联分类id的数组
        if (isUpdate){
            if(pcategoryid ===0){
                categoryids.push(categoryid)
            }else{
                categoryids.push(pcategoryid)
                categoryids.push(categoryid)
            }
        }
        const title =(
            <span>
                <Linkbutton onClick={()=>this.props.history.goBack()}>
                <Icon type ='minus'></Icon>
                </Linkbutton> 
                <span>{isUpdate? '修改':'添加'}</span>
            </span>
        )
        const formitemLayout={
            labelCol:{span:3},
            wrapperCol:{span:7},
        }

        const {getFieldDecorator} = this.props.form
        return(
            <Card title ={title}>
                <Form {...formitemLayout}>
                    <Form.Item label =' product name'>
                    {getFieldDecorator('name',{
                        initialValue:product.name,rules:[
                            {required:true,message:'必须输入'}
                        ]
                    })(<Input placeholder='product name'></Input>)}
                        
                    </Form.Item>
                    <Form.Item label =' product desc'>
                    {getFieldDecorator('desc',{
                        initialValue:product.desc,rules:[
                            {required:true,message:'必须输入'}
                        ]
                    })(<TextArea placeholder='product desc' autoSize={{minRows:2,maxRows:6}}></TextArea>)}
                        
                    </Form.Item>
                    <Form.Item label =' product price'>
                    {getFieldDecorator('price',{
                        initialValue:product.price,rules:[
                            {required:true,message:'必须输入'},
                            {validator:this.validateprice}
                        ]
                    })(<Input type='number' placeholder='product name' addonAfter='yuan'></Input>)}
                        
                    </Form.Item>
                    <Form.Item label =' product cate'>
                    {getFieldDecorator('cate',{
                        initialValue:categoryids,rules:[
                            {required:true,message:'必须输入'},
                        ]
                    })(<Cascader
                        options ={this.state.options} //显示的数据
                        loadData={this.loadData}    //对应一个回调函数，加载下一级数据
                       /*  onChange={this.onChange}
                        changeOnSelect */
                        ></Cascader>)}
                        
                    </Form.Item>
                    <Form.Item label =' product picture'>
                        <Pictures ref={this.pw} imgs={imgs}></Pictures>
                    </Form.Item>
                    <Form.Item label =' product detail' labelCol ={{span:2}} wrapperCol={{span:20}}>
                        <Richtext></Richtext>
                    </Form.Item>
                    <Button type='primary' onClick ={this.submit}>提交</Button>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(Addproduct)

//子组件调用父组件的方法：将负组件的方法直接传给子组件

// 负组件调用子组件的方法：通过在负组件中ref得到子组件标签对象（也就是组件对象），调用其方法