import Chip from "./Chip";
import Button from "./Button";

// 카테고리별 색상 (아이콘/타이틀용)
const CATEGORY_STYLE = {
  학사: {
    iconBg: "bg-category-academic",
    titleColor: "text-category-academic",
    chipBg: "bg-category-academic/10",
  },
  장학: {
    iconBg: "bg-category-scholarship",
    titleColor: "text-category-scholarship",
    chipBg: "bg-category-scholarship/10",
  },
  취업: {
    iconBg: "bg-category-career",
    titleColor: "text-category-career",
    chipBg: "bg-category-career/10",
  },
  국제교류: {
    iconBg: "bg-category-international",
    titleColor: "text-category-international",
    chipBg: "bg-category-international/10",
  },
  "근로/조교": {
    iconBg: "bg-category-work",
    titleColor: "text-category-work",
    chipBg: "bg-category-work/10",
  },
  MY: {
    iconBg: "bg-category-my",
    titleColor: "text-category-my",
    chipBg: "bg-category-my/10",
  },
};

export default function ScheduleDetailModal({
  schedule,
  isOpen,
  isInterested,
  onClose,
  onToggleInterest,
}) {
  if (!isOpen || !schedule) return null;

  const mainCategory = schedule.categories?.[0] || "학사";
  const style = CATEGORY_STYLE[mainCategory] || {};
  const period =
    schedule.startDate && schedule.endDate
      ? `${schedule.startDate} ~ ${schedule.endDate}`
      : "기간 정보 없음";

  const handleBackgroundClick = () => {
    if (onClose) onClose();
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleBackgroundClick}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8"
        onClick={handleInnerClick}
      >
        {/* 헤더 */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-90">일정 정보</h2>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full text-gray-60 hover:bg-gray-10 flex items-center justify-center"
          >
            {/* 아이콘 파일 있으면 교체: /icons/close.svg */}
            <img src="/icons/close.svg" alt="닫기" className="h-4 w-4" />
            <span className="sr-only">닫기</span>
          </button>
        </div>

        {/* 상단 일정 카드 */}
        <div className="mb-6 rounded-2xl border border-gray-20 bg-gray-5 px-4 py-4 flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              style.iconBg || "bg-main"
            }`}
          >
            <img src="/icons/calendar-white.svg" alt="" className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <p
              className={`text-base font-semibold ${
                style.titleColor || "text-gray-90"
              }`}
            >
              {schedule.title}
            </p>
            <p className="text-xs text-gray-70">기간: {period}</p>
          </div>
        </div>

        {/* 상세 내용 */}
        <section className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-90">상세 내용</h3>
          <div className="rounded-2xl bg-gray-5 py-1 text-sm text-gray-80">
            {schedule.description || "상세 내용이 없습니다."}
          </div>
        </section>

        {/* 분류 */}
        <section className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-90">분류</h3>
          <div className="flex flex-wrap gap-2">
            {schedule.categories?.map((cat) => {
              const s = CATEGORY_STYLE[cat] || {};
              return (
                <Chip
                  key={cat}
                  label={cat}
                  bgColor={s.chipBg || "bg-gray-10"}
                  textColor={s.titleColor || "text-gray-80"}
                />
              );
            })}
          </div>
        </section>

        {/* 원본 링크 */}
        <section className="mb-2">
          <h3 className="mb-2 text-sm font-semibold text-gray-90">원본 링크</h3>
          {schedule.originalLink ? (
            <a
              href={schedule.originalLink}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl bg-gray-5 py-1 text-sm text-main underline break-all"
            >
              {schedule.originalLink}
            </a>
          ) : (
            <div className="rounded-2xl bg-gray-5 py-1 text-sm text-gray-70">
              원본 링크 정보가 없습니다.
            </div>
          )}
        </section>

        <p className="mt-2 text-xs text-gray-60">
          * 새 창에서 세종대학교 포털로 이동합니다.
        </p>

        {/* 하단 버튼 */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            variant={isInterested ? "secondary" : "primary"}
            className="flex-1"
            onClick={onToggleInterest}
          >
            {isInterested ? "관심 일정 해제" : "관심 일정 등록"}
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => {
              // TODO: 알림 설정 모달/페이지로 연결
              console.log("알림 설정 클릭");
            }}
          >
            알림 설정
          </Button>
        </div>
      </div>
    </div>
  );
}
