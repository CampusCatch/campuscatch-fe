import Button from "../Button";

export default function AccountDeleteModal({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  const handleBackdropClick = () => {
    onCancel?.();
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
        {/* 아이콘 영역 제거 버전 */}

        <p className="mb-2 text-base font-semibold text-gray-90">
          정말 삭제하시겠어요?
        </p>
        <p className="mb-6 text-sm text-gray-70">
          계정 삭제 시 모든 정보가 삭제됩니다.
        </p>

        {/* 버튼 두 개: 왼쪽 취소(secondary), 오른쪽 삭제(primary) */}
        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="primary"
            className="w-full"
            onClick={onConfirm}
          >
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
