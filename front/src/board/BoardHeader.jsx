import React from 'react';
import { Link } from 'react-router-dom';
import './BoardHeader.css';

const BoardHeader = props => {
    return (
        <div className="board-header">
            <Link to='/BoardList/write'>
                <button align="right" className="board-item-go-list-btn" >
                    게시글 작성
                </button>
            </Link>
        </div>
    )
}

export default BoardHeader;