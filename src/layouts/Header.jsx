import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../components/homepage/SearchInput";

export default function Header({ isSidebarCollapsed, onToggleSidebar }) {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  // 사이드바 닫혀 있으면 검색창을 조금 더 넓게
  const searchWidthClass = isSidebarCollapsed
    ? "w-80 md:w-96" // 두 번째 사진 느낌
    : "w-72 md:w-80"; // 첫 번째 사진 느낌

  return (
    <header
      className={[
        "flex items-center justify-between",
        "h-16 px-8",
        "bg-white",
        "border-b border-gray-20",
      ].join(" ")}
    >
      {/* 왼쪽: 메뉴 아이콘 + 검색창 */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex items-center justify-center"
        >
          <img
            src="/icons/menu.svg" // 실제 파일명에 맞게 수정
            alt="메뉴 열기"
            className="w-6 h-6"
          />
        </button>

        <div className={searchWidthClass}>
          <SearchInput value={keyword} onChange={setKeyword} />
        </div>
      </div>

      {/* 오른쪽: 프로필만 */}
      <div className="flex items-center">
        {/* 프로필 / 아바타 */}
        <button
          type="button"
          onClick={() => navigate("/mypage")} // 마이페이지로 이동
          className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-20"
        >
          <img src="/icons/user.svg" alt="내 프로필" className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
