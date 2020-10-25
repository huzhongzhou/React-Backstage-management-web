import React,{Component} from 'react'
import { Form ,Input} from "antd";

const Item =Form.Item

export default class Updateform extends Component{
    formRef=React.createRef();

   componentDidUpdate(){
       this.formRef.current.setFieldsValue({
           catename:this.props.catename
       })
   }
    
    render(){
        const {categoryName}=this.props
        console.log(categoryName)
        return(
            <Form ref={this.formRef} initialValues={{['catename']:`${categoryName}`}}>
                <Item name='catename' rules={[
                    {required:true,message:'请输入'}
                ]}>
                <Input placeholder='please input'/>
                </Item>
            
            </Form>
        )
    }
}