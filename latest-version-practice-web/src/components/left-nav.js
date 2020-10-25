import React,{Component} from 'react'
import { Link ,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import menulist from '../config/menu'
import {

  PieChartOutlined,

  MailOutlined,
} from '@ant-design/icons';
const { SubMenu } = Menu;

 class Leftnav extends Component{

  // 根据menu来生成对应的menu菜单
  getmenunode=(menulist)=>{
    const path = this.props.location.pathname
    return menulist.map(item=>{
      if(!item.children){
        return(<Menu.Item key={item.key} icon={<PieChartOutlined />}>
        <Link to={item.key}>{item.title}</Link>
        </Menu.Item>)
        
      }else{
        //查找与当前请求路径匹配的子item
        const citem = item.children.find(citem=>path.indexOf(citem.key)===0)//citem.key ===path
        if(citem){
          this.openkey= item.key
        }
       
 
        return( <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
        {this.getmenunode(item.children)}
      </SubMenu>)
      }
    })
  }

  // getmenunode2=(menulist)=>{
  //   return menulist.reduce((pre,item)=>{
  //     //向pre中添加菜单项
  //     if(!item.children){
  //       pre.push((<Menu.Item key={item.key} icon={<PieChartOutlined />}>
  //         <Link to={item.key}>{item.title}</Link>
  //         </Menu.Item>))
  //     }else{
  //       pre.push(( <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}>
  //         {this.getmenunode(item.children)}
  //       </SubMenu>))
  //     }
  //       return pre
  //   },[])
  // }
    render(){
      //得到当前网页页面路径
      const menu = this.getmenunode(menulist) //放进生命周期会更好
      let path = this.props.location.pathname
      if(path.indexOf('/product')===0){ //当前请求的是商品或其子路由界面
        path = '/product'

      }
      const openkey = this.openkey
        return(
            <div className='leftnav'>
                <Link to='/home'className='left-nav-header'>
                    <h1 style={{color:'white',marginLeft:'30%'}}>backend</h1>
                </Link>

                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[openkey]}
                    mode="inline"
                    theme="dark" >
          {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to='/home'>首页</Link>
          </Menu.Item>
          
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="5" icon={<MenuFoldOutlined />}><Link to='/category'>品类管理</Link></Menu.Item>
            <Menu.Item key="6" icon={<MenuFoldOutlined />}><Link to='product'>商品管理</Link></Menu.Item>
          </SubMenu>
          <Menu.Item key="7" icon={<PieChartOutlined />}>
            <Link to='/user'>用户管理</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<PieChartOutlined />}>
            <Link to='/role'>角色管理</Link>
          </Menu.Item> */} 
          {/* 简化 */}
          {menu}
        </Menu>
            </div>
        )
    }
}
export default withRouter(Leftnav)
//withrouter高阶组件
//包装非路由组件，返回一个新的组件
//新的组件向非路由组件传递router的三个属性，history，location match