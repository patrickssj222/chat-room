import React, { Component } from 'react';
import './LogIn.css';
import {connect} from "dva";
import {AppState} from "../../types";
interface Props{
    loginError: string
}
interface State {
    username: string
    password: string
}
class LogIn extends Component<Props,State> {
    constructor(props){
        super(props);
        this.state={
            username:"",
            password: ""
        };
    }
    handleChange(e){
        const { name, value } = e.target;
        this.setState((prevState: State)=>{
            return{
                ...prevState,
                [name]: value
            }
        });
    }
    handleSubmit(username, password){

    }
    render() {
        const { username, password } = this.state;
        return (
            <div className="login-wrapper">
                <div className="container">
                    <div className="card card-container">
                        <img id="profile-img" className="profile-img-card" src={require("../../img/user.jpg")} alt={"Profile"}/>
                        <p id="profile-name" className="profile-name-card"/>
                        <div className="form-signin">
                            <span id="reauth-email" className="reauth-email"/>
                            <input type="text" className="form-control" placeholder="Username" name="username" value={username} onChange={this.handleChange.bind(this)} required autoFocus/>
                            <input type="password" className="form-control" placeholder="Password" name="password" value={password} onChange={this.handleChange.bind(this)} required/>
                            <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.handleSubmit.bind(this,username,password)}>Sign in</button>
                        </div>
                        {this.props.loginError && <p className="login-error">{this.props.loginError}</p>}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return{
        loginError:state.global.loginError,
    };
};
export default connect(mapStateToProps)(LogIn);
