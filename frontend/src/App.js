import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReviewPage from './pages/reviewPage/reviewPage';
import ScrollPage from './pages/scrollPage/scrollPage';
import SearchBarAniTest from './pages/SearchBarAniTest/SearchBarAniTest';
import LoginPage from './pages/LoginPage/index';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/scroll" element={<ScrollPage />} />
                <Route path="/searchbar" element={<SearchBarAniTest />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
