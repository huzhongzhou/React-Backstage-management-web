export const rolelist =[
    {
        'menus':['/home','/products'],
        '_id':'1',
        'name':'huzhongzhou',
        'time':'1111111',
        'auttime':'222222',
        'modifier':'hao1231'
    },
    {
        'menus':['/home'],
        '_id':'12',
        'name':'yangyilian',
        'time':'11111211',
        'auttime':'22222222132',
        'modifier':'hao1231'
    },
    ]

export const addnewrole =(newrole)=>{
    var obj={}
    obj.name=newrole
    obj._id=rolelist.length+1
    rolelist.push(obj)
}
export const updateRole =()=>{
    console.log(typeof rolelist)
}