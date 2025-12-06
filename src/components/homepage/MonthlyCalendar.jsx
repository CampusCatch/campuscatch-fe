import { useMemo, useState } from "react";
import Chip from "../Chip";
import { CATEGORY_OPTIONS, MOCK_SCHEDULES } from "../../mocks/scheduleMocks";

const CATEGORY_STYLE = {
  학사: {
    chipBg: "bg-category-academic/10",
    chipText: "text-category-academic",
    eventBg: "bg-category-academic/10",
    eventText: "text-category-academic",
  },
  장학: {
    chipBg: "bg-category-scholarship/10",
    chipText: "text-category-scholarship",
    eventBg: "bg-category-scholarship/10",
    eventText: "text-category-scholarship",
  },
  취업: {
    chipBg: "bg-category-career/10",
    chipText: "text-category-career",
    eventBg: "bg-category-career/10",
    eventText: "text-category-career",
  },
  국제교류: {
    chipBg: "bg-category-international/10",
    chipText: "text-category-international",
    eventBg: "bg-category-international/10",
    eventText: "text-category-international",
  },
  "근로/조교": {
    chipBg: "bg-category-work/10",
    chipText: "text-category-work",
    eventBg: "bg-category-work/10",
    eventText: "text-category-work",
  },
  MY: {
    chipBg: "bg-category-my/10",
    chipText: "text-category-my",
    eventBg: "bg-category-my/10",
    eventText: "text-category-my",
  },
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

// "2025-11-15" 또는 "2025-11-15T09:00:00" 형태 문자열 -> Date
function parseYmdDate(ymdString) {
  if (!ymdString) return null;

  // LocalDateTime일 때는 T 앞까지만 날짜로 사용
  const [yearStr, monthStr, dayStr] = String(ymdString)
    .split("T")[0]
    .split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
}

export default function MonthlyCalendar({
  selectedCategories,
  schedules = MOCK_SCHEDULES,
  onScheduleClick,
  className = "",
}) {
  const today = new Date();

  const [currentYM, setCurrentYM] = useState(() => ({
    year: today.getFullYear(),
    month: today.getMonth(), // 0 ~ 11
  }));

  const activeCategories =
    selectedCategories && selectedCategories.length > 0
      ? selectedCategories
      : CATEGORY_OPTIONS;

  // 현재 월에 표시할 캘린더 그리드 구성
  const weeks = useMemo(() => {
    const { year, month } = currentYM;
    const firstDay = new Date(year, month, 1);
    const firstWeekday = firstDay.getDay(); // 0(일)~6(토)

    const weeksArr = [];
    let dayCounter = 1 - firstWeekday; // 첫 셀에 들어갈 날짜(이전달 포함)

    for (let w = 0; w < 6; w += 1) {
      const week = [];
      for (let d = 0; d < 7; d += 1) {
        const cellDate = new Date(year, month, dayCounter);
        const isCurrentMonth = cellDate.getMonth() === month;
        week.push({
          date: cellDate,
          isCurrentMonth,
        });
        dayCounter += 1;
      }
      weeksArr.push(week);
    }

    // 이번 달 날짜가 하나도 없는 주(지난달/다음달만 있는 주)는 잘라낸다
    return weeksArr.filter((week) =>
      week.some(({ date }) => date.getMonth() === month)
    );
  }, [currentYM]);

  // 선택된 카테고리 기준으로 일정 필터링
  const filteredSchedules = useMemo(() => {
    if (!activeCategories || activeCategories.length === 0) {
      return schedules;
    }
    return schedules.filter((schedule) =>
      schedule.categories.some((cat) => activeCategories.includes(cat))
    );
  }, [schedules, activeCategories]);

  // 각 주(week) 단위로, 해당 주에 걸쳐 있는 일정들을
  // "startCol ~ endCol" 로 span 하는 segment 로 계산
  const weekSegments = useMemo(() => {
    return weeks.map((week) => {
      const weekStart = week[0].date;
      const weekEnd = week[6].date;

      const segments = [];

      filteredSchedules.forEach((schedule) => {
        const start = parseYmdDate(schedule.startDate);
        const end = parseYmdDate(schedule.endDate);

        // 이 주와 전혀 겹치지 않으면 스킵
        if (end < weekStart || start > weekEnd) return;

        // 이 주에 실제로 그릴 구간 (겹치는 부분만)
        const segStart = start < weekStart ? weekStart : start;
        const segEnd = end > weekEnd ? weekEnd : end;

        const startCol = segStart.getDay() + 1; // 1~7
        const endCol = segEnd.getDay() + 1; // 1~7

        segments.push({
          schedule,
          startCol,
          endCol,
        });
      });

      return segments;
    });
  }, [weeks, filteredSchedules]);

  const goPrevMonth = () => {
    setCurrentYM((prev) => {
      let { year, month } = prev;
      month -= 1;
      if (month < 0) {
        month = 11;
        year -= 1;
      }
      return { year, month };
    });
  };

  const goNextMonth = () => {
    setCurrentYM((prev) => {
      let { year, month } = prev;
      month += 1;
      if (month > 11) {
        month = 0;
        year += 1;
      }
      return { year, month };
    });
  };

  const goToday = () => {
    setCurrentYM({
      year: today.getFullYear(),
      month: today.getMonth(),
    });
  };

  const isToday = (date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  return (
    <section
      className={["rounded-xl bg-white shadow-sm p-6 sm:p-8", className].join(
        " "
      )}
    >
      {/* 상단: 표시중 카테고리 / 월 이동 / 오늘 버튼 */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* 표시 중 카테고리 */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-70">
          <span>표시 중:</span>
          {activeCategories.map((cat) => {
            const style = CATEGORY_STYLE[cat] || {};
            return (
              <Chip
                key={cat}
                label={cat}
                bgColor={style.chipBg || "bg-gray-10"}
                textColor={style.chipText || "text-gray-80"}
              />
            );
          })}
        </div>

        {/* 월 이동 + 오늘 버튼 */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrevMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-30 text-gray-70 hover:bg-gray-10"
            >
              ‹
            </button>
            <p className="min-w-28 text-center text-base font-semibold text-gray-90">
              {currentYM.year}년 {currentYM.month + 1}월
            </p>
            <button
              type="button"
              onClick={goNextMonth}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-30 text-gray-70 hover:bg-gray-10"
            >
              ›
            </button>
          </div>

          <button
            type="button"
            onClick={goToday}
            className="rounded-full border border-gray-30 bg-white px-3 py-1 text-xs text-gray-80 hover:bg-gray-10"
          >
            오늘
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="mt-6 border-t border-gray-20 pt-4">
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-60">
          {WEEKDAYS.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* 주 단위 rows + 일정 바 */}
        <div className="mt-1 text-xs">
          {weeks.map((week, wIndex) => (
            <div
              key={wIndex}
              className="border-t border-gray-10 pb-2 min-h-20 flex flex-col"
            >
              {/* 날짜 숫자 그리드 */}
              <div className="grid grid-cols-7 flex-none">
                {week.map(({ date, isCurrentMonth }, dIndex) => {
                  const baseCell = "px-2 pt-2 pb-1";
                  const dimmed = isCurrentMonth
                    ? "bg-white"
                    : "bg-gray-5 text-gray-40";

                  return (
                    <div key={dIndex} className={`${baseCell} ${dimmed}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-80">
                          {date.getDate()}
                        </span>
                        {isToday(date) && isCurrentMonth && (
                          <span className="inline-flex items-center justify-center rounded-full bg-main text-[0.65rem] font-semibold text-white px-2 py-0.5">
                            오늘
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 일정 바 레이어 - 여기서 absolute, top-6 변경하면 이상해짐 */}
              <div className="pointer-events-none mt-0.5 px-2 flex-1">
                <div className="grid grid-cols-7 gap-1">
                  {weekSegments[wIndex].map(
                    ({ schedule, startCol, endCol }, idx) => {
                      const mainCategory = schedule.categories[0] || "학사";
                      const style = CATEGORY_STYLE[mainCategory] || {};
                      const eventBg = style.eventBg || "bg-gray-10";
                      const eventText = style.eventText || "text-gray-80";

                      const gridStyle = {
                        gridColumn: `${startCol} / ${endCol + 1}`,
                      };

                      return (
                        <button
                          key={`${schedule.id}-${idx}`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onScheduleClick) {
                              onScheduleClick(schedule);
                            }
                          }}
                          style={gridStyle}
                          className={[
                            "pointer-events-auto rounded-full px-2 text-left text-[0.7rem] leading-snug",
                            "truncate",
                            eventBg,
                            eventText,
                            "hover:brightness-95",
                          ].join(" ")}
                        >
                          {schedule.title}
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
