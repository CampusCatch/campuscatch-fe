import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import MonthlyCalendar from "../components/homepage/MonthlyCalendar";
import SummaryStatCard from "../components/homepage/SummaryStatCard";
import ScheduleDetailModal from "../components/ScheduleDetailModal";
import { MOCK_SCHEDULES } from "../mocks/scheduleMocks";
import { useInterestSchedules } from "@/contexts/InterestScheduleContext";

// "2025. 09. 15." 형태 문자열 -> Date
function parseDotDate(dotString) {
  const parts = dotString
    .split(".")
    .map((v) => v.trim())
    .filter(Boolean)
    .map(Number);

  const [year, month, day] = parts;
  return new Date(year, month - 1, day);
}

// 날짜가 [start, end] 구간에 포함되어 있는지
function isInRange(date, start, end) {
  return start <= date && date <= end;
}

export default function HomePage() {
  const { selectedCategories } = useOutletContext() || {
    selectedCategories: ["학사"],
  };

  const today = new Date();

  // 전역 관심 일정 상태 사용
  const { isInterested, toggleInterest } = useInterestSchedules();

  // 모달에서 사용할 상태
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const { todayCount, deadlineSoonCount, noticeCount } = useMemo(() => {
    const todayOnly = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    let todayCnt = 0;
    let deadlineCnt = 0;

    MOCK_SCHEDULES.forEach((schedule) => {
      const start = parseDotDate(schedule.startDate);
      const end = parseDotDate(schedule.endDate);

      // 오늘 포함된 일정
      if (isInRange(todayOnly, start, end)) {
        todayCnt += 1;
      }

      // 마감 임박: 오늘 ~ 3일 이내 종료되는 일정 (과거 제외)
      const diffMs = end - todayOnly;
      const diffDays = diffMs / (1000 * 60 * 60 * 24);
      if (diffDays >= 0 && diffDays <= 3) {
        deadlineCnt += 1;
      }
    });

    // 새 공지 개수: 일단 전체 일정 수로 두고, 이후 백엔드 연동 시 로직 교체
    const noticeCnt = MOCK_SCHEDULES.length;

    return {
      todayCount: todayCnt,
      deadlineSoonCount: deadlineCnt,
      noticeCount: noticeCnt,
    };
  }, [today]);

  const handleScheduleClick = (schedule) => {
    setSelectedSchedule(schedule);
  };

  const handleCloseModal = () => {
    setSelectedSchedule(null);
  };

  const handleToggleInterest = () => {
    if (!selectedSchedule) return;
    toggleInterest(selectedSchedule.id);
  };

  const isSelectedScheduleInterested =
    selectedSchedule && isInterested(selectedSchedule.id);

  return (
    <div className="w-full">
      {/* 페이지 제목 영역 */}
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-90 mb-1">
          캠퍼스 캘린더
        </h1>
        <p className="text-sm text-gray-60">한눈에 보는 나의 학사 일정</p>
      </header>

      {/* 캘린더 */}
      <MonthlyCalendar
        selectedCategories={selectedCategories}
        onScheduleClick={handleScheduleClick}
      />

      {/* 요약 카드 영역 */}
      <section className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <SummaryStatCard
          label="오늘 일정"
          count={todayCount}
          iconSrc="/icons/time.svg"
          iconAlt="오늘 일정"
          iconBgClass="bg-main/10"
          onClick={() => {
            // TODO: 오늘 일정 목록 모달
            console.log("오늘 일정 카드 클릭");
          }}
        />
        <SummaryStatCard
          label="마감 임박"
          count={deadlineSoonCount}
          iconSrc="/icons/warning.svg"
          iconAlt="마감 임박"
          iconBgClass="bg-orange-100"
          onClick={() => {
            // TODO: 마감 임박 일정 모달
            console.log("마감 임박 카드 클릭");
          }}
        />
        <SummaryStatCard
          label="새 공지"
          count={noticeCount}
          iconSrc="/icons/document.svg"
          iconAlt="새 공지"
          iconBgClass="bg-blue-100"
          onClick={() => {
            // TODO: 새 공지 목록 모달
            console.log("새 공지 카드 클릭");
          }}
        />
      </section>

      {/* 일정 상세 모달 */}
      <ScheduleDetailModal
        schedule={selectedSchedule}
        isOpen={!!selectedSchedule}
        isInterested={!!isSelectedScheduleInterested}
        onClose={handleCloseModal}
        onToggleInterest={handleToggleInterest}
      />
    </div>
  );
}
