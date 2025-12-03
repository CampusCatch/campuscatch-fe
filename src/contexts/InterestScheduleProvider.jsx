import { useEffect, useState } from "react";
import { InterestScheduleContext } from "./InterestScheduleContext";

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
    // mock 초기값 없이, 관심 일정은 항상 비어 있는 상태에서 시작
    return [];
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

  const isInterested = (scheduleId) => interestedIds.includes(scheduleId);

  const value = { interestedIds, isInterested, toggleInterest };

  return (
    <InterestScheduleContext.Provider value={value}>
      {children}
    </InterestScheduleContext.Provider>
  );
}
