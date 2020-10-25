import React,{Component} from 'react'
import { Form ,Select,Input} from "antd";

const Item =Form.Item
const Option = Select.Option
export default class Addform extends Component{
    formRef=React.createRef();
        componentDidUpdate(){
            this.formRef.current.setFieldsValue({
                catename:this.props.newcatename
            })
        }
    render(){
        //需要接收一集分类列表和点击所属分类的parentid
        
        const {categorys,parentid}=this.props
        console.log(categorys)
        return(
            <Form ref={this.formRef} initialValues={{['parentid']:`${parentid}`}}>
                <Item name='parentid' rules={[
                  
                ]}>
                <Select>
                    <Option value='0'>1st cate</Option>
                    {categorys.map((c)=><Option key={c.id+1} value={c.id}>{c.name}</Option>)}
                </Select>
                </Item>
                <Item name='newcatename' >
                <Input placeholder='please input'/>
                </Item>
            </Form>
        )
    }
}