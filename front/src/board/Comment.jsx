import {Component} from "react";
import "./Comment.css"


class Comment extends Component {
    render() {
        return (
            <ul className='comment'>
                {this.props.children}
            </ul>
        )
    }
}

export default Comment