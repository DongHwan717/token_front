import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
// import LoginPage from './pages/LoginPage'; // 별도의 로그인 페이지가 있다면

function App() {
    return (
        <Router>
            <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
                <Link to="/home" style={{ marginRight: '15px' }}>홈</Link>
                {/* <Link to="/login">로그인</Link> // 로그인 시작 페이지가 있다면 */}
            </nav>
            <Routes>
                <Route path="/" element={<HomePage />} /> {/* 초기 경로를 HomePage로 설정 */}
                <Route path="/home" element={<HomePage />} />
                <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} /> {/* 백엔드에서 리다이렉트될 경로 */}
                {/* <Route path="/login" element={<LoginPage />} /> */}
                {/* 필요에 따라 다른 라우트 추가 */}
            </Routes>
        </Router>
    );
}

export default App;