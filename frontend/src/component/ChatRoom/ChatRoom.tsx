import React, { Component } from 'react';
import {connect} from "dva";
import {AppState} from "../../types";
import socketIOClient from "socket.io-client";
import "./ChatRoom.css";
import { animateScroll } from "react-scroll";

interface Props{
    loginError: string
}
interface message{
    username: string
    message: string
    time: string
}
interface State {
    username: string | null
    message: string | null
    message_list: message[] | null
    socket: any
}
class ChatRoom extends Component<Props,State> {
    private  textarea;
    constructor(props){
        super(props);
        this.state={
            username:"test",
            message: null,
            message_list:null,
            socket: null
        };
    }
    componentDidMount(): void {
        const socket = socketIOClient("localhost:3000");
        const currentTime = new Date();
        let preset = [];
        preset.push({username:"Chat_Helper", message:"Welcome to patrick's chat tool!", time:currentTime});
        this.setState({
           message_list:preset
        });
        socket.on("receive", data=>{
            console.log("received: ", data);
            this.setState((prevState)=>{
                let list = prevState.message_list;
                list.push(data);
                return{
                    ...prevState,
                    message_list: list
                }
            });
            animateScroll.scrollToBottom({
                containerId: "chat-history",
                duration:0
            });
        });
        this.setState({
            socket: socket
        });
    }

    handleKeyPress(e){
        if(e.key==="Enter"){
            if(!e.shiftKey){
                e.preventDefault();
                this.handleSubmit();
            }
        }
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
        if(this.state.message){
            const currentTime = new Date();
            console.log(this.state.message);
            const message = this.state.message;
            this.setState({
                message:null
            });
            this.textarea.value = "";
            this.textarea.focus();
            this.state.socket.emit("send", {username:this.state.username, message: message, time:currentTime.toISOString()});
        }

    }
    render() {
        console.log("message list", this.state.message_list);
        return (
            <div className={"chat-room"}>
                <div className={"chat-history"} id={"chat-history"}>
                    {
                        this.state.message_list?this.state.message_list.map((message)=>{
                            const time = new Date(message.time);
                            return(
                                <div className={`message${message.username===this.state.username?' self-message':''}`}>
                                    <div className={"message-title"}>
                                        <small className={"username"}>{message.username}</small>
                                        <small className={"time"}>{time.toLocaleString()}</small>
                                    </div>
                                    <div className={"message-bubble"}>
                                        {message.message}
                                    </div>
                                </div>
                            )
                        }):null
                    }
                </div>
                <div className={"message-wrapper"}>
                    <textarea
                        name={"message"}
                        autoFocus={true}
                        value={this.state.message}
                        onChange={this.handleChange.bind(this)}
                        ref={node => {this.textarea = node;}}
                        onKeyUp={this.handleKeyPress.bind(this)}
                    />
                    <button className={"btn btn-primary btn-lg"} onClick={this.handleSubmit.bind(this)}>Send</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
};
export default connect(mapStateToProps)(ChatRoom);
