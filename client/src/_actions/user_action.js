import axios from 'axios';
import {
    LOGIN_USER
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