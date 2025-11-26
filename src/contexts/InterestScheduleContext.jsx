import { createContext, useContext, useMemo, useState } from "react";
import { MOCK_INTEREST_SCHEDULE_IDS } from "@/mocks/scheduleMocks";

const InterestScheduleContext = createContext(null);

export function InterestScheduleProvider({ children }) {
  // 최초 값은 mock에서 가져오고, 이후로는 전역 상태로만 움직이게
  const [interestedIds, setInterestedIds] = useState(
    MOCK_INTEREST_SCHEDULE_IDS ?? []
  );

  const toggleInterest = (scheduleId) => {
    setInterestedIds(
      (prev) =>
        prev.includes(scheduleId)
          ? prev.filter((id) => id !== scheduleId) // 이미 관심이면 해제
          : [...prev, scheduleId] // 아니면 추가
    );
  };

  const value = useMemo(
    () => ({
      interestedIds,
      toggleInterest,
      isInterested: (id) => (id ? interestedIds.includes(id) : false),
    }),
    [interestedIds]
  );

  return (
    <InterestScheduleContext.Provider value={value}>
      {children}
    </InterestScheduleContext.Provider>
  );
}

export function useInterestSchedules() {
  const ctx = useContext(InterestScheduleContext);
  if (!ctx) {
    throw new Error(
      "useInterestSchedules는 InterestScheduleProvider 안에서만 사용할 수 있습니다."
    );
  }
  return ctx;
}
