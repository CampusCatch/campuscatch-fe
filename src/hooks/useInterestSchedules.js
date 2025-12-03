import { useContext } from "react";
import { InterestScheduleContext } from "@/contexts/InterestScheduleContext";

export function useInterestSchedules() {
  const ctx = useContext(InterestScheduleContext);
  if (!ctx) {
    throw new Error(
      "useInterestSchedules는 InterestScheduleProvider 안에서만 사용할 수 있습니다."
    );
  }
  return ctx;
}
