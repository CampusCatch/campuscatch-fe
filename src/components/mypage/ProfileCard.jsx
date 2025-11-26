import { useEffect, useRef, useState } from "react";
import Button from "../Button";

export default function ProfileCard({
  name,
  department,
  grade, // 예: "3학년"
  email,
  onLogout,
  onDeleteAccount,
  onAvatarChange, // (file: File) => void  - 선택사항
  className = "",
}) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const fileInputRef = useRef(null);

  // 기존 object URL 정리
  useEffect(() => {
    return () => {
      if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    };
  }, [avatarUrl]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    setAvatarUrl(url);

    onAvatarChange?.(file); // 부모에서 업로드 API 연동할 수 있게 콜백
  };

  const firstChar = name ? name[0] : "";

  return (
    <section
      className={[
        "rounded-xl bg-white shadow-sm",
        "p-6 sm:p-8",
        className,
      ].join(" ")}
    >
      {/* 카드 제목 */}
      <h2 className="text-lg font-semibold text-gray-90 mb-8">프로필</h2>

      <div className="flex flex-col items-center">
        {/* 프로필 이미지 영역 (클릭해서 변경) */}
        <button
          type="button"
          onClick={handleAvatarClick}
          className="flex flex-col items-center focus:outline-none"
        >
          <div
            className={[
              "flex items-center justify-center",
              "w-40 h-40", // 원형 크기
              "rounded-full",
              "bg-gray-20",
              "overflow-hidden",
            ].join(" ")}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="/icons/user.svg"
                alt="기본 프로필"
                className="w-25 h-25"
              />
            )}
          </div>
          <span className="mt-3 text-xs text-gray-60 underline-offset-2">
            프로필 사진 변경
          </span>
        </button>

        {/* 이름 / 학과+학년 / 이메일 */}
        <p className="mt-6 text-xl font-semibold text-gray-90">{name}</p>
        <p className="mt-2 text-sm text-gray-70">
          {department} {grade}
        </p>
        <p className="mt-2 text-sm text-gray-60">{email}</p>

        {/* 로그아웃 / 계정 삭제 버튼 */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="secondary" type="button" onClick={onLogout}>
            로그아웃
          </Button>
          <Button variant="primary" type="button" onClick={onDeleteAccount}>
            계정 삭제
          </Button>
        </div>
      </div>

      {/* 실제 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </section>
  );
}
