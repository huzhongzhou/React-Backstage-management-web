import React,{Component}from 'react'
import {Card,Button} from 'antd'
import ReactEcharts from  'echarts-for-react'
export default class Bar extends Component{

     state={
         sales:[5, 20, 36, 10, 10, 20]
     }

     update =()=>{
         this.setState(state=>({
             sales:state.sales.map(sale =>sale +2)

        /*
        state.sales.reduce((pre,sale)=>{
            pre.push(sale-1)
            return pre
        },[])
        */
         }))
     }
    //返回柱状图配置对象
    getOption =(sales)=>{
        return {title: {
            text: 'ECharts entry example'
        },
        tooltip: {},
        legend: {
            data:['Sales']
        },
        xAxis: {
            data: ["shirt","cardign","chiffon shirt","pants","heels","socks"]
        },
        yAxis: {},
        series: [{
            name: 'Sales',
            type: 'bar',
            data: sales
        }]}
    }
    render(){
        const {sales} = this.state
        return(
            <div>
                <Card>
                    <Button type = 'primary' onClick={this.update}>
                        update
                    </Button>
                </Card>
                <Card title = 'bar 1'>
                    <ReactEcharts option={this.getOption(sales)}></ReactEcharts>
                </Card>
            </div>
        )
    }
}