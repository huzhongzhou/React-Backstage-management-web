export const catemenu=[
    {
        parentid:'0',
        id:'1',
        name:'家用电器',
        children:[
            {
                parentid:'1',
                id:'6',
                name:'电视'
            },
            {
                parentid:'1',
                id:'7',
                name:'空调'
            },
            {
                parentid:'1',
                id:'8',
                name:'aaa'
            },
        ]
    },
    {
        parentid:'0',
        id:'2',
        name:'电脑',
        children:[
            {
                parentid:'2',
                id:'9',
                name:'电视'
            },
            {
                parentid:'2',
                id:'10',
                name:'空调'
            },
            {
                parentid:'2',
                id:'11',
                name:'aaa'
            },
        ]
    },
    {
        parentid:'0',
        id:'3',
        name:'图书',
        children:[
            {
                parentid:'4',
                id:'23',
                name:'电视'
            },
            
        ]
    },
    {
        parentid:'0',
        id:'4',
        name:'服装',
        children:[
            {
                parentid:'4',
                id:'13',
                name:'电视'
            },
            
        ]
    },
    {
        parentid:'0',
        id:'5',
        name:'食品',
        children:[
            {
                parentid:'5',
                id:'14',
                name:'电视'
            },
            {
                parentid:'5',
                id:'15',
                name:'空调'
            },
            {
                parentid:'5',
                id:'16',
                name:'aaa'
            },
        ]
    },
]

export const subcategory =[
    {
        parentid:'1',
        id:'6',
        name:'电视'
    },
    {
        parentid:'1',
        id:'7',
        name:'空调'
    },
    {
        parentid:'1',
        id:'8',
        name:'aaa'
    },
    
]

export const changemenu =(categoryid,newname)=>{
   
    const cate=catemenu.find(citem=>citem.id===categoryid)
    
    const index =catemenu.indexOf(cate)
    console.log(index)
    if(cate){
        catemenu[index].name=newname
    }else{
        catemenu.map((citem,index)=>{
            //好像是因为refenerce type直接修改值
         if(citem.children.find(bitem=>bitem.id===categoryid)){
             const getid =citem.children.find(bitem=>bitem.id===categoryid).parentid
             citem.children.find(bitem=>bitem.id===categoryid).name=newname
             console.log(citem.children.find(bitem=>bitem.id===categoryid).parentid)
         }
        })
    }
        // if(item.find(()=>item.id==categoryid)){
        //     console.log('111')
        // }else{
        //     console.log('222')
        // }
}
export const addmenu =(parentid,newcatename)=>{
    let newdata={parentid:'0',
    id:(catemenu.length+1).toString(),
    name:newcatename,
children:[]}
    catemenu.push(
        newdata
    )
    console.log(catemenu)
return catemenu
} 


export const getsubmenu =(categoryid)=>{
  
  const secondmenu =   catemenu.find(citem=>citem.id===categoryid)
  return secondmenu

}