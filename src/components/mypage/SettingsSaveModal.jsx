import Button from "../Button";

export default function SettingsSaveModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onClose?.();
  };

  const handleInnerClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleBackdropClick}
    >
      <div
        className="w-[320px] rounded-3xl bg-white px-6 py-8 text-center shadow-lg sm:w-[360px]"
        onClick={handleInnerClick}
      >
        {/* 상단 체크 아이콘 영역 */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <img src="/icons/check.svg" alt="저장 완료" className="h-8 w-8" />
        </div>

        {/* 제목 / 내용 */}
        <p className="mb-1 text-base font-semibold text-gray-90">저장 완료</p>
        <p className="mb-6 text-sm text-gray-70">변경 사항이 저장되었습니다.</p>

        {/* 확인 버튼 (빨간색, 가로 전체) */}
        <Button type="button" className="w-full" onClick={onClose}>
          확인
        </Button>
      </div>
    </div>
  );
}
