import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReviewPage from './pages/review/review';
import ScrollPage from './pages/scrollPage/scrollPage';
import SearchBarAniTest from './pages/SearchBarAniTest/SearchBarAniTest';
import LoginPage from './pages/logIn/logInPage';
import ReservationPage from './pages/reservation/reservation'
import AdminPage from './pages/admin/admin'
import SignInPage from './pages/signIn/signInPage';
import MainPage from './pages/Main/main'
import Chat from './pages/chat/Chat'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/scroll" element={<ScrollPage />} />
                <Route path="/searchbar" element={<SearchBarAniTest />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/reservation" element={<ReservationPage />} />
                <Route path="/signIn" element={<SignInPage />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
