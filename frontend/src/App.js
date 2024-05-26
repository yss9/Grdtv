import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewPage from './pages/review/review';
import SearchBarAniTest from './pages/SearchBarAniTest/SearchBarAniTest';
import LoginPage from './pages/logIn/logInPage';
import ReservationPage from './pages/reservation/reservation'
import AdminPage from './pages/admin/admin'
import SignInPage from './pages/signIn/signInPage';
import ChatPage from './pages/chat/chatPage';
import MainPage from './pages/Main/main'
import Write from "./pages/review/write/write";
import Recomendation from "./pages/recomendation/recomendation"
import RecMbtiPage from "./pages/recomendation/MBTI/mbti";
import RecPersonalPage from "./pages/recomendation/Personal/personal";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/review/write" element={<Write />}/>
                <Route path="/searchbar" element={<SearchBarAniTest />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/reservation" element={<ReservationPage />} />
                <Route path="/signIn" element={<SignInPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/recomendation" element={<Recomendation />}/>
                <Route path="/recomendation/mbti" element={<RecMbtiPage />}/>
                <Route path="/recomendation/personal" element={<RecPersonalPage />}/>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
