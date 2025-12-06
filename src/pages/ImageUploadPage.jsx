import { useEffect, useMemo, useState } from "react";
import ImageUploadCard from "../components/image-upload/ImageUploadCard";
import ExtractedScheduleCard from "../components/image-upload/ExtractedScheduleCard";
import RecentUploadedSchedulesCard from "../components/image-upload/RecentUploadedSchedulesCard";
import ScheduleDetailModal from "../components/ScheduleDetailModal";
import { useInterestSchedules } from "@/hooks/useInterestSchedules";

// TODO: 실제 OCR 응답 대신 사용하는 목데이터
const MOCK_OCR_RESULT = {
  title: "기초학력 증진프로그램",
  category_id: 6,
  start_date: "2025-12-01",
  end_date: "2025-12-28",
  location: "온라인 강의",
  description:
    "기초학력 증진프로그램이 2025년 12월 1일부터 12월 28일까지 진행됩니다. 수강료는 무료이며, 전공에 대한 자신감을 높일 수 있는 기회입니다. 추후 마일리지가 지급됩니다.",
  college_id: null,
  target: "세종대학교 재학생",
  payment_date: null,
  required_documents: null,
};

// 백엔드 category_id → 프론트 카테고리명 매핑 (임시)
const CATEGORY_MAP = {
  1: "학사",
  2: "장학",
  3: "취업",
  4: "국제교류",
  5: "근로/조교",
  6: "MY",
};

const getCategoryLabel = (id) => CATEGORY_MAP[id] ?? "학사";

const INITIAL_RECENT = [];

export default function ImageUploadPage() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [recentItems, setRecentItems] = useState(INITIAL_RECENT);
  const [formKey, setFormKey] = useState(0); // 저장 후 폼 리셋용
  const [isLoading, setIsLoading] = useState(false); // 분석 로딩 상태

  // 전역 관심 상태 사용
  const { isInterested, toggleInterest } = useInterestSchedules();

  // 상세 모달 상태
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // object URL 정리
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // 이미지 업로드 카드에서 파일 선택/드롭 시
  const handleFilesSelected = (files) => {
    const [file] = files;
    if (!file) return;

    // 프리뷰용 URL 생성
    const url = URL.createObjectURL(file);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(url);

    // 이전 결과 초기화 + 로딩 시작
    setExtractedData(null);
    setIsLoading(true);

    // 🔥 3초 후에 목데이터 적용
    setTimeout(() => {
      setExtractedData({
        // 파일 이름 대신 OCR 결과 title 사용
        title: MOCK_OCR_RESULT.title,
        // 백엔드 응답(start_date / end_date) → 그대로 문자열로 사용
        startDate: MOCK_OCR_RESULT.start_date,
        endDate: MOCK_OCR_RESULT.end_date,
        // category_id → 카테고리명으로 변환
        category: getCategoryLabel(MOCK_OCR_RESULT.category_id),
        // 상세 설명
        description: MOCK_OCR_RESULT.description,
        // location, target 등은 지금 카드 폼에서 안쓰니까 일단 생략
      });

      setIsLoading(false);
    }, 3000);
  };

  // 추출된 일정 정보 카드에서 "일정 저장" 눌렀을 때
  const handleSaveSchedule = (payload) => {
    console.log("저장할 일정 데이터:", payload);

    const mainCategory = payload.categories?.[0] ?? payload.category ?? "학사";

    // 최근 업로드 목록에 추가 (프론트 임시 동작)
    setRecentItems((prev) => [
      {
        id: `u-${Date.now()}`,
        title: payload.title,
        categories: payload.categories ?? [mainCategory],
        category: mainCategory,
        startDate: payload.startDate,
        endDate: payload.endDate,
        dateText: payload.startDate, // 리스트에 보여줄 날짜
        location: payload.location,
        description: payload.description,
        linkUrl: payload.linkUrl,
        status: "처리완료",
        // 업로드 시점 기록 (필터용)
        uploadedAt: new Date().toISOString(),
      },
      ...prev,
    ]);

    // 새 일정 업로드할 수 있게 초기 상태로 되돌리기
    setExtractedData(null);
    setPreviewUrl(null);
    setFormKey((k) => k + 1); // key 변경 → ExtractedScheduleCard 리마운트되면서 내부 state 초기화
  };

  // 최근 업로드 카드 클릭 시 상세 모달 열기
  const handleOpenRecentDetail = (item) => {
    // ImageUploadPage에서는 MOCK_SCHEDULES처럼 item 자체가 일정 객체라고 생각하고 그대로 넘김
    setSelectedSchedule(item);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedSchedule(null);
  };

  // 관심 일정 토글
  const handleToggleInterest = () => {
    if (!selectedSchedule) return;
    toggleInterest(selectedSchedule.id);
  };

  const isSelectedInterested =
    selectedSchedule && isInterested(selectedSchedule.id);

  // 오늘 포함 최근 2일 이내에 업로드된 일정만 표시
  const visibleRecentItems = useMemo(() => {
    if (!recentItems.length) return [];

    const now = new Date();
    const todayOnly = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    return recentItems.filter((item) => {
      if (!item.uploadedAt) return false;
      const uploaded = new Date(item.uploadedAt);
      const uploadedOnly = new Date(
        uploaded.getFullYear(),
        uploaded.getMonth(),
        uploaded.getDate()
      );

      const diffMs = todayOnly.getTime() - uploadedOnly.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      // 오늘(0일 차) ~ 이틀 전(2일 차)까지만
      return diffDays >= 0 && diffDays <= 2;
    });
  }, [recentItems]);

  return (
    <div className="w-full">
      {/* 페이지 제목 / 설명 */}
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-90 mb-1">
          이미지 업로드
        </h1>
        <p className="text-sm text-gray-60">
          이미지를 업로드하면 자동으로 일정을 추출합니다.
        </p>
      </header>

      {/* 상단 두 개 카드: 큰 화면에서는 2열, 작은 화면에서는 세로로 쌓임 */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ImageUploadCard
          onFilesSelected={handleFilesSelected}
          previewUrl={previewUrl}
          className="w-full"
        />
        <div className="w-full">
          {isLoading && (
            <div className="w-full h-full min-h-[180px] rounded-2xl border border-gray-20 bg-white shadow-sm flex items-center justify-center text-sm text-gray-70">
              이미지를 분석하고 있어요... ⏳
            </div>
          )}

          {!isLoading && (
            <ExtractedScheduleCard
              key={formKey}
              extractedData={extractedData}
              onSave={handleSaveSchedule}
            />
          )}
        </div>
      </section>

      {/* 최근 업로드한 일정 */}
      <section className="mt-8">
        <RecentUploadedSchedulesCard
          items={visibleRecentItems}
          onClickSchedule={handleOpenRecentDetail}
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
