/*

定义包含n个操作数据集合的model模块
1.连接数据库
.1引入mongoose
.2连接指定数据库（url只有数据库是变化的）
.3获取连接对象
.4绑定链接完成的监听（用来提示链接成功）
2定义出对应特定集合的model并向外暴露
.1定义schema（描述文档结构）
.2定义model（与集合对应，可以操作集合)
.3向外暴露model
*/

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/login',{useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection
con.on('connected',function(){
    console.log('链接成功 1')
})


const  userSchema = mongoose.Schema({
    //指定文档结构： 属性名/属性值的类型，是否必须，默认值
    username:{type:String,required:true},
    password:{type:String,required:true},
    menus:{type:Array},
    type:{type:String}, //用户类型：

})

const UserModel =  mongoose.model('user',userSchema)//集合的名称为 users
exports.UserModel = UserModel
// module.exports =xxX  一次性暴露
// exports.xxx  = value 分别暴露