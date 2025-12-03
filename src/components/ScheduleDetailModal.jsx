import Chip from "./Chip";
import Button from "./Button";

// 유틸 함수
import { getCategoryChipProps } from "../utils/scheduleChipUtils";
import { getCollegeNameById } from "../utils/collegeUtils";

export default function ScheduleDetailModal({
  schedule,
  isOpen,
  isInterested,
  onClose,
  onToggleInterest,
}) {
  if (!isOpen || !schedule) return null;

  // 카테고리 매치
  const mainCategory = schedule.categories?.[0] || "학사";

  // 대표 카테고리 스타일 가져오기
  const mainCategoryProps = getCategoryChipProps(mainCategory);
  // text-category-academic → bg-category-academic 이런 식으로 변환해서 아이콘 배경에 사용
  const iconBgClass = mainCategoryProps?.textColor
    ? mainCategoryProps.textColor.replace("text-", "bg-")
    : "bg-main";

  const rawStart = schedule.startDate;
  const rawEnd = schedule.endDate;

  // 날짜가 "2025-12-01T..." 형식일 수도 있으니까 T 앞까지만 사용
  const startDateStr = rawStart ? rawStart.split("T")[0] : null;
  const endDateStr = rawEnd ? rawEnd.split("T")[0] : null;

  let period;
  if (!startDateStr || !endDateStr) {
    period = "기간 정보 없음";
  } else if (startDateStr === endDateStr) {
    // 하루짜리 일정
    period = `(당일) ${startDateStr}`;
  } else {
    period = `${startDateStr} ~ ${endDateStr}`;
  }

  // 나머지 텍스트들도 null 대비해서 안전하게
  const locationText = schedule.location || "장소 정보 없음";
  const targetText = schedule.target || "대상 정보 없음";
  const paymentDateText = schedule.paymentDate || "지급일 정보 없음";
  const requiredDocsText = schedule.requiredDocuments || "필수 문서 정보 없음";

  // 단과대 이름 유틸 사용
  const collegeName = getCollegeNameById(schedule.collegeId);
  const collegeText = collegeName || "단과대 정보 없음";

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
            <img src="/icons/close.svg" alt="닫기" className="h-4 w-4" />
          </button>
        </div>

        {/* 상단 일정 카드 */}
        <div className="mb-6 rounded-2xl border border-gray-20 bg-gray-5 px-4 py-4 flex items-center gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBgClass}`}
          >
            <img src="/icons/calendar-white.svg" alt="" className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <p
              className={`text-base font-semibold ${
                mainCategoryProps.titleColor || "text-gray-90"
              }`}
            >
              {schedule.title}
            </p>
            <p className="text-xs text-gray-70">기간: {period}</p>
          </div>
        </div>

        {/* 분류 */}
        <section className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-90">분류</h3>
          <div className="flex flex-wrap gap-2">
            {schedule.categories?.map((cat) => {
              // chipProps = { label, bgColor, textColor }
              const chipProps = getCategoryChipProps(cat) || {};
              return (
                <Chip
                  key={cat} // 백엔드에서 카테고리 코드로 줄 경우 cat(원본 값) -> 이 경우 유틸 변경해야함
                  label={chipProps.label ?? cat} // 무조건 화면 라벨 : 한글 레이블
                  bgColor={chipProps.bgColor}
                  textColor={chipProps.textColor}
                />
              );
            })}
          </div>
        </section>

        {/* 상세 내용 */}
        <section className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-90">상세 내용</h3>
          <div className="rounded-2xl bg-gray-5 py-1 text-sm text-gray-80">
            {schedule.description || "상세 내용이 없습니다."}
          </div>
        </section>

        {/* 추가 정보 */}
        <section className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-gray-90">추가 정보</h3>
          <div className="rounded-2xl bg-gray-5 px-3 py-3 text-sm text-gray-80">
            {/* 각 항목을 하나의 블록으로 묶고, 블록 사이 간격만 벌리기 */}
            <div className="space-y-3">
              <div>
                <span className="block text-xs text-gray-60">대상</span>
                <span className="block text-xs text-gray-90">{targetText}</span>
              </div>

              <div>
                <span className="block text-xs text-gray-60">장소</span>
                <span className="block text-xs text-gray-90">
                  {locationText}
                </span>
              </div>

              <div>
                <span className="block text-xs text-gray-60">단과대</span>
                <span className="block text-xs text-gray-90">
                  {collegeText}
                </span>
              </div>

              <div>
                <span className="block text-xs text-gray-60">지급일</span>
                <span className="block text-xs text-gray-90">
                  {paymentDateText}
                </span>
              </div>

              <div>
                <span className="block text-xs text-gray-60">필수 문서</span>
                <span className="block text-xs text-gray-90 whitespace-pre-line">
                  {requiredDocsText}
                </span>
              </div>
            </div>
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
