import Chip from "./Chip";

/**
 * props
 * - title: string                // 일정 이름
 * - dateText: string             // 날짜 or 시간 문자열
 * - rightType: "ddayWithChip" | "chips"
 * - ddayText?: string            // 예: "D-45" (rightType === "ddayWithChip"일 때)
 * - categoryChip?: { ...ChipProps } // Chip에 그대로 넘길 props
 * - rightChips?: { ...ChipProps }[] // rightType === "chips"일 때 사용
 * - className?: string
 * - onClick?: () => void         // 카드 클릭 핸들러
 *
 * ChipProps:
 *  { label, bgColor?, textColor?, borderColor?, className? }
 */

export default function ScheduleCard({
  title,
  dateText,
  rightType = "ddayWithChip",
  ddayText,
  categoryChip,
  rightChips = [],
  className = "",
  onClick,
}) {
  const renderRight = () => {
    if (rightType === "ddayWithChip") {
      return (
        <div className="flex items-center gap-3">
          {ddayText && (
            <span className="text-sm font-semibold text-gray-80">
              {ddayText}
            </span>
          )}
          {categoryChip && <Chip {...categoryChip} />}
        </div>
      );
    }

    // rightType === "chips"
    return (
      <div className="flex items-center gap-2">
        {rightChips.map((chip, idx) => (
          <Chip key={idx} {...chip} />
        ))}
      </div>
    );
  };

  const clickableClasses = onClick ? "cursor-pointer" : "";

  return (
    <article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      className={[
        "flex items-center justify-between",
        "w-full",
        "min-h-20", // 높이만 고정 (텍스트 늘어나면 높아질 수 있음)
        "rounded-2xl",
        "bg-gray-10",
        "px-6 py-4",
        clickableClasses,
        className,
      ].join(" ")}
    >
      {/* 왼쪽: 제목 + 날짜/시간 */}
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-gray-90">{title}</h3>
        <p className="text-sm text-gray-60">{dateText}</p>
      </div>

      {/* 오른쪽: D-day + Chip or Chip + Chip */}
      <div className="flex items-center gap-2 ml-4">{renderRight()}</div>
    </article>
  );
}
