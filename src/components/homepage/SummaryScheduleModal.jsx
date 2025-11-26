import Chip from "../Chip";

// 카테고리 별 칩 색상
const CATEGORY_STYLE = {
  학사: {
    chipBg: "bg-category-academic/10",
    textColor: "text-category-academic",
  },
  장학: {
    chipBg: "bg-category-scholarship/10",
    textColor: "text-category-scholarship",
  },
  취업: {
    chipBg: "bg-category-career/10",
    textColor: "text-category-career",
  },
  국제교류: {
    chipBg: "bg-category-international/10",
    textColor: "text-category-international",
  },
  "근로/조교": {
    chipBg: "bg-category-work/10",
    textColor: "text-category-work",
  },
  MY: {
    chipBg: "bg-category-my/10",
    textColor: "text-category-my",
  },
};

// 모달 타입별 공통 스타일
const TYPE_STYLE = {
  today: {
    title: "오늘 일정",
    badgeLabel: "TODAY",
    bgClass: "bg-main/5",
  },
  deadline: {
    title: "마감 임박",
    badgeLabel: "마감 임박",
    bgClass: "bg-category-international/5",
  },
  notice: {
    title: "새 공지사항",
    badgeLabel: "NEW",
    bgClass: "bg-category-academic/5",
  },
};

// "2025. 09. 15." -> Date
function parseDotDate(str) {
  if (!str) return null;
  // 숫자만 남기기
  const cleaned = str.replace(/[^\d]/g, ""); // "20250915"
  if (cleaned.length < 8) return null;

  const year = Number(cleaned.slice(0, 4));
  const month = Number(cleaned.slice(4, 6)) - 1;
  const day = Number(cleaned.slice(6, 8));

  return new Date(year, month, day);
}

// Date -> "YYYY-MM-DD"
function formatHyphenDate(date) {
  if (!(date instanceof Date)) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// 모달 안에서 쓰는 일정 카드
function SummaryScheduleItemCard({ type, schedule, onClick }) {
  const typeStyle = TYPE_STYLE[type];
  const mainCategory = schedule.categories?.[0] ?? "학사";
  const categoryStyle = CATEGORY_STYLE[mainCategory] || {};

  const start = parseDotDate(schedule.startDate);
  const end = parseDotDate(schedule.endDate || schedule.startDate);

  // 날짜/시간 텍스트
  let dateText = "";
  let dateClassName = "text-xs text-gray-70";

  if (type === "deadline" && end) {
    const baseDate = formatHyphenDate(end);

    // 오늘 자정 기준으로 D-day 계산
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffMs = end.getTime() - today.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    let suffix = "";
    if (diffDays === 0) {
      suffix = "(오늘)";
    } else if (diffDays > 0) {
      suffix = `(${diffDays}일 남음)`;
    }

    dateText = `마감: ${baseDate} ${suffix}`.trim();
    dateClassName = "text-xs font-semibold text-category-international";
  } else if (start) {
    // 오늘 / 새 공지 → 그냥 날짜만
    dateText = formatHyphenDate(start);
  }

  // 위치 텍스트는 schedule.location 있는 경우만 사용 (목데이터에는 아직 없음)
  const locationLabel = schedule.location;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl ${typeStyle.bgClass} px-4 py-4 text-left shadow-sm hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-main`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* 왼쪽: 칩 + 텍스트 */}
        <div className="flex-1">
          {/* 칩 영역 */}
          <div className="mb-2 flex flex-wrap gap-2">
            {/* TODAY / NEW / 마감 임박 칩 */}
            <Chip
              label={typeStyle.badgeLabel}
              bgColor="bg-main/10"
              textColor="text-main"
            />

            {/* 카테고리 칩 */}
            <Chip
              label={mainCategory}
              bgColor={categoryStyle.chipBg || "bg-gray-10"}
              textColor={categoryStyle.textColor || "text-gray-80"}
            />
          </div>

          {/* 제목 */}
          <p className="mb-1 text-sm font-semibold text-gray-90 line-clamp-2">
            {schedule.title}
          </p>

          {/* 날짜/시간 (지정된 게 없으면 생략) */}
          {dateText && <p className={dateClassName}>{dateText}</p>}
        </div>

        {/* 오른쪽 하단: 위치 */}
        {locationLabel && (
          <div className="flex min-w-[88px] flex-col items-end justify-end text-xs text-gray-70">
            <div className="flex items-center gap-1">
              {/* public/icons/location.svg 같은 경로로 맞춰줘 */}
              <img src="/icons/location.svg" alt="" className="h-4 w-4" />
              <span>{locationLabel}</span>
            </div>
          </div>
        )}
      </div>
    </button>
  );
}

// 전체 요약 모달
export default function SummaryScheduleModal({
  type, // 'today' | 'deadline' | 'notice'
  schedules, // 일정 배열 (scheduleMocks.js 구조 그대로)
  isOpen,
  onClose,
  onScheduleClick, // (schedule) => { ... } → 여기서 상세 모달 열어주면 됨
}) {
  if (!isOpen || !type) return null;

  const typeStyle = TYPE_STYLE[type];

  const handleBackdropClick = () => {
    onClose?.();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8"
        onClick={handleContentClick}
      >
        {/* 헤더 */}
        <header className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-90">
            {typeStyle.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl leading-none text-gray-60 hover:text-gray-80"
            aria-label="닫기"
          >
            ×
          </button>
        </header>

        {/* 리스트 */}
        {schedules.length === 0 ? (
          <p className="text-sm text-gray-70">해당하는 일정이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {schedules.map((schedule) => (
              <SummaryScheduleItemCard
                key={schedule.id}
                type={type}
                schedule={schedule}
                onClick={() => onScheduleClick?.(schedule)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
