import React, {useEffect, useSelector } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

function LandingPage(props) {
    // 랜딩페이지에 들어오자마자 아래를 실행해요
    useEffect(() => {
        // 서버에 get request를 보내요 이때, endpoint는 /api/hello
        axios.get('/api/hello')
        .then(response => console.log(response.data))
        //위의 코드는, 서버에서 돌아온 response를 콘솔에 찍어주는 것 !! index.js를 보면 됩니다
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success) {
                    // history가 react-router-dom의 withRouter를 사용
                    props.history.push("/login")
                } else{
                    alert('로그아웃에 실패했습니다.')
                }
            })
    } 
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage);
