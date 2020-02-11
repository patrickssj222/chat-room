import React from 'react';
import './App.css';
import {Route, Switch} from 'dva/router';
import {AppState} from "./types";
import {connect} from "dva";
import Login from "./component/Login/Login";
import ChatRoom from "./component/ChatRoom/ChatRoom";

interface Props{
    dispatch: any
}

class App extends React.Component<Props>{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="App">
                    <Switch>
                        <Route exact path={'/'} component={ChatRoom}/>
                        <Route path={'/login'} component={Login}/>
                    </Switch>
            </div>
        );
    }
}
export default connect(null)(App);
