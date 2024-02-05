import React, {Component} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

class CommentList extends Component {

    handleDelete = (k) => {
        const commentToDelete = this.props.list[k];

        // commentText를 사용하여 댓글을 저장하거나 전달합니다.
        // 예를 들어, 부모 컴포넌트로 전달하여 댓글 목록을 업데이트할 수 있습니다.
        axios.delete('/comment/delete/' + commentToDelete.id, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-type': 'application/json'
                }
            }
        ).then((response) => {
            console.log(response.data);
            if (response.data.message === 'success') {
                alert('삭제 완료')
                this.props.onCommentRemove({id: this.props.list[k]}.id);
            } else {
                alert(response.data.message)
            }
        }).catch((response) => {
            console.log('Error!')
        });
    }

    renderList = () => this.props.list.map((v, k) => {
        const shouldDisplayDeleteButton = v.writer === sessionStorage.getItem('userid');

        return (
            <div className='comment-row-form'>
                <ul className='comment-row' key={k}>
                    <li className='comment-id'>{v.writer}</li>
                    <li className='comment-content'>
                        <span>{v.content}</span>
                    </li>
                    <li className='comment-date'>{v.date}</li>
                </ul>
                {shouldDisplayDeleteButton && (
                    <input type="submit" className="del" value="삭제" onClick={() => this.handleDelete(k)}/>
                )}
            </div>
        )
    })

    render() {
        return (
            <li>
                {this.renderList()}
            </li>
        )
    }
}

export default CommentList