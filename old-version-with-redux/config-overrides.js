const {override,fixBabelImports,addLessLoader}=require('customize-cra');

module.exports= override(
    //針對antd實現按需打包：根據import來打包
    fixBabelImports('import',{
        libraryName:'antd',
        libraryDirectory:'es',
        style:'true',//自動打包相應的樣式//css 編譯后的css文件；true 處理less源碼文件
    }),

    addLessLoader({
        javascriptEnabled:true,
        modifyVars:{'@primary-color':'#1DA57A'}
    })
 
);