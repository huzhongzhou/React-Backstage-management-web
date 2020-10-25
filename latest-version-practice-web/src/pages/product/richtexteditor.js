import React,{ Component } from "react";
import { EditorState,converToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { draftToHtml } from "draftjs-to-html";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class Richtexteditor extends Component{
    state={
        //创建一个没有内容的编辑对象
        editorState:EditorState.createEmpty(),
    }

    onEditorStateChange=(editorState)=>{
        //文本框输入过程中实时回调
        this.setState({
            editorState,
        });
    };
    getdetail =()=>{
        //返回输入数据对应的html格式的文本
        return draftToHtml(converToRaw(this.state.editorState.getCurrentContent()))
    }
    render(){
        const {editorState}=this.state
        return (
            <div>
            <Editor
            editorState={editorState}
            // wrapperClassName = 'demo-wrapper'
            // editorClassName='demo-editor'
            editorStyle={{border:'1px solid black',minHeight:200, paddingLeft:10}}
            onEditorStateChange={this.onEditorStateChange}
            />

            {/* <textarea
            disabled
            value={draftToHtml(converToRaw(editorState.getCurrentContent()))}
            >
            </textarea> */}
            </div>

           
        )
    }
}