import { useMemo } from "react";
import { CATEGORY_OPTIONS, MOCK_SCHEDULES } from "../mocks/scheduleMocks";

// 카테고리별 색상 점 클래스 매핑
const CATEGORY_DOT_CLASS = {
  학사: "bg-category-academic",
  장학: "bg-category-scholarship",
  취업: "bg-category-career",
  국제교류: "bg-category-international",
  "근로/조교": "bg-category-work",
  MY: "bg-category-my",
};

export default function CategoryFilter({ selectedCategories, onChange }) {
  // 최소 1개는 선택되어 있어야 하니까, props가 비어있으면 학사로 fallback
  const active = useMemo(() => {
    if (selectedCategories && selectedCategories.length > 0) {
      return selectedCategories;
    }
    return ["학사"];
  }, [selectedCategories]);

  // 카테고리별 일정 개수 계산 (목데이터 기준)
  const counts = useMemo(() => {
    const base = Object.fromEntries(CATEGORY_OPTIONS.map((cat) => [cat, 0]));

    MOCK_SCHEDULES.forEach((schedule) => {
      schedule.categories.forEach((cat) => {
        if (base[cat] !== undefined) {
          base[cat] += 1;
        }
      });
    });

    return base;
  }, []);

  const handleToggle = (category) => {
    const isSelected = selectedCategories.includes(category);
    let next;

    if (isSelected) {
      // 마지막 하나는 해제 못하게
      if (active.length === 1) return;
      next = active.filter((c) => c !== category);
    } else {
      next = [...active, category];
    }

    onChange?.(next);
  };

  return (
    <div className="mt-8">
      <p className="mb-3 px-4 text-sm font-semibold text-gray-80">
        카테고리 필터
      </p>

      <div className="space-y-2 px-3 pb-4">
        {CATEGORY_OPTIONS.map((category) => {
          const isSelected = selectedCategories.includes(category);
          const dotClass = CATEGORY_DOT_CLASS[category] || "bg-gray-40";

          const containerBase =
            "flex w-full items-center justify-between rounded-lg px-4 py-2 text-xs transition cursor-pointer";
          const selectedStyle = "border border-main/50 bg-main/5 text-main";
          const unselectedStyle =
            "border border-transparent text-gray-80 hover:bg-gray-10";

          return (
            <button
              key={category}
              type="button"
              onClick={() => handleToggle(category)}
              className={`${containerBase} ${
                isSelected ? selectedStyle : unselectedStyle
              }`}
            >
              {/* 왼쪽: 색 점 + 라벨 */}
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${dotClass}`} />
                <span>{category}</span>
              </div>

              {/* 오른쪽: 개수 배지 */}
              <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-gray-10 px-2 py-1 text-xs font-regular text-gray-80">
                {counts[category] ?? 0}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
