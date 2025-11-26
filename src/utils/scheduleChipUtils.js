// 카테고리별 칩 색상 매핑
export const getCategoryChipProps = (category) => {
  switch (category) {
    case "학사":
      return {
        label: "학사",
        bgColor: "bg-category-academic/10",
        textColor: "text-category-academic",
      };
    case "장학":
      return {
        label: "장학",
        bgColor: "bg-category-scholarship/10",
        textColor: "text-category-scholarship",
      };
    case "취업":
      return {
        label: "취업",
        bgColor: "bg-category-career/10",
        textColor: "text-category-career",
      };
    case "국제교류":
      return {
        label: "국제교류",
        bgColor: "bg-category-international/10",
        textColor: "text-category-international",
      };
    case "근로/조교":
      return {
        label: "근로/조교",
        bgColor: "bg-category-work/10",
        textColor: "text-category-work",
      };
    case "MY":
      return {
        label: "MY",
        bgColor: "bg-category-my/10",
        textColor: "text-category-my",
      };
    default:
      return {
        label: category,
        bgColor: "bg-gray-20",
        textColor: "text-gray-80",
      };
  }
};

// 상태 칩 색상 매핑 (홈 + 관심일정 공용)
export const getStatusChipProps = (status) => {
  if (!status) return null;

  switch (status) {
    // 홈: 처리완료
    case "처리완료":
      return {
        label: "처리완료",
        bgColor: "bg-black",
        textColor: "text-white",
      };
    // 관심 일정: 마감임박 / NEW / MY
    case "마감임박":
      return {
        label: "마감임박",
        bgColor: "bg-category-my",
        textColor: "text-white",
      };
    case "NEW":
      return {
        label: "NEW",
        bgColor: "bg-main",
        textColor: "text-white",
      };
    case "MY":
      return {
        label: "MY",
        bgColor: "bg-category-my",
        textColor: "text-white",
      };
    default:
      return {
        label: status,
        bgColor: "bg-gray-20",
        textColor: "text-gray-90",
      };
  }
};
