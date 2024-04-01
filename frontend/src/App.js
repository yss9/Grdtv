import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ReviewPage from './pages/reviewPage/reviewPage';
import ScrollPage from './pages/scrollPage/scrollPage';
import LoginPage from './pages/LoginPage/index';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/scroll" element={<ScrollPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
