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
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                } else {
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    } else{
                        if(option === false ){
                            props.history.push('/');
                        }
                    }
                }
            })

        }, [])

        return(
            <SpecificComponent />
        )

    }
    
    return AuthenticationCheck
}