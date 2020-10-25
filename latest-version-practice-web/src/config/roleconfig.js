import {  formateDate} from "../utils/date";
import memoryutils from "../utils/mermory";
export const roless =[
    {
        menus:['/home','/products','/category','/role'],
        id:'0',
        name:'role1',
        createtime:'1',
        authtime:'',
        authname:'',
    },
    {
        menus:['/home','/products','/category',],
        id:'1',
        name:'role2',
        createtime:'1',
        authtime:'',
        authname:'',
    }
]

export const addnewrole =(name)=>{
    let newrole={ 
        menus:['/home','/products','/category','/role'],
        id:roless.length+1,
        name:name,
        createtime:formateDate(Date.now()),
        authtime:'',
        authname:memoryutils.user.username,
        }
        roless.push(newrole)
        console.log(roless)
        return newrole
}
