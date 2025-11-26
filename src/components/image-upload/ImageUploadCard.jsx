import { useRef, useState } from "react";
import Button from "../Button";

export default function ImageUploadCard({
  onFilesSelected, // (files: File[]) => void
  previewUrl, // string | null  ← 선택된 이미지 프리뷰
  className = "", // 상위에서 폭/정렬 조절용
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const triggerFileDialog = () => {
    inputRef.current?.click();
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    onFilesSelected?.(files);
  };

  const handleChange = (e) => {
    if (!e.target.files) return;
    handleFiles(e.target.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const dropZoneBorderClass = isDragging
    ? "border-main bg-main-weak/40"
    : "border-gray-30";

  return (
    <section
      className={[
        "rounded-xl bg-white shadow-sm",
        "p-6 sm:p-8",
        className,
      ].join(" ")}
    >
      {/* 제목 */}
      <h2 className="text-lg font-semibold text-gray-90 mb-6">이미지 업로드</h2>

      <div
        onClick={triggerFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={[
          "flex flex-col items-center justify-center",
          "w-full",
          "rounded-xl",
          "border-2 border-dashed",
          dropZoneBorderClass,
          "bg-gray-10",
          "py-10 sm:py-16",
          "cursor-pointer",
          "transition-colors",
          "text-center",
        ].join(" ")}
      >
        {/* 프리뷰가 없을 때: 기존 안내 UI */}
        {!previewUrl && (
          <>
            <img
              src="/icons/upload.svg"
              alt="업로드"
              className="w-12 h-12 mb-6"
            />
            <p className="text-base font-semibold text-gray-90 mb-2">
              이미지를 드래그하거나 클릭하여 업로드
            </p>
            <p className="text-sm text-gray-60 mb-6">
              JPG, PNG, PDF 파일을 지원합니다
            </p>
            <Button type="button">파일 선택</Button>
          </>
        )}

        {/* 프리뷰가 있을 때: 선택한 이미지 표시 */}
        {previewUrl && (
          <>
            <img
              src={previewUrl}
              alt="선택한 이미지"
              className="mb-4 max-h-64 rounded-xl object-contain"
            />
            <p className="mb-2 text-sm text-gray-80">
              새로운 이미지를 선택하려면 이 영역을 다시 클릭하세요.
            </p>
            <Button type="button">다른 파일 선택</Button>
          </>
        )}

        {/* 실제 input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.pdf"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </section>
  );
}
