const menulist =[
    {title:'首页',key:'/home',icon:''},
    {title:'商品',key:'/products',icon:'',children:[
        {title:'品类管理',key:'/category',icon:''},
        {title:'商品管理',key:'/product',icon:''}
        
    ]},
    {title:'用户管理',key:'/user',icon:''},
    {title:'角色管理',key:'/role',icon:''},
    {title:'图表',key:'/charts',icon:'',children:[
        {title:'柱状',key:'/chart',icon:''},
        {title:'折线',key:'/line',icon:''},
        {title:'饼',key:'/bar',icon:''},
        
    ]},

]

export default menulist