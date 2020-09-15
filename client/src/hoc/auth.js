import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null){

    /*
    여기서 option은 null, true, false가 존재
    null 은 아무나 출입이 가능한 페이지
    true 는 로그인한 유저만 출입 가능한 페이지
    false 는 로그인한 유저는 출입 불가능한 페이지

    */
    
    function AuthenticationCheck(props){
        const dispatch = useDispatch();

        useEffect(() => {
            //리덕스를 사용하여 dispatch로 액션을 날려요
            dispatch(auth().then(response => {
                console.log()
            }))

        }, [])

    }
    
    return AuthenticationCheck
}