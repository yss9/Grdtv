import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewPage from './pages/reviewPage/reviewPage';
import ScrollPage from './pages/scrollPage/scrollPage';
import SearchBarAniTest from './pages/SearchBarAniTest/SearchBarAniTest';
import LoginPage from './pages/LoginPage/index';
import ChatListPage from './pages/chatList/chatList'
import AdminPage from './pages/admin/admin'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/scroll" element={<ScrollPage />} />
                <Route path="/searchbar" element={<SearchBarAniTest />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/chatList" element={<ChatListPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
