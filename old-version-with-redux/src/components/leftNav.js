import React,{Component} from 'react'
import './leftNav.less'
import { Link,withRouter } from 'react-router-dom'
import { Menu,Icon, Button} from 'antd'
import menuList from '../config/menuconfig'
import memory from '../utils/memory'
import {connect} from 'react-redux'
import {setheader} from '../redux/action'
const SubMenu = Menu.SubMenu
 class LeftNav extends Component{
  /* 
  根据menu的数据数组生成对应的标签数组
  */
 /* getMenuNodes =(menuList) =>{
   return menuList.map(item =>{
     if(!item.children){
       return(
        <Menu.Item key={item.key}>
        <Link to={item.key}>
        <Icon type={item.Icon}></Icon>
        <span>{item.title}</span>
        </Link>
      </Menu.Item>
       )
     }else{
       return(
        <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.Icon}></Icon>
                <span>{item.title}</span>
              </span>
            }>
            {this.getMenuNodes(item.children)}
          </SubMenu>
       )
     }
   })
 } */
 //判断当前登陆用户对item是否有权限
 hasauth=(item)=>{
   const key=item.key
   console.log(memory.user)
   const menus = memory.user.menus

   const username = memory.user.username // indexof如果匹配到了里面的内容则返回对应内容在array的下标，否则返回-1
   if (username ==='wuqixin'|| item.isPublic || menus.indexOf(key)!==-1){
    console.log(menus.indexOf(key)!==-1) 
    return true}
   else if(item.children){
     
    //加上！！的原因是，不加情况下返回的是child具体值，加上是booleen值
     
    const show = !!item.children.find(child =>menus.indexOf(child.key)!==-1)//情况4 如果当前用户有此item的某个子item的权限
    
     return show
    }
/* 情况1.如果当前用户是admin，所有都能看见
情况2.当前用户有此item的权限。这个key是创建好的menuconfig里的，menus是保存在后台数据库中的
情况3，如果当前item是公开的  */
return false
}
 getMenuNodes = (menuList) =>{
   const path = this.props.location.pathname
   return menuList.reduce((pre,item)=>{
     //如果当前用户有item对应的权限，才显示对应的菜单项
     if(this.hasauth(item)){
      if(!item.children){
        //下面这个if是引用redux后才用，用来显示当前刷新后打开的的页面head
        if(item.key ===path||path.indexOf(item.key)===0){
          this.props.setheader(item.title)
        }

        pre.push((<Menu.Item key={item.key}>
          <Link to={item.key} onClick={()=>this.props.setheader(item.title)}>   {/* 这里onclick是因为用了redux才引入的action方法 */}
          <Icon type={item.Icon}></Icon>
          <span>{item.title}</span>
          </Link>
        </Menu.Item>))
      }else{
        // 查找一个与当前请求路径匹配的子item
        const citem = item.children.find(citem =>path.indexOf(citem.key)===0) // 子item的key 等于当前打开的页面key
        if(citem){
          this.openkey = item.key //如果存在，说明当前item的子列表需要打开，这里获取子列表key
        }


        pre.push((<SubMenu
          key={item.key}
          title={
            <span>
              <Icon type={item.Icon}></Icon>
              <span>{item.title}</span>
            </span>
          }>
          {this.getMenuNodes(item.children)}
        </SubMenu>))
      }
      
     }
     return pre
   },[])
 }

 componentWillMount(){ //此生命周期 在第一次render（）之前执行一次 ， 为第一个render（）准备数据（必须同步）
   this.menuNodes =this.getMenuNodes(menuList) // map side bar调用方法在此处调用，且只调用一次，不用每次render 刷新一次
 }
    render(){
      //得到当前请求的路由路径
      
      let path =this.props.location.pathname
      if(path.indexOf('/product')=== 0){ // 当前请求的是商品或其子路由界面    /product/detail     indexof('') 就是第0位
        path='/product'
      }
      const openkey = this.openkey
        return(
            <div className='leftnav'>
                <Link to = '/'className='left-header'>
                    <h1>bkend</h1> 
                </Link>
                <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openkey]}
          mode="inline"
          theme="dark"         
        >
         {/*  <Menu.Item key="1">
            <Link to='/home'>
            <Icon type='pie-chart'></Icon>
            <span>首页</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
          <Link to='/role'>
            <Icon type='pie-chart'></Icon>
            <span>角色管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
          <Link to='/user'>
            <Icon type='pie-chart'></Icon>
            <span>用户管理</span>
            </Link>
          </Menu.Item>

          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type='mail'></Icon>
                <span>商品</span>
              </span>
            }>
            <Menu.Item key="5">
              <Link to='/Category'>
              <Icon type='mail'>
              </Icon><span>品类管理</span></Link>
              </Menu.Item>
            <Menu.Item key="6">
              <Link to ='/product'>
              <Icon type='mail'>
              </Icon><span>商品管理</span></Link>
              </Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu> */}
          {this.menuNodes}
        </Menu>
            </div>

        )
    }
}
export default connect(
  state =>({headtile:state.headtile}),
  {setheader}
)(withRouter(LeftNav)) // withRouter 高阶组件 ，包装非路由组件，返回一个新的组件，新的组件向非路由组件传递属性 history/ location / match