import React,{Component}from 'react'
import {Upload,Icon,Modal} from 'antd'
export default class Pictures extends Component {
    state = {
        previewVisible: false,
        previewImage:'',
        fileList:[
            /* {
                uid:'-1',  //每个file都应该有自己唯一的id
                name:'xxx.png', //图片文件名
                status:'done',// 图片状态：done -代表图片已上传   uploading ：正在上传中    removed：已经删除
                url:'' 
            } */
        ]
    }

    constructor(props){
        super(props)
        let fileList = []
        //如果传入了imgs属性
        const {imgs}= this.props
        console.log(imgs)
        if(imgs && imgs.length >0){
            fileList = imgs.map((img,index)=>({
                uid:-index,
                name:img,
                status:'done',
                url : img
            }))
        }
        this.state={
            previewVisible: false,
            previewImage:'',
            fileList
        }
    }
    handleCancel = ()=>this.setState({previewVisible:false});

    //显示指定file的文件
    handlePreview = file =>{
        this.setState({
            previewImage:file.url||file.thumbUrl,
            previewVisible:true,
        })
    }

    handleChange =({file,fileList})=>{
        //一旦上传成功，将当前上传的file的信息修正（name，url）
        if(file.status ==='done'){
            const result = file.response
            if(result.status ===0){
                const {name,url} = result.data
                file = fileList[fileList.length-1]
                file.name = name 
                file.url =url 
            }
        }else if (file.status ==='removed'){
            //这里要删除的file 直接用file ， 不使用fileList 是因为在此时filelist里面已经删除。不存在file
        }

        this.setState({fileList})
    }
//获取所有已上传图片文件名的数组
    getimgs =()=>{
        return this.state.fileList.map(file =>file.name)
    }
    render(){
        const {previewVisible,previewImage,fileList} = this.state;
        const uploadButton =(
            <div>
                <Icon type= 'plus'/>
                <div >upload</div>
            </div>
        )
        return(
            <div>
                <Upload
                    action=''  //上传图片的接口地址
                    accept='image/*'   //只接受图片格式
                    listType='picture-card'   //图片摆放方式
                    name='image'   //请求参数名
                    fileList={fileList} //用来指定所有已上传文件的列表
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >        
                {fileList.length >=3? null:uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt='example' style = {{width:'100%'}} src={previewImage}></img>
                </Modal>
            </div>
        )
    }
}