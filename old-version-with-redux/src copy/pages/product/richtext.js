import React,{Component} from 'react'

import {EditorState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
export default class Richtext extends Component{
    state = {
        editorState:EditorState.createEmpty(), // 创建一个没有内容的编辑对象
    }
    onEditorStateChange =(editorState)=>{   //输入过程中事实回掉
        this.setState({
            editorState
        })
    }
    getDetail=()=>{
        //返回输入数据对应的html标签结构
        return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    }
    render(){
        const {editorState} = this.state;
        return(
            
            <div>
               <Editor
               editorState ={editorState}
               editorStyle={{border:'1px solid black' ,minHeight:300, padding:10}}
               onEditorStateChange = {this.onEditorStateChange}>
                   
               </Editor>
               {/* <textarea
               disabled
               value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}>

               </textarea> */}
            </div>
        )
    }
}