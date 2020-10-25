/*
测试mongoose

*/

const md5 = require('blueimp-md5')//这是一个MD5加密函数
//连接数据库

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/gz_test',{useNewUrlParser:true,useUnifiedTopology:true})
const con = mongoose.connection
con.on('connected',function(){
    console.log('链接成功 ')
})
//文档 是obj ----- 对象 ； 集合是 -----数组

const  userSchema = mongoose.Schema({
    //指定文档结构： 属性名/属性值的类型，是否必须，默认值
   username:{type:String,required:true},
    password:{type:String,required:true},
    type:{type:String}, //用户类型：

})
//定义model（与集合对应，可以操作集合）
const UserModel =  mongoose.model('user',userSchema)//集合的名称为 users

function testSave(){ //通过model实例的save（）添加数据
  const userModel = new UserModel({username: 'bob',password: md5('123456')}) //创建usermodel 实例
    userModel.save(function (err,user) {
        console.log('save',err,user)
    })
}
//testSave()

//model 查询
function testFind() {
    UserModel.find(function (err,users) { //得到包含所有匹配文档对象的数组，如果没有匹配的就是[]
        console.log('find',err,users)

    })
    UserModel.findOne({_id:'5e5cc99b6a4baf20b06827b2'},function (err,user) {//得到是匹配的文档对象，没有就NULL
        console.log('findo',err,user)
    })
}
//testFind()


function testUpdate() {
    UserModel.findByIdAndUpdate({_id:'5e5cc2efe2449a3250bbdf9d'},{username:'jack'},function(err,doc){
        console.log('findby',err,doc)
    })

}
//testUpdate()

function testDelete() {
UserModel.remove({_id:'5e5ccaf27a14242a3453c8bf'},function (err,doc){
    console.log('remove',err,doc)
}
)
}
testDelete()