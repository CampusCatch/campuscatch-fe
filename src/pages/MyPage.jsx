import { useState } from "react";
import ProfileCard from "../components/mypage/ProfileCard";
import SettingsCard from "../components/mypage/SettingsCard";

export default function MyPage() {
  // 알림 토글 상태 (임시)
  const [emailAlert, setEmailAlert] = useState(true);
  const [kakaoAlert, setKakaoAlert] = useState(false);
  const [deadlineAlert, setDeadlineAlert] = useState(true);
  const [noticeAlert, setNoticeAlert] = useState(true);

  return (
    <div className="w-full">
      {/* 페이지 제목 */}
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-90 mb-1">마이페이지</h1>
        <p className="text-sm text-gray-60">프로필과 알림 설정을 관리합니다.</p>
      </header>

      {/* 큰 화면: 2열, 작은 화면: 세로로 쌓임 */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* 왼쪽 프로필 카드 */}
        <ProfileCard
          name="김대학"
          department="컴퓨터공학과"
          grade="3학년"
          email="student@sejong.ac.kr"
          onLogout={() => console.log("로그아웃")}
          onDeleteAccount={() => console.log("계정 삭제")}
          className="h-full"
        />

        {/* 오른쪽 설정 카드 */}
        <SettingsCard
          name="김대학"
          department="컴퓨터공학과"
          grade="3학년"
          email="student@sejong.ac.kr"
          emailAlert={emailAlert}
          kakaoAlert={kakaoAlert}
          deadlineAlert={deadlineAlert}
          noticeAlert={noticeAlert}
          onChangeEmailAlert={setEmailAlert}
          onChangeKakaoAlert={setKakaoAlert}
          onChangeDeadlineAlert={setDeadlineAlert}
          onChangeNoticeAlert={setNoticeAlert}
          onSubmit={() => console.log("설정 저장")}
          onErrorClick={() => console.log("오류 문의")}
          className="h-full"
        />
      </section>
    </div>
  );
}
