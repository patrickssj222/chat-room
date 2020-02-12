import React from 'react';
import './App.css';
import {Route, Switch} from 'dva/router';
import {AppState, cookies} from "./types";
import {connect} from "dva";
import Login from "./component/Login/Login";
import ChatRoom from "./component/ChatRoom/ChatRoom";
import SignUp from "./component/SignUp/SignUp";

interface Props{
    dispatch: any
    history: any
    user: string
}

class App extends React.Component<Props>{
    constructor(props) {
        super(props);
    }
    componentDidMount(): void {
        if(!cookies.get("username")||!this.props.user){
            this.props.history.push("/login");
        }
    }

    render(){
        return (
            <div className="App">
                    <Switch>
                        <Route exact path={'/'} component={ChatRoom}/>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/sign-up'} component={SignUp}/>
                    </Switch>
            </div>
        );
    }
}
const mapStateToProps = (state: AppState) => ({
    user:state.global.user
});
export default connect(mapStateToProps)(App);
