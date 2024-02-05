import React, {useState} from 'react';
import logoImg from "./img/logo.png";
import {useNavigate} from "react-router-dom";
import axios from 'axios'

export default function Join() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userid, setUserid] = useState("");
    const [username, setUserName] = useState("");

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [userIdValid, setUserIdValid] = useState(false);
    const [userNameValid, setUserNameValid] = useState(false);

    const handleUserId = (e) => {
        setUserid(e.target.value);
        const regex =
            /^(?=.*[a-zA-z0-9]).{4,20}$/;
        if (regex.test(e.target.value)) {
            setUserIdValid(true);
        } else {
            setUserIdValid(false);
        }
    };
    const handleUserName = (e) => {
        setUserName(e.target.value);
        const regex =
            /^.{3,20}$/;
        if (regex.test(e.target.value)) {
            setUserNameValid(true);
        } else {
            setUserNameValid(false);
        }
    };
    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex =
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (regex.test(e.target.value)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
    };
    const handlePw = (e) => {
        setPassword(e.target.value);
        const regex =
            /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        } else {
            setPwValid(false);
        }
    };

    const goToHome = () => {
        navigate("/");
    }

    const goToLogin = () => {
        navigate("/Login");
    }

    const handleConfirm = () => {
        axios.post('/join',
            {
                userid,
                username,
                email,
                password
            },
            {
                headers: {
                    'Content-type': 'application/json'
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                if (response.data.message === 'success') {
                    alert('가입 완료.')
                    // 로그인 페이지로 이동
                    goToLogin()
                } else {
                    alert(response.data.message)
                }
            })
            .catch((response) => {
                console.log('Error!')
            });
    }

    return (
        <div className="join">
            <div className="nav">
                <div className="category">

                </div>
                <div className="logo">
                    <a href="" onClick={goToHome}>
                        {/*<img src={logoImg} alt=""/>*/}
                        <h1>GOLF</h1>
                    </a>
                </div>
            </div>

            <div className="page">
                <div className='titleWrap'>
                    회원가입 정보를
                    <br/>
                    입력해 주세요
                </div>

                <div className="contentWrap">
                    <div className='inputTitle'>ID</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder="영문, 숫자 4자 이상"
                            value={userid}
                            onChange={handleUserId}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userIdValid && userid.length > 0 && (
                                <div>영문, 숫자 4자 이상 입력해주세요</div>
                            )
                        }
                    </div>

                    <div style={{marginTop: "26px"}} className='inputTitle'>이름</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder="3자 이상"
                            value={username}
                            onChange={handleUserName}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !userNameValid && username.length > 0 && (
                                <div>3자 이상 입력해주세요</div>
                            )
                        }
                    </div>


                    <div style={{marginTop: "26px"}} className='inputTitle'>이메일 주소</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            placeholder="test@gmail.com"
                            value={email}
                            onChange={handleEmail}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !emailValid && email.length > 0 && (
                                <div>올바른 이메일을 입력해주세요</div>
                            )
                        }
                    </div>

                    <div style={{marginTop: "26px"}} className='inputTitle'>비밀번호</div>
                    <div className="inputWrap">
                        <input
                            className="input"
                            type={"password"}
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상"
                            value={password}
                            onChange={handlePw}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !pwValid && password.length > 0 && (
                                <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
                            )
                        }
                    </div>
                </div>

                <div>
                    <button disabled={!pwValid || !userIdValid || !userNameValid || !emailValid} onClick={handleConfirm}
                            className="bottomButton">
                        확인
                    </button>
                </div>
            </div>
        </div>
    )
}
