import React , {useState} from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();
    //처음 state은 빈칸 ""으로 지정
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")
    //typing을 할때 onChange라는 이벤트를 발생시켜 state를 변화시키고, 그럼 value가 변하도록
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event) => {
        //refresh 되지 않도록 막아주는 역할
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('비밀번호 확인')
        }

        let body = {
            email: Email,
            password: Password,
            name: Name
        }

        dispatch(registerUser(body))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to sign up')
                }
            })

    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            <form style={{ display:'flex', flexDirection: 'column'}} onSubmit = {onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />

                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button>
                    회원가입
                </button>
            </form>
        </div>
    )
}

export default RegisterPage
