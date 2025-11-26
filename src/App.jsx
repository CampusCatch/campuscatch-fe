import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { InterestScheduleProvider } from "@/contexts/InterestScheduleContext";
import MainLayout from "./layouts/MainLayout";

// 페이지들
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage.jsx";
import InterestSchedulePage from "./pages/InterestSchedulePage.jsx";
import ImageUploadPage from "./pages/ImageUploadPage.jsx";
import MyPage from "./pages/MyPage.jsx";

function SettingsPage() {
  return <div>설정 페이지</div>;
}

// 보호 라우트 컴포넌트
function ProtectedRoute() {
  // TODO: 실제 로그인 여부 판별 로직으로 교체
  // 예: const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));

  if (!isLoggedIn) {
    // 로그인 안 되어 있으면 /login으로 보냄
    return <Navigate to="/login" replace />;
  }

  // 로그인 되어 있으면 내부 라우트 렌더링
  return <Outlet />;
}

export default function App() {
  return (
    <InterestScheduleProvider>
      <Routes>
        {/* 1) 로그인 페이지 (레이아웃 없이 단독) */}
        <Route path="/login" element={<LoginPage />} />

        {/* 2) 로그인이 필요한 영역 */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/interest" element={<InterestSchedulePage />} />
            <Route path="/upload" element={<ImageUploadPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Route>
      </Routes>
    </InterestScheduleProvider>
  );
}
