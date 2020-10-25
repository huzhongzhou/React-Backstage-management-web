export const productmenu=[
    {
        status:1,
        pid:'1',
        id:'6',
        cid:'6',
        name:'asus',
        desc:'123456789qwer',
        price: 2000,
        detail:''
    },
    {
        status:1,
        id:'11',
        pid:'2',
        cid:'11',
        name:'apple',
        desc:'123456789qwerasd',
        price: 12000,
        detail:''
    },
    {
        status:1,
        id:'3',
        pid:'0',
        cid:'3',
        name:'thinkpad',
        desc:'123456789qwerzxc',
        price: 5000,
        detail:''
    },
]

export const searchnew =(searchtype,keyvalue)=>{
    const searchedproduct =[]
    console.log(searchtype)
    productmenu.map(item=>{
    if(searchtype ==='name'){
        if(item.name.match(keyvalue)){
            console.log(item)
            searchedproduct.push(
                item
            )
        }
    }else{
        if(item.desc.match(keyvalue)){
            console.log(item)
            searchedproduct.push(
                item
            )
        }
    }
       
        //   if(item.search(keyvalue)){
        //       searchedproduct.push(
        //           item
        //       )
        //   }
        
    })
    // searchedproduct.push(
        console.log(searchedproduct)
    return searchedproduct
    // productmenu.find(item=>item.name ==keyvalue))
    
}

export const updatestatus =(id,status)=>{
  const getproduct=  productmenu.find(citem=>citem.id===id)
  const index =productmenu.indexOf(getproduct)
  productmenu[index].status=status

  return productmenu
}

export const updateproduct =(product)=>{
  
const shouldupdate=    productmenu.find(citem=>citem.cid===product.id)
shouldupdate.price=product.price
shouldupdate.name=product.name
shouldupdate.desc=product.desc
shouldupdate.pid=product.pid
shouldupdate.cid=product.cid
console.log(productmenu)
}

export const addnewproduct =(product)=>{
    product.status =1
    product.id=productmenu.length+1
  productmenu.push(product)
}