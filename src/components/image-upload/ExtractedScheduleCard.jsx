import { useEffect, useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";

const CATEGORY_OPTIONS = [
  "학사",
  "장학",
  "취업",
  "국제교류",
  "근로/조교",
  "MY",
];

/**
 * props
 * - extractedData: { title?, startDate?, endDate?, category?, description? } | null
 *   👉 OCR 결과에서 description 들어오면 상세 내용 textarea에 반영
 * - onSave: (payload) => void
 *   payload: {
 *     title,
 *     startDate,
 *     endDate,
 *     description,
 *     categories: string[] // [선택 카테고리, "MY"]
 *   }
 * - isSaving?: boolean
 * - className?: string
 */
export default function ExtractedScheduleCard({
  extractedData,
  onSave,
  isSaving = false,
  className = "",
}) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("학사"); // 기본값
  const [description, setDescription] = useState("");

  // OCR 분석 결과 들어오면 폼에 반영
  useEffect(() => {
    if (!extractedData) return;
    if (extractedData.title) setTitle(extractedData.title);
    if (extractedData.startDate) setStartDate(extractedData.startDate);
    if (extractedData.endDate) setEndDate(extractedData.endDate);
    if (
      extractedData.category &&
      CATEGORY_OPTIONS.includes(extractedData.category)
    ) {
      setCategory(extractedData.category);
    }
    if (extractedData.description) {
      setDescription(extractedData.description);
    }
  }, [extractedData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!onSave) return;

    onSave({
      title,
      startDate,
      endDate,
      description,
      // 여기서부터는 필터용 태그 개념
      categories: [category, "MY"],
    });
  };

  const isSubmitDisabled = !title || !startDate || !endDate || isSaving;

  return (
    <section
      className={[
        "rounded-xl bg-white shadow-sm",
        "p-6 sm:p-8",
        className,
      ].join(" ")}
    >
      <h2 className="text-lg font-semibold text-gray-90 mb-6">
        추출된 일정 정보
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 제목 */}
        <TextInput
          label="제목"
          value={title}
          onValueChange={setTitle}
          placeholder="일정 제목이 자동으로 추출됩니다"
        />

        {/* 시작일 / 종료일 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="mb-2 text-sm font-semibold text-gray-80">시작일</p>
            <div className="relative">
              <TextInput
                as="input"
                value={startDate}
                onValueChange={setStartDate}
                placeholder="연도. 월. 일."
                inputClassName="pr-10"
              />
              <img
                src="/icons/calendar.svg"
                alt="달력"
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-gray-80">종료일</p>
            <div className="relative">
              <TextInput
                as="input"
                value={endDate}
                onValueChange={setEndDate}
                placeholder="연도. 월. 일."
                inputClassName="pr-10"
              />
              <img
                src="/icons/calendar.svg"
                alt="달력"
                className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2"
              />
            </div>
          </div>
        </div>

        {/* 카테고리 */}
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-80">카테고리</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={[
              "block w-full",
              "h-11",
              "rounded-xl border border-gray-30",
              "bg-white text-gray-90 text-sm",
              "px-4",
              "focus:outline-none focus:border-gray-60 focus:ring-2 focus:ring-gray-20",
            ].join(" ")}
          >
            {CATEGORY_OPTIONS.filter((c) => c !== "MY").map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-60">
            저장 시 선택한 카테고리와 MY 카테고리가 함께 적용됩니다.
          </p>
        </div>

        {/* 상세 내용 추가 */}
        <TextInput
          label="상세 내용 추가"
          as="textarea"
          value={description}
          onValueChange={setDescription}
          placeholder="OCR로 추출된 내용을 확인하고 수정해 주세요"
        />

        {/* 일정 저장 버튼 */}
        <div className="pt-2">
          <Button type="submit" className="w-full" disabled={isSubmitDisabled}>
            {isSaving ? "저장 중..." : "일정 저장"}
          </Button>
        </div>
      </form>
    </section>
  );
}
