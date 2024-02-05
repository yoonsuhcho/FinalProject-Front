import React from 'react';
import "./Home.css"
import {useNavigate} from "react-router-dom";
import logoImg from './img/logo.png';
import axios from "axios";

export default function Home() {
    const navigate = useNavigate();

    const goToJoin = () => {
        navigate("/Join");
    }

    const goToLogin = () => {
        navigate("/Login");
    }

    const goToBoardList = () => {
        if (sessionStorage.getItem('token') == null) {
            alert("비회원 이용불가")
        } else {
            navigate("/BoardList");
        }
    }

    const goToFind = () => {
        if (sessionStorage.getItem('token') == null) {
            alert("비회원 이용불가")
        } else {
            navigate("/Find");
        }
    }

    const goToWeather = () => {
        window.open("https://www.weather.go.kr/w/index.do", "_blank", "noopener, noreferrer");
    }

    const goToLogout = () => {
        sessionStorage.removeItem('token')
        document.location.href = '/'
    }

    const goToQuit = () => {
        if (window.confirm('정말 탈퇴하시겠습니까?')) {

            axios.delete('/deleteUser/',
                {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-type': 'application/json'
                    }
                }
            ).then((response) => {

                if (sessionStorage.getItem('token') == null) {
                    alert("비회원 이용불가")
                } else {
                    // alert('수정 완료.')
                    // navigate(-1)
                    alert('탈퇴 완료.');
                    sessionStorage.removeItem('token')
                    document.location.href = '/'
                }
            }).catch((error) => {
                alert('작성 실패.')
            }).finally(() => {
            });

        }
    }

    const goToHome = () => {
        navigate("/");
    }

    const goToBasic = () => {
        navigate("/Basic");
    }

    return (
        <div className="home">
            <div className="nav">
                <div className="category">

                </div>
                <div className="logo" style={{marginLeft : 7.5 + 'em'}}>
                    <a href="" onClick={goToHome}>
                        {/*<img src={logoImg} alt=""/>*/}
                        <h1>GOLF</h1>
                    </a>
                </div>
                <div className={"nav_but"}>
                    {sessionStorage.getItem('token') == null ? <a href="" onClick={goToJoin}>가입하기</a> : <a></a>}
                    {sessionStorage.getItem('token') == null ? <a href="" onClick={goToLogin}>로그인</a> : <a></a>}
                    {sessionStorage.getItem('token') != null ? <a href="" onClick={goToLogout}>로그아웃</a> : <a></a>}
                    {sessionStorage.getItem('token') != null ? <a onClick={goToQuit}>회원탈퇴</a>: <a></a>}
                </div>
            </div>

            <nav className="nav_bar">
                <ul className={"nav_bar_menu"}>
                    <a href="" onClick={goToBasic}>골프기초정보</a>
                    <a href="" onClick={goToFind}>주변골프연습장</a>
                    <a href="" onClick={goToBoardList}>커뮤니티</a>
                    <a href="" onClick={goToWeather}>날씨정보</a>
                </ul>
            </nav>

            <section className="header">
                <div className="title">
                    {/*<h1>FRONT END</h1>*/}
                    {/*<p>테스트</p>*/}
                    {/*<button>hack your life!</button>*/}
                </div>
            </section>
        </div>
    )
}
