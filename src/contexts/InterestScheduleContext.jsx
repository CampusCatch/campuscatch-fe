import { createContext, useEffect, useMemo, useState } from "react";
import { MOCK_INTEREST_SCHEDULE_IDS } from "@/mocks/scheduleMocks";

const InterestScheduleContext = createContext(null);

export function InterestScheduleProvider({ children }) {
  // 최초 값: localStorage → 없으면 mock → 없으면 빈 배열
  const [interestedIds, setInterestedIds] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("interestScheduleIds");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.warn("관심 일정 localStorage 파싱 실패", e);
        }
      }
    }
    return MOCK_INTEREST_SCHEDULE_IDS ?? [];
  });

  // 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "interestScheduleIds",
        JSON.stringify(interestedIds)
      );
    }
  }, [interestedIds]);

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
