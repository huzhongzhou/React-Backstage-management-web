export const firstCate = [
    {   'parentid':0,
        "ProdId": 1,
        "ProdName": "book"
      },
      {'parentid':0,
        "ProdId": 2,
        "ProdName": "instrument"
      },
      {'parentid':0,
        "ProdId": 3,
        "ProdName": "gift"
      },
      
]
export const subCate2 =  [
    {'parentid':2,
      "ProdId": 3,
      "ProdName": "piano"
    },
    {'parentid':2,
      "ProdId": 4,
      "ProdName": "violin"
    }
  ]
export const subCate1 = [
    {'parentid':1,
      "ProdId": 1,
      "ProdName": "textbook"
    },
    {'parentid':1,
      "ProdId": 2,
      "ProdName": "exercise_book"
    }
  ]

  export const subCate3 = [
    {'parentid':3,
      "ProdId": 5,
      "ProdName": "toy"
    }
  ]
 export const addfirstCate=(parentid,ProdName)=>{
   if(parentid == 0){
    var obj = {}
    obj.parentid =0
    obj.ProdId =firstCate.length+1
    obj.ProdName = ProdName
    firstCate.push(obj)
   }else if(parentid ==2){
    var obj = {}
    obj.parentid=2
    obj.ProdId =subCate2.length+1
    obj.ProdName = ProdName
    
    subCate2.push(obj)
   }else if(parentid ==1 ){
    var obj = {}
    obj.parentid=1
    obj.ProdId =subCate1.length+1
    obj.ProdName = ProdName
    subCate1.push(obj)
   }else if (parentid ==3){
    var obj = {}
    obj.parentid=3
    obj.ProdId =subCate3.length+1
    obj.ProdName = ProdName
    subCate3.push(obj)
   }
        
}

export const updateCate =(cateindex,newname)=>{
     let item= firstCate[cateindex -1]
     item.ProdName=newname
}