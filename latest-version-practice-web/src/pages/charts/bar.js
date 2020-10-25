import React,{Component} from 'react'
import { Button, Card } from "antd";
import ReactEcharts from "echarts-for-react";

export default class Bar extends Component{
    state={
        sales:[5, 20, 36, 10, 10, 20],
        stocks:[15, 25, 30, 11, 9, 20]
    }

    update=()=>{
        this.setState(state=>({
            sales:state.sales.map(sale=>sale+1),
            stocks:state.stocks.reduce((pre,stock)=>{
                pre.push(stock-1)
                return pre
            },[])
        }))
    }
    getoption=(sales,stocks)=>{
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales,
            },
        {
            name: '库存',
                type: 'bar',
                data: stocks,
        }]
        }
    }
    render(){
        const {sales,stocks}=this.state
        return(
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>
                <Card title= 'bar1'>
                    <ReactEcharts option={this.getoption(sales,stocks)}></ReactEcharts>
                </Card>
            </div>
        )
    }
}