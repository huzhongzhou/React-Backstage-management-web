export const userlist =[
    {
        'menus':['/home','/products'],
        '_id':'1',
        'name':'asd',
        'time':'1111111',
        'email':'111@com',
        'role':'huzhongzhou'
    },
    {
        'menus':['/home'],
        '_id':'12',
        'name':'asqwed',
        'time':'11111211',
        'email':'2221@com',
        'role':'yangyilian'

    },
    ]


export const deleteuser=(user_id)=>{
    userlist.map((item,key)=>{if(item._id==user_id){
        userlist.splice(key,1)
      
    }
  /*   console.log(item._id) */
})
}

export const addnewuser =(newuser0)=>{
    userlist.push(newuser0)
}