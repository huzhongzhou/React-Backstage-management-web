import React,{Component} from 'react'
import {Button,Row,Col}from 'antd'
import {connect} from 'react-redux'
import {setheader} from '../../redux/action'
import './notfound.less'

class Notfound extends Component{
    gohome =()=>{
        this.props.setheader('home')
        this.props.history.replace('/home')
    }
    render(){
        console.log('notfound')
        return(
            <Row className='not-found'>
                <Col span={12} className='left'></Col>
                <Col span={12} className='right'>
                    <h1>404</h1>
                    <h2>page notfound</h2>
                    <div>
                        <Button type='primary' onClick={this.gohome}>
                            gohome
                        </Button>
                    </div>
                </Col>
            </Row>
        )
    }
}
export default connect(
    null,
    {setheader}
)(Notfound)