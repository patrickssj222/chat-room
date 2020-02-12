import {all, call, put, select} from "redux-saga/effects";
import axios from "axios";

export function* logIn(username: string, password:string) {
    try{
        let data = {
            username: username,
            password: password,
        };
        let response = yield call(
            axios.post,
            "/api/user/login",
            data,
            {
                validateStatus: function (status) {
                    return status >= 200 && status < 500; // default
                },
                headers: {'Access-Control-Allow-Origin': '*'}
            }
        );
        console.log(response);
        return response;
    }
    catch (e) {
        return "Error " + e;
    }
}

export function* signUp(username: string, password:string) {
    try{
        let data = {
            username: username,
            password: password,
        };
        let response = yield call(
            axios.post,
            "/api/user/sign-up",
            data,
            {
                validateStatus: function (status) {
                    return status >= 200 && status < 500; // default
                },
                headers: {'Access-Control-Allow-Origin': '*'}
            }
        );
        console.log(response);
        return response;
    }
    catch (e) {
        return "Error " + e;
    }
}