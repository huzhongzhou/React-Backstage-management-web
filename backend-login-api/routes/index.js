var express = require('express');
var router = express.Router();

const UserModel =require('../db/models').UserModel
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
const md5 = require('blueimp-md5')//这是一个MD5加密函数
//post 的请求参数放在req的body属性 内
router.post('/register',function(req,res){
  //获取请求参数
    const {username,password,menus}=req.body
  UserModel.findOne({username},function(err,user){
    if(user){
      res.send({code:1,msg:'user exist'})
    }else {
      new UserModel({username,password:md5(password),menus}).save(function(err,user){
        res.cookie('userid',user._id,{maxAge:1000*60*60*24})
        const data={username,_id:user._id}
        res.send({code:0,data})
      })
      }
  })


  //处理
/*  if(username ==='admin'){
    //注册失败
    res.send({code:1 , msg:'user exist7'})
  }else{
    res.send({code:0 , data:{id:'abc123',username,password}})
  }*/
})
function testSave(){ //通过model实例的save（）添加数据
  const userModel = new UserModel({username: 'huzhongzhou',password: md5('huzhongzhou'),menus:['/Category',]}) //创建usermodel 实例
  userModel.save(function (err,user) {
    console.log('save',err,user)
  })
}
testSave()
// function req, res 是处理请求，返回响应


// const {username,password} =req.body
//处理：判断用户是否已经存在，如果存在，返回提示错误的信息，如果不存在，保存
//UserModel.findOne({username},function(err,user){
// if(user){如果存在
 // res.send({code:1,msg:'user exist'})
// }else{
// new UserModel({username,password}).save(function(err,user){      //password:md5(password)
// 生产一个cookie
// res.cookie('userid',user._id,{maxAge:1000*60*60*24})
// const data={username,type,_id:user,_id} 不要携带密码
// res.send({code:0,data})
// })
// }
// })

const filter={password:0}//查询时过滤出指定的属性
//登陆的路由
router.post('/login',function(req,res){
  const {username,password}=req.body
  //根据数据库username和password的users集合，是否存在，无则返回错误信息，
  UserModel.findOne({username,password:md5(password)},filter,function(err,user){
    if(user){
      res.cookie('userid',user._id,{maxAge:1000*60*60*24})
      res.send({code:0,data:user})
    }else{
      res.send({code:1,msg:'password 11incorrect'})
    }
  })
})
module.exports = router;
