import {all, call, put, select} from "redux-saga/effects";
import axios from "axios";
import {logIn} from "./terminal";
import Cookies from 'universal-cookie';
export function* login_check(username:string, password:string){
    let response = yield logIn(username, password);
    if(response){
        yield put({type:"global/set_error",payload:null});
        const cookies = new Cookies();
        cookies.set('user', username, { path: '/' });
        window.location.href = "localhost:3000";
    }
    else if(response.data&&response.data.error){
        yield put({type:"global/set_error",payload:{code:response.status, error:response.data.error, message:response.data.error_description}})
        yield put({type:"global/set_loading",payload:false})
    }
}
