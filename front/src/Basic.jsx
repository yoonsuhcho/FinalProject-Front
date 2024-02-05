import React, {useEffect, useState} from 'react'
import logoImg from "./img/logo.png";
import {useNavigate} from "react-router-dom";


const Basic = () => {
    const [htmlContent, setHtmlContent] = useState(''); // HTML 내용을 저장할 상태

    useEffect(() => {
        if (sessionStorage.getItem('basic_type') == null) {
            sessionStorage.setItem('basic_type', '1')
        }
        fetch(
            '/' + sessionStorage.getItem('basic_type') + '.html') // 대상 페이지 URL을 지정합니다.
            .then(response => response.text()) // 응답을 텍스트로 변환합니다.
            .then(htmlString => {
                // HTML 문자열을 이곳에서 사용할 수 있습니다.

                // 예를 들어, HTML 문자열을 React 컴포넌트에 삽입할 수 있습니다.
                // 이 코드는 React 컴포넌트 내에서 사용하는 예제입니다.
                setHtmlContent(htmlString); // 가져온 HTML 내용을 상태에 설정
            })
            .catch(error => {
                console.error('Error fetching HTML:', error);
            });

    }, []);

    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
        sessionStorage.removeItem('basic_type')
    }

    const goToLogout = () => {
        sessionStorage.removeItem('token')
        goToHome()
    }

    const goToBasic1 = () => {
        sessionStorage.setItem('basic_type', '1')
    }

    const goToBasic2 = () => {
        sessionStorage.setItem('basic_type', '2')
    }

    const goToBasic3 = () => {
        sessionStorage.setItem('basic_type', '3')
    }

    const goToBasic4 = () => {
        sessionStorage.setItem('basic_type', '4')
    }

    const goToBasic5 = () => {
        sessionStorage.setItem('basic_type', '5')
    }

    const goToBasic6 = () => {
        sessionStorage.setItem('basic_type', '6')
    }


    return (
        <>
            <div className="board">
                <div className="nav">
                    <div className="category">

                    </div>
                    <div className="logo">
                        <a href="" onClick={goToHome}>
                            {/*<img src={logoImg} alt=""/>*/}
                            <h1>GOLF</h1>
                        </a>
                    </div>
                    <div className={"nav_but"}>
                        {sessionStorage.getItem('token') != null ? <a href="" onClick={goToLogout}>로그아웃</a> : <a></a>}
                    </div>
                </div>

                <nav className="nav_bar">
                    <ul className={"nav_bar_menu"}>
                        {sessionStorage.getItem('basic_type') == '1' ?
                            <a href="" onClick={goToBasic1}> <b>골프의 올바른 정렬</b> </a> :
                            <a href="" onClick={goToBasic1}> 골프의 올바른 정렬 </a>
                        }
                        {sessionStorage.getItem('basic_type') == '2' ?
                            <a href="" onClick={goToBasic2}><b>올바른 골프 자세</b></a> :
                            <a href="" onClick={goToBasic2}>올바른 골프 자세</a>
                        }
                        {sessionStorage.getItem('basic_type') == '3' ?
                            <a href="" onClick={goToBasic3}><b>골프공까지의 정확한 거리</b></a> :
                            <a href="" onClick={goToBasic3}>골프공까지의 정확한 거리</a>
                        }
                        {sessionStorage.getItem('basic_type') == '4' ?
                            <a href="" onClick={goToBasic4}><b>손의 올바른 위치</b></a> :
                            <a href="" onClick={goToBasic4}>손의 올바른 위치</a>
                        }
                        {sessionStorage.getItem('basic_type') == '5' ?
                            <a href="" onClick={goToBasic5}><b>완벽한 골프 자세</b></a> :
                            <a href="" onClick={goToBasic5}>완벽한 골프 자세</a>
                        }
                        {sessionStorage.getItem('basic_type') == '6' ?
                            <a href="" onClick={goToBasic6}><b>적절한 골프 그립</b></a> :
                            <a href="" onClick={goToBasic6}>적절한 골프 그립</a>
                        }

                    </ul>
                </nav>
                <div className="basicContainer" dangerouslySetInnerHTML={{__html: htmlContent}}/>
            </div>
        </>
    )
};

export default Basic;
