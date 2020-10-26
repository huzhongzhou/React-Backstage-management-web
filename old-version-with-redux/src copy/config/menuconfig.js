const menuList =[
    {
    title:'首页',
    key:'/home',
    icon:'home',
    isPublic:true,
},
{
    title:'商品',
    key:'/products',
    icon:'appstore',
    children:[
        {
            title:'品类管理',
            key:'/Category',
            icon:'bars'
        },
        {
            title:'商品管理',
            key:'/product',
            icon:'bars',
        }
    ]
},
{
    title:'角色管理',
    key:'/role',
    icon:'pie-chart',
},
{
    title:'用户管理',
    key:'/user',
    icon:'pie-chart',
}]

export default menuList