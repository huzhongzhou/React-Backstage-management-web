export const users =[
    {
        username:'huzhongzhou',
        userid:'0',
        email:'1@.com',
        phone:'1234444',
        time:'',
        roleid:'0',
    },
    {
        userid:'1',
        username:'wuqixin',
        email:'2@.com',  
        phone:'2221234444',
        time:'',
        roleid:'1',
    }
]

export const deleteuser=(userid)=>{
   
   const user= users.find(citem=>citem.userid===userid)
   const index = users.indexOf(user)
   users.splice(index,1)
    return users
}
export const adduser =(newuser)=>{
    let adduser =newuser
    adduser.userid=(users.length+1).toString()
    users.push(adduser)
    console.log(adduser)
    return adduser
}

export const updateuser =(userid,newuser)=>{
    newuser.userid=userid
    const needupdate = users.find(citem=>citem.userid===userid)
    const index = users.indexOf(needupdate)
    users[index] = newuser
    console.log(users)
    return users
}