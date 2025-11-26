import TextInput from "../TextInput";
import Button from "../Button";
import ToggleSwitch from "../ToggleSwitch";

export default function SettingsCard({
  name,
  department,
  grade,
  email,
  emailAlert,
  kakaoAlert,
  deadlineAlert,
  noticeAlert,
  onChangeEmailAlert,
  onChangeKakaoAlert,
  onChangeDeadlineAlert,
  onChangeNoticeAlert,
  onSubmit,
  onErrorClick,
  className = "",
}) {
  return (
    <section
      className={[
        "rounded-xl bg-white shadow-sm",
        "p-6 sm:p-8",
        className,
      ].join(" ")}
    >
      {/* 상단 타이틀 */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-90">설정</h2>

        <div className="flex items-center gap-1 text-xs text-gray-60">
          <img src="/icons/refresh.svg" alt="" className="h-3.5 w-3.5" />
          <span>학사홈페이지에서 불러온 정보</span>
        </div>
      </div>

      {/* 기본 정보 */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-gray-80">기본 정보</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextInput label="이름" value={name} readOnly />
          <TextInput label="학과" value={department} readOnly />
          <TextInput label="학년" value={grade} readOnly />
          <TextInput label="이메일" value={email} readOnly />
        </div>

        <p className="mt-2 text-xs text-gray-50">
          * 기본 정보 변경은 학사홈페이지에서만 가능합니다.
        </p>
      </div>

      {/* 알림 설정 */}
      <div className="mt-4">
        <p className="mb-3 text-sm font-semibold text-gray-80">알림 설정</p>

        <div className="space-y-3 text-sm text-gray-80">
          <div className="flex items-center justify-between">
            <span>이메일 알림</span>
            <ToggleSwitch checked={emailAlert} onChange={onChangeEmailAlert} />
          </div>

          <div className="flex items-center justify-between">
            <span>카카오톡 알림</span>
            <ToggleSwitch checked={kakaoAlert} onChange={onChangeKakaoAlert} />
          </div>

          <div className="flex items-center justify-between">
            <span>마감일 알림 (3일 전)</span>
            <ToggleSwitch
              checked={deadlineAlert}
              onChange={onChangeDeadlineAlert}
            />
          </div>

          <div className="flex items-center justify-between">
            <span>새 공지사항 알림</span>
            <ToggleSwitch
              checked={noticeAlert}
              onChange={onChangeNoticeAlert}
            />
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button type="button" onClick={onSubmit}>
          설정 저장
        </Button>
        <Button type="button" variant="secondary" onClick={onErrorClick}>
          오류 문의
        </Button>
      </div>
    </section>
  );
}
