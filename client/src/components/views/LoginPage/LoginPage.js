import React, { useState } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
    const dispatch = useDispatch();
    //처음 state은 빈칸 ""으로 지정
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    //typing을 할때 onChange라는 이벤트를 발생시켜 state를 변화시키고, 그럼 value가 변하도록
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        //refresh 되지 않도록 막아주는 역할
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    // 리액트에서 페이지 이동하는 방식
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })

        Axios.post('/api/users/login',body).then(response => {

        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{ display:'flex', flexDirection: 'column'}} onSubmit = {onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
