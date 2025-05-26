import React from 'react';

function HomePage() {
    // 환경 변수에서 백엔드 OAuth2.0 카카오 인증 시작 URL 가져오기
    const KAKAO_AUTH_URL = process.env.REACT_APP_BACKEND_OAUTH2_KAKAO_URL;

    const handleKakaoLogin = () => {
        // 이 부분이 핵심: 사용자의 브라우저를 백엔드의 OAuth2.0 인증 시작 URL로 리다이렉트
        window.location.href = KAKAO_AUTH_URL;
    };

    // 현재 로그인 상태를 확인하는 예시 (실제 앱에서는 JWT 유효성 검사 필요)
    const isLoggedIn = localStorage.getItem('accessToken');

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>환영합니다!</h1>
            {isLoggedIn ? (
                <div>
                    <p>로그인되었습니다. 내 정보를 확인하세요!</p>
                    <button onClick={() => {
                        localStorage.removeItem('accessToken'); // JWT 토큰 제거
                        localStorage.removeItem('refreshToken'); // JWT 토큰 제거
                        window.location.reload(); // 로그아웃 후 페이지 새로고침
                    }}>로그아웃</button>
                    {/* 로그인 후 보여줄 다른 컨텐츠 */}
                </div>
            ) : (
                <div>
                    <p>서비스를 이용하시려면 로그인해주세요.</p>
                    {/* 카카오 로그인 버튼 */}
                    <button
                        onClick={handleKakaoLogin}
                        style={{
                            padding: '10px 20px',
                            fontSize: '18px',
                            backgroundColor: '#FEE500', // 카카오 브랜드 색상
                            color: '#3C1E1E',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        카카오 로그인
                    </button>
                </div>
            )}
        </div>
    );
}

export default HomePage;