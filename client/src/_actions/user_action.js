import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';

export function loginUser(dataTosubmit) {
    //request는 백엔드에서 가져온 모든 데이터
    const request = axios.post('/api/users/login',dataTosubmit)
    .then(response => response.data)
    // request를 페이로드에 넣어서 보낸다
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser(dataTosubmit) {
    //request는 백엔드에서 가져온 모든 데이터
    const request = axios.post('/api/users/register',dataTosubmit)
    .then(response => response.data)
    // request를 페이로드에 넣어서 보낸다
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function auth() {
    //request는 백엔드에서 가져온 모든 데이터
    const request = axios.get('/api/users/auth')
    .then(response => response.data)
    // request를 페이로드에 넣어서 보낸다
    return {
        type: AUTH_USER,
        payload: request
    }
}