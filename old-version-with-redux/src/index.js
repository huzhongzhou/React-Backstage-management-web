import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import 'antd/dist/antd.css'
import storage from './utils/storageUtil'
import memory from './utils/memory'
import{Provider} from 'react-redux'
import store from './redux/store'
const user = storage.getUser()
memory.user = user 
ReactDOM.render((
    <Provider store={store}> <BrowserRouter><App /></BrowserRouter></Provider>
   
)
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
