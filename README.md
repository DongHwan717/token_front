# 설정 파일
## .env
OAUTH2 관련 설정 관리하는 파일

# 뷰
## App.js
``` JavaScript
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
```

## HomePage.js
localStorage 변수에 담긴 토큰 값 확인 후 분기
``` JavaScript
    {isLoggedIn ? (
        <div>
            <p>로그인되었습니다. 내 정보를 확인하세요!</p>
            <button onClick={() => {
                localStorage.removeItem('jwtToken');
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
```

## OAuth2RedirectHandler.js
백엔드 서버에서 로그인 완료 후 리다이렉트로 /oauth2/redirect 경로로 이동하면 추가 작업 실행
``` javaScript
    if (token) {
        // JWT 토큰이 존재하면 로컬 스토리지에 저장
        localStorage.setItem('jwtToken', token);
        console.log('JWT Token received and stored:', token.substring(0, 30) + '...');

        // 로그인 성공 후, 서비스의 메인 페이지나 대시보드 페이지로 이동
        navigate('/home'); // 예: /home 또는 /dashboard
    } else {
        // 토큰이 없으면 로그인 실패로 간주하고 로그인 페이지로 리다이렉트하거나 오류 페이지 표시
        console.error('JWT Token not received in URL.');
        navigate('/login'); // 예: 로그인 페이지로 다시 이동
    }
```