//进行local数据存储管理的工具模块
export default{
    saveuser(user){
        localStorage.setItem('user_key',JSON.stringify(user))
        //如果直接（user）会成为一个对象的tostring方法，结果是【object，object】
    },

    getuser(){
        return JSON.parse(localStorage.getItem('user_key') || '{}') //如果没值会返回null

    },

    removeuser(){
        localStorage.removeItem('user_key')
    }
}
//或者使用插件， store
//store.set(user_key,user)
//return store.get(user_key)||{}
//store.remove(user_key)
