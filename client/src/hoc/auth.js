import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null){
    
    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth())

            //index.js 의 auth 부분에 request를 보내요
            Axios.get('/api/users/auth')

        }, [])

    }
    
    return AuthenticationCheck
}