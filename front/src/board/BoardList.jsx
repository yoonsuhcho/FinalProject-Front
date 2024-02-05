import React, {useEffect, useState} from 'react';
import axios from 'axios';

import CommonTable from './CommonTable';
import CommonTableColumn from './CommonTableColumn';
import CommonTableRow from './CommonTableRow';
import logoImg from "../img/logo.png";
import {Link, useNavigate} from "react-router-dom";
import CommonTableTitleColumn from "./CommonTableTitleColumn";
import BoardHeader from "./BoardHeader";

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

    return (Object.values(data)).map((item) => {
        const shouldDisplayModifyButton = item.writer === sessionStorage.getItem('userid');

        return item.boardType === type ?
            <CommonTableRow key={item.id}>
                <CommonTableColumn>{item.id}</CommonTableColumn>
                <Link to={`/BoardItem/${item.id}`}>
                    <CommonTableTitleColumn>{item.title}</CommonTableTitleColumn>
                </Link>
                <CommonTableColumn>{item.writer}</CommonTableColumn>
                {shouldDisplayModifyButton && (<Link to={`/BoardUpdateItem/${item.id}`}>
                    <CommonTableTitleColumn>수정</CommonTableTitleColumn>
                </Link>)}
                {shouldDisplayModifyButton && (<a onClick={() => deleteBoard(item.id)}>
                    <CommonTableTitleColumn>삭제</CommonTableTitleColumn>
                </a>)}
            </CommonTableRow>
            : ""
    });
}


const deleteBoard = (id) => {

    axios.delete('/board/delete/' + id,
        {
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                'Content-Type': "application/x-www-form-urlencoded"
            }
        }
    ).then((response) => {
        if (sessionStorage.getItem('token') == null) {
            alert("비회원 이용불가")
        } else {
            alert('삭제 완료.')
            // navigate(-1)
            window.location.reload();
        }
    }).catch((error) => {
        alert('삭제 실패.')
    });
}


export default function BoardList() {
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
            <BoardHeader></BoardHeader>
            <CommonTable headersName={['글번호', '제목', '작성자']}>
                {item}
            </CommonTable>
        </div>
    </>);
}
