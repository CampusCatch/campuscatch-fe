import { NavLink, useLocation, Link } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";

const NAV_ITEMS = [
  {
    id: "home",
    label: "홈",
    path: "/",
    iconSelected: "/icons/select/home.svg",
    iconUnselected: "/icons/unselect/home.svg",
  },
  {
    id: "interest",
    label: "관심 일정 관리",
    path: "/interest",
    iconSelected: "/icons/select/heart.svg",
    iconUnselected: "/icons/unselect/heart.svg",
  },
  {
    id: "upload",
    label: "이미지 업로드",
    path: "/upload",
    iconSelected: "/icons/select/upload.svg",
    iconUnselected: "/icons/unselect/upload.svg",
  },
  {
    id: "mypage",
    label: "마이페이지",
    path: "/mypage",
    iconSelected: "/icons/select/user.svg",
    iconUnselected: "/icons/unselect/user.svg",
  },
];

export default function Sidebar({
  isCollapsed = false,
  selectedCategories,
  onChangeSelectedCategories,
}) {
  const location = useLocation();
  const isHomeActive =
    location.pathname === "/" || location.pathname === "/home";

  return (
    <aside
      className={`flex min-h-screen flex-col border-r border-gray-20 bg-white transition-[width] duration-200 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* 상단 로고 영역 */}
      <div className="flex items-center px-6 pt-6 pb-8">
        <Link to="/" className="flex items-center">
          <img
            src="/icons/logo.svg"
            alt="캠퍼스캐치"
            className={`shrink-0 ${isCollapsed ? "w-6 h-6" : "w-10 h-10"}`}
          />
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-lg font-semibold text-gray-90">캠퍼스캐치</p>
              <p className="mt-0.5 text-xs text-gray-60">세종대학교</p>
            </div>
          )}
        </Link>
      </div>

      {/* 네비 메뉴 */}
      <nav className="mt-2 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) =>
              [
                "flex items-center",
                isCollapsed ? "justify-center px-0" : "justify-start px-4 pl-6",
                "gap-3",
                "h-11",
                "border-l-4",
                // "px-4",
                // !isCollapsed && "pl-4",
                "text-sm",
                "cursor-pointer",
                "transition-colors",
                "overflow-hidden", // 접힌 상태에서 텍스트 잘라내기
                isActive
                  ? "bg-main/10 text-main border-main"
                  : "text-gray-80 border-transparent hover:bg-gray-10",
              ]
                .filter(Boolean)
                .join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={isActive ? item.iconSelected : item.iconUnselected}
                  alt={item.label}
                  className="w-6 h-6"
                />
                {!isCollapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      {/* 홈 페이지일 때만 카테고리 필터 표시 */}
      {!isCollapsed && isHomeActive && (
        <CategoryFilter
          selectedCategories={selectedCategories}
          onChange={onChangeSelectedCategories}
        />
      )}
    </aside>
  );
}
