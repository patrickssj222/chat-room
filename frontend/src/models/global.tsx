import {Model} from "dva";
import {AppState, cookies, GlobalState} from "../types"
import {login_check} from "../saga/non-terminal";
import {logIn, signUp} from "../saga/terminal";
import {put, select} from "redux-saga/effects";
import { push } from 'react-router-redux';

export const globalModel:Model = {
    namespace: 'global',
    state: {
        user:null,
        loginError:null,
        signUpError:null,
        loading: false,
    },
    reducers: {
        set_user(state:GlobalState, action){
            return{
                ...state,
                user: action.payload
            }
        },
        set_login_error(state:GlobalState, action){
            return {
                ...state,
                loginError: action.payload
            }
        },
        set_sign_up_error(state:GlobalState, action){
            return {
                ...state,
                signUpError: action.payload
            }
        },
        set_loading(state: GlobalState, action){
            return{
                ...state,
                loading: action.payload
            }
        }
    },
    effects: {
        *saga_check_log_in(action){
            const {username, password} = action.payload;
            let response = yield logIn(username, password);
            if(response.status >=200 && response.status <=300){
                console.log(response);
                cookies.set("username",response.data.data);
                yield put({type:"global/set_user", payload:response.data.data});
                yield put({type:"global/set_login_error", payload:null});
                yield put({type:"global/set_sign_up_error", payload:null});
                yield put(push("/"));
            }
            else{
                yield put({type:"global/set_login_error", payload:response.data.error})
            }
        },
        *saga_check_sign_up(action){
            const {username, password} = action.payload;
            let response = yield signUp(username, password);
            if(response.status >=200 && response.status <=300){
                yield put({type:"global/set_login_error", payload:null})
                yield put({type:"global/set_sign_up_error", payload:null});
                yield put(push("/login"));
            }
            else{
                yield put({type:"global/set_sign_up_error", payload:response.data.error});
            }
        },
        *saga_log_out(action){
            const globalState: AppState = yield select();
            cookies.remove(globalState.global.user);
            yield put({type:"global/set_user", payload:null});
            yield put({type:"global/set_login_error", payload:null});
            yield put({type:"global/set_sign_up_error", payload:null});
        },
    },
    subscriptions: {

    }
};




