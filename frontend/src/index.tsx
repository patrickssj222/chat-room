import React from 'react';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Router} from 'dva/router'
import {createBrowserHistory} from 'history'

import dva from "dva";
/*
if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
}*/

const r = (props: any) => {
    return (
        <Router history={props.history}>
            <Route path={"/"} component={App}/>
        </Router>
    )
};

const app = dva({history: createBrowserHistory()});
app.router(r);
app.start('#root');