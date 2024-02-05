import React, {Component} from "react";
import axios from "axios";

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentText: "", // 댓글 텍스트를 상태로 관리합니다.
        };
    }

    // 입력 필드 변경 핸들러
    handleInputChange = (event) => {
        this.setState({commentText: event.target.value});
    };

    // 폼 제출 핸들러
    handleSubmit = (event) => {
        event.preventDefault();
        const {commentText} = this.state;
        if (commentText.trim() === "") {
            return;
        }

        // commentText를 사용하여 댓글을 저장하거나 전달합니다.
        // 예를 들어, 부모 컴포넌트로 전달하여 댓글 목록을 업데이트할 수 있습니다.
        axios.post('/comment/create',
            {
                writer: sessionStorage.getItem('userid'),
                content: commentText,
                boardId: this.props.boardId
            }, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    'Content-type': 'application/json'
                }
            }
        ).then((response) => {
            console.log(response.data);
            if (response.data.message === 'success') {
                this.props.onCommentSubmit({writer: sessionStorage.getItem('userid'), content: commentText, id: response.data.result});
            } else {
                alert(response.data.message)
            }
        }).catch((response) => {
            console.log('Error!')
        });

        // 폼 제출 후 입력 필드 비우기
        this.setState({commentText: ""});
    };

    render() {
        return (
            <li className="comment-form">
                <form onSubmit={this.handleSubmit}>
          <span className="ps_box">
            <input
                type="text"
                className="int"
                placeholder="댓글을 입력해주세요."
                value={this.state.commentText} // 입력 필드의 값은 상태와 동기화됩니다.
                onChange={this.handleInputChange} // 입력 필드 변경 핸들러 연결
            />
          </span>
                    <input type="submit" className="btn" value="등록"/>
                </form>
            </li>
        );
    }
}

export default CommentForm;