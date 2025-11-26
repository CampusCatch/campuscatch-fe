import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(["학사"]);

  const handleToggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-10">
      {/* 왼쪽 네비바 */}
      <Sidebar
        isCollapsed={isCollapsed}
        selectedCategories={selectedCategories}
        onChangeSelectedCategories={setSelectedCategories}
      />

      {/* 오른쪽 영역: 헤더 + 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 상단 헤더 (항상 흰색) */}
        <Header
          isSidebarCollapsed={isCollapsed}
          onToggleSidebar={handleToggleSidebar}
        />

        {/* 페이지별 콘텐츠 영역 */}
        <main className="flex-1 bg-gray-10">
          <div className="h-full px-8 py-8">
            {/* 각 페이지 컴포넌트가 여기 들어감 */}
            <Outlet context={{ selectedCategories }} />
          </div>
        </main>
      </div>
    </div>
  );
}
