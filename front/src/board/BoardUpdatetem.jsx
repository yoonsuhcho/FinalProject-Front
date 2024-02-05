import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import './BoardItem.css';
import logoImg from "../img/logo.png";

const HandleUpdateSubmit = async ({body, navigate}) => {
    console.log('test111', body)
    axios.post('/board/update/' + body.id,
        {
            'title': body.title,
            'content': body.content,
            'latitude': 0,
            'longitude': 0,
            'boardType': sessionStorage.getItem('board_type')
        }, {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
    ).then((response) => {
        if (sessionStorage.getItem('token') == null) {
            alert("비회원 이용불가")
        } else {
            alert('수정 완료.')
            navigate(-1)
        }
    }).catch((error) => {
        alert('작성 실패.')
    });
}

function GetData(itemId) {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [result, setResult] = useState({});

    const body = {
        id: itemId,
        title: title,
        content: content
    }

    useEffect(() => {
        axios.get('/board/edit/' + itemId,
            {
                headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}
            }
        ).then((response) => {
            setResult(response.data.result);
            setTitle(response.data.result.title);
            setContent(response.data.result.content);
        })
    }, []);

    const item = (<>
        <head>
            <meta charSet="UTF-8"/>
            <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
            <meta name='viewport'/>
            <title>Document</title>
            <link rel="stylesheet" href="../dist/style.css"/>
        </head>
        <body>
        <div className="board-item-wrapper">
            <div className="board-item-row">
                <label>게시글 번호</label>
                <label>{result.id}</label>
            </div>
            <div className="board-item-row">
                <label>제목</label>
                <input value={title} onChange={(event) => setTitle(event.target.value)}></input>
            </div>
            <div className="board-item-row">
                <label>내용</label>
                <textarea value={content} onChange={(event) => setContent(event.target.value)}></textarea>
            </div>
            <button className="board-item-go-list-btn" onClick={() => HandleUpdateSubmit({body, navigate})}>수정</button>
        </div>
        </body>
    </>)

    return item;
}

function BoardUpdateItem() {
    const navigate = useNavigate();

    const goToFree = () => {
        sessionStorage.setItem('board_type', 'FREE')
        goToBoardList()
    }

    const goToQna = () => {
        sessionStorage.setItem('board_type', 'QNA')
        goToBoardList()
    }

    const goToNotice = () => {
        sessionStorage.setItem('board_type', 'NOTICE')
        goToBoardList()
    }

    const goToReview = () => {
        sessionStorage.setItem('board_type', 'REVIEW')
        goToBoardList()
    }

    const goToTip = () => {
        sessionStorage.setItem('board_type', 'TIP')
        goToBoardList()
    }

    const goToPhoto = () => {
        sessionStorage.setItem('board_type', 'PHOTO')
        goToBoardList()
    }

    const goToBoardList = () => {
        if (sessionStorage.getItem('token') == null) {
            alert("비회원 이용불가")
        } else {
            navigate("/BoardList");
        }
    }

    const goToHome = () => {
        navigate("/");
        sessionStorage.setItem('board_type', 'FREE')
    }

    const goToLogout = () => {
        sessionStorage.removeItem('token')
        goToHome()
    }

    const {itemId} = useParams();
    const item = GetData(itemId);

    return (<>
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
                    {sessionStorage.getItem('board_type') == 'FREE' ?
                        <a href="" onClick={goToFree}> <b>자유게시판</b> </a> :
                        <a href="" onClick={goToFree}> 자유게시판 </a>
                    }
                    {sessionStorage.getItem('board_type') == 'QNA' ?
                        <a href="" onClick={goToQna}><b>질문게시판</b></a> :
                        <a href="" onClick={goToQna}>질문게시판</a>
                    }
                    {sessionStorage.getItem('board_type') == 'NOTICE' ?
                        <a href="" onClick={goToNotice}><b>공지사항</b></a> :
                        <a href="" onClick={goToNotice}>공지사항</a>
                    }
                    {sessionStorage.getItem('board_type') == 'REVIEW' ?
                        <a href="" onClick={goToReview}><b>리뷰게시판</b></a> :
                        <a href="" onClick={goToReview}>리뷰게시판</a>
                    }

                </ul>
            </nav>
            <div>
                {item}
            </div>
        </div>
    </>);
}

export default BoardUpdateItem;
