import React, { Component } from 'react';
import {connect} from "dva";
import {AppState} from "../../types";
import socketIOClient from "socket.io-client";

interface Props{
    loginError: string
}
interface message{
    [time:string]:{
        username: string
        message: string
    }
}
interface State {
    username: string | null
    message: string | null
    message_list: message[] | null
    socket: any
}
class ChatRoom extends Component<Props,State> {
    constructor(props){
        super(props);
        this.state={
            username:null,
            message: null,
            message_list:null,
            socket: null
        };
    }
    componentDidMount(): void {
        const socket = socketIOClient("localhost:3000");
        socket.on("receive", data=>{
            console.log("received: ", data);
            this.setState((prevState)=>{
                const list = prevState.message_list;
                list.push(data);
                return{
                    ...prevState,
                    message_list: list
                }
            })
        });
        this.setState({
            socket: socket
        })
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
    handleSubmit(){
        const currentTime = new Date();
        this.state.socket.emit("send", {currentTime:{username:this.state.username, message: this.state.message}});
    }
    render() {
        return (
            <div className={"chat-room"}>
                <div className={"chat-history"}>
                </div>
                <div className={"message-wrapper"}>
                    <input type={"text"} name={"message"} value={this.state.message} onChange={this.handleChange.bind(this)}/>
                    <button onClick={this.handleSubmit.bind(this)}>Send</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
};
export default connect(mapStateToProps)(ChatRoom);
