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
# 파일 업로드
## file.js
``` javaScript
    function FilePage() {

        const fileUrl = process.env.REACT_APP_BACKEND_FILE_URL;

        // <input type="file" ref={fileInputRef} /> ref로 파일 요소를 fileInputRef에 담는다.
        const fileInputRef = useRef(null);
        const isLoggedIn = localStorage.getItem('accessToken');

        // 토큰이 없으면 로그인 페이지로 이동
        if (!isLoggedIn) {
            window.location.href = '/';
            return null;
        }

        const handleUpload = async () => {
            const file = fileInputRef.current.files[0];
            const validation = validateFile(file);
            if (!validation.isValid) {
                alert(validation.message);
                return;
            }
            const formData = new FormData();
            formData.append('file', file);

            try {
                await axios.post(fileUrl+'/upload', formData, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                alert('업로드 성공!');
            } catch (error) {
                if(error.status === 403) {
                    // 토큰 만료되면 로그인 유도
                    window.location.href = '/'
                } else if(error.status === 400) {
                    alert('파일 업로드 실패: ' + error.response.data.message);
                }
            }
        };
        ...

    }
```
## FileValidator.js
``` javaScript
    // src/utils/fileValidator.js
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'pdf']; // 허용되는 확장자

    export const validateFile = (file) => {
    if (!file) {
        return { isValid: false, message: '파일을 선택해주세요.' };
    }

    // 1. 용량 검사
    if (file.size > MAX_FILE_SIZE) {
        //return { isValid: false, message: `파일 용량이 너무 큽니다. (최대 ${MAX_FILE_SIZE / (1024 * 1024)}MB)` };
    }

    // 2. 확장자 검사
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(fileExtension)) {
        //return { isValid: false, message: `허용되지 않는 파일 형식입니다. (${ALLOWED_EXTENSIONS.join(', ')})` };
    }

    // 모든 검증 통과
    return { isValid: true, message: '파일 검증 통과.' };
    };
```