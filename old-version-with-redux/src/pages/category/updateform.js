import React , {Component}from  'react'
import {Form,Input } from 'antd'
import PropTypes from 'prop-types';



 class Updateform extends Component{
     static propTypes ={
        setForm:PropTypes.func.isRequired
     }
    
    render(){
        const {category} = this.props

        this.props.setForm(this.props.form)
       /*  this.props.setform(this.props.form) */
        
        const {getFieldDecorator} = this.props.form
        return(
            <Form>
                <Form.Item>
                    {getFieldDecorator('catename',{
                        initialValue:category.ProdName,
                        rules:[{required:true,message:'分类名称'}]
                    })(<Input placeholder='asd'></Input>)}
                </Form.Item>

            </Form>
        )
    }
}
export default Form.create()(Updateform)