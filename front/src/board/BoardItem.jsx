import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';

import './BoardItem.css';
import logoImg from "../img/logo.png";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

function GetData(itemId) {
    const [result, setResult] = useState({});
    const [state, setState] = useState({
        value: '',
        list: [
        ]
    })

    useEffect(() => {
        axios.get('/board/edit/' + itemId,
            {
                headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}
            }
        ).then((response) => {
            setResult(response.data.result);
        })
    }, []);

    useEffect(() => {
        axios.get('/comment/list/' + itemId,
            {
                headers: {Authorization: 'Bearer ' + sessionStorage.getItem('token')}
            }
        ).then((response) => {
            setState({
                value: '',
                list: response.data.result
            });
        })
    }, []);

    // 댓글 추가 콜백 함수
    const addComment = (comment) => {
        console.log('test11', comment)
        setState((prevState) => ({
            value: '',
            list: [...prevState.list, comment],
        }));
    };

    // 댓글 삭제 콜백 함수
    const removeComment = (comment) => {
        console.log('test22', comment)
        setState((prevState) => ({
            value: '',
            list: prevState.list.filter(item => item.id !== comment.id),
        }));
    };

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
                <label>{result.title}</label>
            </div>
            <div className="board-item-row">
                <label>내용</label>
                <div>
                    {
                        result.content
                    }
                </div>
            </div>
            <Comment>
                <CommentForm boardId={result.id} onCommentSubmit={addComment}/>
                <CommentList list={state.list} onCommentRemove={removeComment}/>
            </Comment>
        </div>
        </body>
    </>)

    return item;
}

function BoardItem() {
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

export default BoardItem;
