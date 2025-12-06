import { useState } from "react";
import { MOCK_SCHEDULES } from "@/mocks/scheduleMocks";
import TodayScheduleSection from "../components/interest/TodaySchedulePanel";
import UpcomingScheduleSection from "../components/interest/UpcomingScheduleSection";
import ScheduleDetailModal from "../components/ScheduleDetailModal";
import { useInterestSchedules } from "@/hooks/useInterestSchedules";

const TODAY = new Date();

// "2025-12-02" / "2025-12-02T09:00:00" / "2025.12.02" 모두 대응
function parseScheduleDate(dateStr) {
  if (!dateStr) return null;

  // 숫자만 남기기 → "20251202", "20251202090000" 등
  const cleaned = String(dateStr).replace(/[^\d]/g, "");
  if (cleaned.length < 8) return null;

  const year = Number(cleaned.slice(0, 4));
  const month = Number(cleaned.slice(4, 6));
  const day = Number(cleaned.slice(6, 8));

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

function isSameDate(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

// 관심 일정들 중에서 오늘/다가오는 일정 나누기
function splitSchedulesByDate(interestSchedules, today) {
  const todaySchedules = [];
  const upcomingSchedules = [];

  interestSchedules.forEach((schedule) => {
    const start = parseScheduleDate(schedule.startDate);
    const end = parseScheduleDate(schedule.endDate);

    if (!start || !end) return;

    const isTodayRange =
      isSameDate(start, today) ||
      isSameDate(end, today) ||
      (start < today && today < end);

    if (isTodayRange) {
      todaySchedules.push(schedule);
    } else if (start > today) {
      upcomingSchedules.push(schedule);
    }
    // start/end 둘 다 오늘 이전이면 이번 페이지에서는 안 보여줌
  });

  return { todaySchedules, upcomingSchedules };
}

export default function InterestSchedulePage() {
  const { interestedIds, isInterested, toggleInterest } =
    useInterestSchedules();

  // 관심 등록된 일정만 필터링
  const interestSchedules = MOCK_SCHEDULES.filter((s) =>
    interestedIds.includes(s.id)
  );

  const { todaySchedules, upcomingSchedules } = splitSchedulesByDate(
    interestSchedules,
    TODAY
  );

  // 상세 모달 상태
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleOpenDetail = (schedule) => {
    setSelectedSchedule(schedule);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedSchedule(null);
  };

  const handleToggleInterest = () => {
    if (!selectedSchedule) return;
    toggleInterest(selectedSchedule.id);
  };

  const isSelectedInterested =
    selectedSchedule && isInterested(selectedSchedule.id);

  return (
    <div className="w-full">
      {/* 상단 타이틀 */}
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-90 mb-1">
          관심 일정 관리
        </h1>
        <p className="text-sm text-gray-60">
          관심 등록한 일정을 한 눈에 모아서 볼 수 있어요.
        </p>
      </header>

      {/* 메인 콘텐츠: 넓은 화면에서는 2열, 좁은 화면에서는 1열로 쌓이게 */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <TodayScheduleSection
          schedules={todaySchedules}
          onClickSchedule={handleOpenDetail}
        />
        <UpcomingScheduleSection
          schedules={upcomingSchedules}
          baseDate={TODAY}
          onClickSchedule={handleOpenDetail}
        />
      </section>

      {/* 일정 상세 모달 */}
      <ScheduleDetailModal
        schedule={selectedSchedule}
        isOpen={isDetailOpen}
        isInterested={!!isSelectedInterested}
        onClose={handleCloseDetail}
        onToggleInterest={handleToggleInterest}
      />
    </div>
  );
}
