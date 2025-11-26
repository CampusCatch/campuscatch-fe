import ScheduleCard from "../ScheduleCard";
import { getCategoryChipProps } from "../../utils/scheduleChipUtils";

function parseDotDate(dateStr) {
  // "2024.09.20." / "2024.09.20" 둘 다 대응
  if (!dateStr) return null;
  const cleaned = dateStr.replace(/\s/g, "").replace(/\.$/, "");
  const [year, month, day] = cleaned.split(".").map((v) => Number(v));
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function getDDayText(baseDate, dateStr) {
  const target = parseDotDate(dateStr);
  if (!baseDate || !target) return "";

  const diffMs = target.setHours(0, 0, 0, 0) - baseDate.setHours(0, 0, 0, 0);
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "D-DAY";
  if (diffDays > 0) return `D-${diffDays}`;
  return `D+${Math.abs(diffDays)}`;
}

/**
 * props
 * - schedules: schedule[]
 * - baseDate: Date           // D-day 계산 기준 날짜 (InterestSchedulePage에서 넘겨줌)
 * - onClickSchedule?: (schedule) => void
 */
export default function UpcomingScheduleSection({
  schedules = [],
  baseDate,
  onClickSchedule,
  className = "",
}) {
  const getMainCategory = (schedule) => {
    if (schedule.categories && schedule.categories.length > 0) {
      return schedule.categories[0];
    }
    return schedule.category || "학사";
  };

  return (
    <section
      className={[
        "rounded-xl bg-white shadow-sm",
        "p-6 sm:p-8",
        className,
      ].join(" ")}
    >
      <h2 className="text-lg font-semibold text-gray-90 mb-6">다가오는 일정</h2>

      <div className="space-y-3">
        {schedules.map((schedule) => {
          const mainCategory = getMainCategory(schedule);

          return (
            <ScheduleCard
              key={schedule.id}
              title={schedule.title}
              dateText={schedule.startDate || ""}
              rightType="ddayWithChip"
              ddayText={getDDayText(new Date(baseDate), schedule.startDate)}
              categoryChip={getCategoryChipProps(mainCategory)}
              onClick={() => onClickSchedule?.(schedule)}
            />
          );
        })}

        {schedules.length === 0 && (
          <p className="text-sm text-gray-60">다가오는 일정이 없습니다.</p>
        )}
      </div>
    </section>
  );
}
