import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewPage from './pages/review/review';
import LoginPage from './pages/login/loginPage';
import ReservationPage from './pages/reservation/reservation'
import AdminPage from './pages/admin/admin'
import SignupPage from './pages/signup/signupPage';
import ChatPage from './pages/chat/chatPage';
import MainPage from './pages/Main/main'
import Write from "./pages/review/write/write";
import Recomendation from "./pages/route/route"
import RecMbtiPage from "./pages/recomendation/MBTI/mbti";
import RecPersonalPage from "./pages/recomendation/Personal/personal";
import Chatbot from "./pages/chatbot/chatBot";
import MyPage from "./pages/My/mypage"
import InformationPage from "./pages/recomendation/Information/information"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/review/write" element={<Write />}/>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/reservation" element={<ReservationPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/route" element={<Recomendation />}/>
                <Route path="/recomendation/mbti" element={<RecMbtiPage />}/>
                <Route path="/recomendation/personal" element={<RecPersonalPage />}/>
                <Route path="/recomendation/information" element={<InformationPage />}/>
                <Route path="/my" element={<MyPage/>}/>
                <Route path="/chatbot" element={<Chatbot/>}/>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
