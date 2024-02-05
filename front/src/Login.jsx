import React, {useState} from 'react';
import logoImg from "./img/logo.png";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [userid, setUserid] = useState("");
    const [password, setPassword] = useState("");

    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);

    const handleId = (e) => {
        setUserid(e.target.value);
        const regex =
            /^(?=.*[a-zA-z0-9]).{4,20}$/;
        if (regex.test(e.target.value)) {
            setIdValid(true);
        } else {
            setIdValid(false);
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

    const goToSearchId = () => {
        navigate("/SearchId");
    }

    const goToResetPassword = () => {
        navigate("/ResetPassword");
    }

    const handleConfirm = () => {
        axios.post('/login',
            {
                userid,
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
                    // 로그인 성공값(토큰) 저장하고
                    sessionStorage.setItem('token', response.data.result)
                    sessionStorage.setItem('userid', userid)
                    // 로그인 성공하면 홈페이지로 이동
                    document.location.href = '/'
                } else {
                    alert(response.data.message)
                }
            })
            .catch((response) => {
                console.log('Error!')
            });
    }

    return (
        <div className="login">
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
                    ID, 패스워드를
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
                            onChange={handleId}
                        />
                    </div>
                    <div className="errorMessageWrap">
                        {
                            !idValid && userid.length > 0 && (
                                <div>영문, 숫자 4자 이상 입력해주세요</div>
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
                    <button disabled={!pwValid} className="bottomButton" onClick={handleConfirm}>
                        확인
                    </button>
                    <div className='search_user_info_div'>
                        <div><b style={{'marginLeft': '15px'}} onClick={goToSearchId}> 아이디 찾기 </b></div>
                        <div><b onClick={goToResetPassword}> 비밀번호 초기화 </b></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
