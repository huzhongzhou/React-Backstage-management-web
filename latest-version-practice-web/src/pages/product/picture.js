import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React from 'react'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false, //标识是否显示大图预览
    previewImage: '', //图的url
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',//图片状态：done代表已上传
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      
      
      // {
      //   uid: '-xxx',
      //   percent: 50,
      //   name: 'image.png',
      //   status: 'uploading',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // },
      // {
      //   uid: '-5',
      //   name: 'image.png',
      //   status: 'error',
      // },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  //传递给父组件信息
  // getimgs=()=>{
  //   return this.state.fileList.map(file=>file.name)
  // }

  handlePreview = async file => {
    //显示指定图片的大图预览
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview, //后面file。preview是即使没上传，有个默认显示
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
//file 是当前操作的图片文件（上传/删除）
  handleChange = ({ file,fileList }) => {
    console.log('111',file)
    //在上传过程中去更新
    //一旦上传成功，将当前上传的file的信息修正（name，url）
    // if(file.status==='done'){
    //   const result =file.response //{status:0,data:{name:xxx,url:...}}
    //   if(result.status===0){
    //     message.success('success')
    //     const file2=fileList[fileList.length-1]
    //     file2.name=name
    //     file2.url=url
    //   }else{
    //     message.error('fail')
    //   }
    // }//当上传成功时

    //当删除图片时
    // else if(file.status ==='removed'){
    //   //在此进行api数据图片的删除
    // }
    this.setState({ fileList })};

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" //上传图片的地址
          accept='image/*' //限制只能接收什么类型的文件，这里设置只能接收任意图片类型
          listType="picture-card" //每张图片的样式和效果
          //name属性 是设置请求参数名
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton} 
          {/* //控制最多上传数量 */}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null} //确认框下的确认，取消按钮
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

