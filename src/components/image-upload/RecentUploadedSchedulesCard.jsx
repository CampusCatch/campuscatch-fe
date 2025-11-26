import ScheduleCard from "../ScheduleCard";
import {
  getCategoryChipProps,
  getStatusChipProps,
} from "../../utils/scheduleChipUtils";

/**
 * props
 * - items: 일정 객체 배열 (ImageUploadPage에서 recentItems로 넘겨줌)
 * - className?: string
 * - onClickSchedule?: (item) => void   // 카드 클릭 시 호출
 */
export default function RecentUploadedSchedulesCard({
  items = [],
  className = "",
  onClickSchedule,
}) {
  return (
    <section
      className={[
        "rounded-xl bg-white shadow-sm",
        "p-6 sm:p-8",
        className,
      ].join(" ")}
    >
      <h2 className="text-lg font-semibold text-gray-90 mb-6">
        최근 업로드한 일정
      </h2>

      <div className="space-y-3">
        {items.map((item) => {
          const dateText = item.dateText || item.startDate || "";
          const category =
            item.category || (item.categories && item.categories[0]) || "학사";

          return (
            <ScheduleCard
              key={item.id}
              title={item.title}
              dateText={dateText}
              rightType="chips"
              rightChips={[
                getCategoryChipProps(category),
                getStatusChipProps(item.status),
              ].filter(Boolean)}
              onClick={
                onClickSchedule ? () => onClickSchedule(item) : undefined
              }
            />
          );
        })}

        {items.length === 0 && (
          <p className="text-sm text-gray-60">아직 업로드된 일정이 없습니다.</p>
        )}
      </div>
    </section>
  );
}
