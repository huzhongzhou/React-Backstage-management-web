

/*
进行local数据存储管理的工具模块
*/
const USER_KEY ='user_key'
export default{
    //保存
saveUser(user){
    localStorage.setItem(USER_KEY,JSON.stringify(user)) // 因为user是一个OBJ对象，存储会显示成【OBJ】，json.stringify变成jason模式

    //store.set(USER_KEY,user)
},

    //读取
getUser(){
    return JSON.parse(localStorage.getItem(USER_KEY)||'{}')  //空数据返回null
    //store.get(USER_KEY)||{}
},

    //删除
removeUser(){
    localStorage.removeItem(USER_KEY)
    //store.remove(USER_KEY)
}
}