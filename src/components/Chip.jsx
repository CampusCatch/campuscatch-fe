export default function Chip({
  label,
  bgColor = "bg-gray-10", // 예: "bg-category-academic/10"
  textColor = "text-gray-80",
  borderColor = "", // 예: "border border-category-academic"
  className = "",
}) {
  const baseClass = [
    "inline-flex items-center justify-center",
    "h-7", // 높이 고정
    "rounded-full",
    "px-3", // 양옆 여백
    "text-xs font-medium", // 텍스트 크기/두께 통일
    "whitespace-nowrap",
    bgColor,
    textColor,
    borderColor,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={baseClass}>{label}</span>;
}
