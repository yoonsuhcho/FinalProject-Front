import React, {useEffect, useState} from 'react';
import axios from 'axios';

import './BoardItem.css';
import logoImg from "../img/logo.png";
import {Link, useNavigate} from "react-router-dom";
import CommonTableColumn from "./CommonTableColumn";
import CommonTableRow from "./CommonTableRow";
import CommonTableTitleColumn from "./CommonTableTitleColumn";

function GetData(type) {
    const [data, setData] = useState({});
    useEffect(() => {
        axios.get('/board/list',
            {
                headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}
            }
        ).then((response) => {
            setData(response.data.result);
        })
    }, []);

    return (Object.values(data)).map((item) => (
        item.boardType === type ?
            <CommonTableRow key={item.id}>
                <CommonTableColumn>{item.id}</CommonTableColumn>
                <Link to={`/BoardList/${item.id}`}>
                    <CommonTableTitleColumn>{item.title}</CommonTableTitleColumn>
                </Link>
                <CommonTableColumn>{item.writer}</CommonTableColumn>
            </CommonTableRow>
            : ""
    ));
}

const HandleWriteSubmit = async ({body, navigate}) => {
    axios.post('/board/create',
        {
            'title': body.title,
            'content': body.content,
            'latitude': 0,
            'longitude': 0,
            'boardType': sessionStorage.getItem('board_type')
        },{
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
    ).then((response) => {
        if (sessionStorage.getItem('token') == null) {
            alert("비회원 이용불가")
        } else {
            alert('작성 완료.')
            navigate(-1)
        }
    }).catch((error) => {
        alert('작성 실패.')
    });
}

function BoardWrite() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const body = {
        title: title,
        content: content
    }
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
    const item = GetData(sessionStorage.getItem('board_type'));

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
            <h2 align="center">게시글 작성</h2>
            <div className="board-item-wrapper">
                <div className="board-item-row">
                    <label>제목</label>
                    <input onChange={(event) => setTitle(event.target.value)}></input>
                </div>
                <div className="board-item-row">
                    <label>내용</label>
                    <textarea onChange={(event) => setContent(event.target.value)}></textarea>
                </div>
                <button className="board-item-go-list-btn" onClick={() => HandleWriteSubmit({body, navigate})}>등록</button>
            </div>
        </div>
    </>);
}

export default BoardWrite;
