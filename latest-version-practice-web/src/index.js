import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import storeage from './utils/storeage'
import memory from './utils/mermory'

//读取local中保存的user，保存到内存中
const  user = storeage.getuser()
memory.user = user 
ReactDOM.render(
  
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
