export default function SummaryStatCard({
  label, // 예: "오늘 일정"
  count, // 예: 3
  iconSrc, // 예: "/icons/time.svg"
  iconAlt = "",
  iconBgClass = "bg-gray-10", // 아이콘 배경색 (Tailwind 클래스)
  onClick, // 클릭 시 모달 열기용 핸들러
  className = "",
}) {
  const handleClick = () => {
    if (!onClick) return;
    onClick();
  };

  const Wrapper = onClick ? "button" : "div";

  return (
    <Wrapper
      type={onClick ? "button" : undefined}
      onClick={handleClick}
      className={[
        "w-full rounded-3xl bg-white shadow-sm",
        "px-6 py-5",
        "flex items-center gap-4",
        onClick ? "cursor-pointer hover:shadow-md transition-shadow" : "",
        className,
      ].join(" ")}
    >
      {/* 아이콘 영역 */}
      <div
        className={[
          "flex h-14 w-14 items-center justify-center rounded-2xl",
          iconBgClass,
        ].join(" ")}
      >
        {iconSrc && <img src={iconSrc} alt={iconAlt} className="h-7 w-7" />}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col items-start text-left">
        <span className="text-sm text-gray-70">{label}</span>
        <span className="mt-1 text-xl font-semibold text-gray-90">
          {count}개
        </span>
      </div>
    </Wrapper>
  );
}
