import { Card,Statistic,DatePicker, Timeline } from 'antd'
import React,{Component} from 'react'
import {  ArrowUpOutlined,ArrowDownOutlined} from  '@ant-design/icons';
import { 
    Chart,
    Geom,
    Axis,
    Tooltip,
    Legend,} from "bizcharts";
import moment from 'moment';


 const { RangePicker } = DatePicker;

export default class Home extends Component{
    render(){
        const dateFormat = 'YYYY/MM/DD';
        const title =(
            <span>
                <span style={{marginLeft:'2%'}}>data</span>
                <span style={{marginLeft:'60%'}}>
                <RangePicker
      defaultValue={[moment('2020/01/01', dateFormat), moment('2021/01/01', dateFormat)]}
      format={dateFormat}
    />
                </span>
            </span>
        )
        const data = [
            {
              month: "Jan",
              city: "Tokyo",
              temperature: 7
            },
            {
              month: "Jan",
              city: "London",
              temperature: 3.9
            },
            {
              month: "Feb",
              city: "Tokyo",
              temperature: 6.9
            },
            {
              month: "Feb",
              city: "London",
              temperature: 4.2
            },
            {
              month: "Mar",
              city: "Tokyo",
              temperature: 9.5
            },
            {
              month: "Mar",
              city: "London",
              temperature: 5.7
            },
            {
              month: "Apr",
              city: "Tokyo",
              temperature: 14.5
            },
            {
              month: "Apr",
              city: "London",
              temperature: 8.5
            },
            {
              month: "May",
              city: "Tokyo",
              temperature: 18.4
            },
            {
              month: "May",
              city: "London",
              temperature: 11.9
            },
            {
              month: "Jun",
              city: "Tokyo",
              temperature: 21.5
            },
            {
              month: "Jun",
              city: "London",
              temperature: 15.2
            },
            {
              month: "Jul",
              city: "Tokyo",
              temperature: 25.2
            },
            {
              month: "Jul",
              city: "London",
              temperature: 17
            },
            {
              month: "Aug",
              city: "Tokyo",
              temperature: 26.5
            },
            {
              month: "Aug",
              city: "London",
              temperature: 16.6
            },
            {
              month: "Sep",
              city: "Tokyo",
              temperature: 23.3
            },
            {
              month: "Sep",
              city: "London",
              temperature: 14.2
            },
            {
              month: "Oct",
              city: "Tokyo",
              temperature: 18.3
            },
            {
              month: "Oct",
              city: "London",
              temperature: 10.3
            },
            {
              month: "Nov",
              city: "Tokyo",
              temperature: 13.9
            },
            {
              month: "Nov",
              city: "London",
              temperature: 6.6
            },
            {
              month: "Dec",
              city: "Tokyo",
              temperature: 9.6
            },
            {
              month: "Dec",
              city: "London",
              temperature: 4.8
            }
          ];
          const cols = {
            month: {
              range: [0, 1]
            }}
        return(
            <div className='all'>
                   <div className='statis'>
                       <div className='total'>
                            <Card title='商品total'>
                            <Statistic  
                                value={1122228}
                                // precision={2}
                                valueStyle={{ color: 'grey' ,fontSize:20,}}
                                suffix={<ArrowUpOutlined style={{color:'green'}}/>}
                                // suffix="%"
                            />
                            <Statistic
                                value={'11%'}
                                //  precision={0}
                                valueStyle={{ color: 'grey' ,fontSize:13}}
                                suffix={<ArrowUpOutlined  style={{color:'green'}}/>}
                                prefix="日同比"
                            />
                            <Statistic
                                value={'18%'}
                                // precision={2}
                                valueStyle={{ color: 'grey' ,fontSize:13}}
                                suffix={<ArrowDownOutlined  style={{color:'red'}}/>}
                                prefix="周同比"
                            />
                            </Card>
                       </div>
                       <div className='charts'>
                       <Chart  data={data} scale={cols} autoFit onAxisLabelClick={console.log}>
                        <Legend/>
                        <Axis name="month"/>
                        <Axis
                            name="temperature"
                            label={{
                            formatter: val => `${val}°C`
                            }}
                        />
                        <Tooltip
                            crosshairs={{
                            type: "y"
                            }}
                            itemTpl={`
                            <tr data-index={index}>'
                                <td><span style="background-color:{color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:8px;"></span></td>
                                <td>{name}</td>
                                <td>{value}</td>
                            </tr>
                        `}

                        >
                                    {
                                        (title, items) => {
                                            // 配置了 className="g2-tooltip-list" 则会将模版中的内容渲染进来
                                            // 您也可以根据 items 自行渲染
                                            return (<table>
                                                <thead>
                                                    <tr>
                                                        <th>&nbsp;</th>
                                                        <th>名称</th>
                                                        <th>值</th>
                                                    </tr>
                                                </thead>
                                                    <tbody
                                                        className="g2-tooltip-list"
                                                    >
                                                </tbody>
                                    </table>);
                                        }
                                    }
                                    </Tooltip>
                        <Geom
                            type="line"
                            position="month*temperature"
                            size={2}
                            color={"city"}
                            shape={"smooth"}
                        />
                        <Geom
                            type="point"
                            position="month*temperature"
                            size={4}
                            shape={"circle"}
                            color={"city"}
                            style={{
                            stroke: "#fff",
                            lineWidth: 1
                            }}
                        />
                        </Chart>
                       </div>
                   </div>
                   <div className='date'>
                        <Card title={title} style={{height:'100%'}}>
                        <Timeline style ={{height:'10%'}}>
    <Timeline.Item color="green">Create backend api 2020-09-01</Timeline.Item>
    <Timeline.Item color="green">Create frontend ui 2020-09-01</Timeline.Item>
    <Timeline.Item color="red">
      
      <p>Solve initial api problems 2020-09-01</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>Technical testing 3 2020-09-01</p>
    </Timeline.Item>
    <Timeline.Item color="gray">
      <p>Technical testing 4 2020-09-01</p>
    </Timeline.Item>
    <Timeline.Item color="gray">
      <p>Technical testing 5 2020-09-01</p>
    </Timeline.Item>
  </Timeline>,

                        </Card>
                   </div>
            </div>
        )
    }
}