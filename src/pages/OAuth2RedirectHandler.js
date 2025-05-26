import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // react-router-dom v6 기준

function OAuth2RedirectHandler() {
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const location = useLocation(); // 현재 URL의 쿼리 파라미터를 가져오기 위한 훅

    useEffect(() => {
        // URL의 쿼리 파라미터(예: ?token=abc.xyz.123)를 파싱합니다.
        const urlParams = new URLSearchParams(location.search);
        const accesstoken = urlParams.get('accessToken'); // 'token'이라는 이름의 파라미터 값 가져오기
        const refreshtoken = urlParams.get('refreshToken'); // 'refreshToken'이라는 이름의 파라미터 값 가져오기

        if (accesstoken) {
            // JWT 토큰이 존재하면 로컬 스토리지에 저장
            localStorage.setItem('accessToken'  , accesstoken);
            localStorage.setItem('refreshToken' , refreshtoken);
            console.log('JWT Token received and stored:', accesstoken.substring(0, 30) + '...');

            // 로그인 성공 후, 서비스의 메인 페이지나 대시보드 페이지로 이동
            navigate('/home'); // 예: /home 또는 /dashboard
        } else {
            // 토큰이 없으면 로그인 실패로 간주하고 로그인 페이지로 리다이렉트하거나 오류 페이지 표시
            console.error('JWT Token not received in URL.');
            navigate('/login'); // 예: 로그인 페이지로 다시 이동
        }
    }, [location, navigate]); // location이나 navigate가 변경될 때마다 useEffect 재실행 (의존성 배열)

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>로그인 처리 중...</h2>
            <p>잠시만 기다려주세요.</p>
        </div>
    );
}

export default OAuth2RedirectHandler;