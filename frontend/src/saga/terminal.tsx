import {all, call, select} from "redux-saga/effects";
import axios from "axios";

export function* logIn(username: string, password:string) {
    try{
        let data = {
            username: username,
            password: password,
        };
        const response = yield call (axios.post,
            "/api/user/login",
            data,
        );
        return response;
    }
    catch (e) {
        console.log("Error " + e);
        return "Error " + e;
    }
}