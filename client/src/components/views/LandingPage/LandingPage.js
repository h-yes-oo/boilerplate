import React, {useEffect } from 'react';
import axios from 'axios';

function LandingPage() {
    // 랜딩페이지에 들어오자마자 아래를 실행해요
    useEffect(() => {
        // 서버에 get request를 보내요 이때, endpoint는 /api/hello
        axios.get('/api/hello')
        .then(response => console.log(response.data))
        //위의 코드는, 서버에서 돌아온 response를 콘솔에 찍어주는 것 !! index.js를 보면 됩니다
    }, [])
    return (
        <div>
            LandingPage 랜딩페이지
        </div>
    )
}

export default LandingPage
