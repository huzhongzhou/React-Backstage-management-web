import React, { Component } from "react";
import { Button,Row,Col } from "antd";


export default class Notfound extends Component{
    gohome=()=>{
        this.props.history.replace('/home')
    }
    render(){
        return(
            <Row className='notfound'>
                <Col span={12} className='left'></Col>
                <Col>
                    <h1 className='left'>404</h1>
                    <h2 className='right'>page not found</h2>
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