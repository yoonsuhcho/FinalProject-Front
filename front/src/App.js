import Home from "./Home";
import Login from "./Login";
import Join from "./Join";
import BoardList from "./board/BoardList";
import BoardItem from "./board/BoardItem";
import BoardUpdateItem from "./board/BoardUpdatetem";
import BoardWrite from "./board/BoardWrite";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import Find from "./Find";
import Basic from "./Basic";
import SearchId from "./SearchId";
import ResetPassword from "./ResetPassword";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/*홈 페이지*/}
                <Route path="/" element={<Home/>}/>
                {/*가입 페이지*/}
                <Route path="/join" element={<Join/>}/>
                {/*로그인 페이지*/}
                <Route path="/login" element={<Login/>}/>
                {/*게시판 페이지*/}
                <Route path="/BoardList" element={<BoardList/>}/>
                {/*게시판 상세보기*/}
                <Route path='/BoardItem/:itemId' element={<BoardItem/>}/>
                <Route path='/BoardUpdateItem/:itemId' element={<BoardUpdateItem/>}/>
                <Route path='/BoardList/write' element={<BoardWrite/>}/>
                <Route path='/Find' element={<Find/>}/>
                <Route path='/Basic' element={<Basic/>}/>
                <Route path='/Basic' element={<Basic/>}/>
                <Route path='/SearchId' element={<SearchId/>}/>
                <Route path='/ResetPassword' element={<ResetPassword/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
