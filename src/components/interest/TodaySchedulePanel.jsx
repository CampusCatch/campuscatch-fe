import ScheduleCard from "../ScheduleCard";
import {
  getCategoryChipProps,
  getStatusChipProps,
} from "../../utils/scheduleChipUtils";

/**
 * props
 * - schedules: schedule[]
 * - onClickSchedule?: (schedule) => void
 *
 * schedule 예시:
 * { id, title, startDate, endDate, timeText?, status?, categories?: string[] }
 */
export default function TodayScheduleSection({
  schedules = [],
  onClickSchedule,
  className = "",
}) {
  const buildRightChips = (schedule) => {
    const chips = [];

    const categories =
      schedule.categories && schedule.categories.length > 0
        ? schedule.categories
        : schedule.category
        ? [schedule.category]
        : [];

    categories.forEach((cat) => {
      chips.push(getCategoryChipProps(cat));
    });

    if (schedule.status) {
      const statusChip = getStatusChipProps(schedule.status);
      if (statusChip) chips.push(statusChip);
    }

    return chips;
  };

  const getTimeText = (schedule) =>
    schedule.timeText ||
    schedule.time ||
    schedule.startTime ||
    schedule.startDate ||
    "";

  return (
    <section
      className={[
        "rounded-xl bg-white shadow-sm",
        "p-6 sm:p-8",
        className,
      ].join(" ")}
    >
      <h2 className="text-lg font-semibold text-gray-90 mb-6">오늘의 일정</h2>

      <div className="space-y-3">
        {schedules.map((schedule) => (
          <ScheduleCard
            key={schedule.id}
            title={schedule.title}
            dateText={getTimeText(schedule)}
            rightType="chips"
            rightChips={buildRightChips(schedule)}
            onClick={() => onClickSchedule?.(schedule)}
          />
        ))}

        {schedules.length === 0 && (
          <p className="text-sm text-gray-60">오늘은 등록된 일정이 없습니다.</p>
        )}
      </div>
    </section>
  );
}
