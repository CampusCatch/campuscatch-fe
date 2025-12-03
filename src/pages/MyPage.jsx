import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../components/mypage/ProfileCard";
import SettingsCard from "../components/mypage/SettingsCard";
import AccountDeleteModal from "../components/mypage/AccountDeleteModal";
import SettingsSaveModal from "../components/mypage/SettingsSaveModal";

export default function MyPage() {
  const navigate = useNavigate();

  // 계정 삭제 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // 저장 완료 모달 상태
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // 알림 토글 상태 (임시)
  const [emailAlert, setEmailAlert] = useState(true);
  const [kakaoAlert, setKakaoAlert] = useState(false);
  const [deadlineAlert, setDeadlineAlert] = useState(true);
  const [noticeAlert, setNoticeAlert] = useState(true);

  const handleLogout = () => {
    // TODO: 필요하면 여기서 토큰/유저 정보 제거도 같이 처리
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");

    navigate("/login", { replace: true });
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDeleteAccount = () => {
    // TODO: 백엔드에 계정/연관 데이터 삭제 요청
    // 예: await deleteAccountApi();

    // 프론트에서 가지고 있는 인증 정보 정리 (필요에 맞게 조정)
    // localStorage.removeItem("accessToken");
    // localStorage.removeItem("refreshToken");

    setIsDeleteModalOpen(false);
    navigate("/login", { replace: true });
  };

  const handleSaveSettings = () => {
    // TODO: 나중에 실제 설정 저장 API 호출 자리
    // 성공하면 모달 오픈
    setIsSaveModalOpen(true);
  };

  const handleCloseSaveModal = () => {
    setIsSaveModalOpen(false);
  };

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
          onLogout={handleLogout}
          onDeleteAccount={handleOpenDeleteModal}
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
          onSubmit={handleSaveSettings}
          onErrorClick={() => console.log("오류 문의")}
          className="h-full"
        />
      </section>

      {/* 계정 삭제 확인 모달 */}
      <AccountDeleteModal
        isOpen={isDeleteModalOpen}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteAccount}
      />

      {/* 저장 완료 모달 */}
      <SettingsSaveModal
        isOpen={isSaveModalOpen}
        onClose={handleCloseSaveModal}
      />
    </div>
  );
}
