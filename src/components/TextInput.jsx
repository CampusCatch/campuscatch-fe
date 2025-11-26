export default function TextInput({
  label, // 라벨 텍스트 (없으면 라벨 안 보임)
  as = "input", // "input" | "textarea"
  value,
  onValueChange,
  placeholder = "",
  readOnly = false, // true면 수정 불가(표시만)
  required = false, // 라벨 옆 * 표시용
  className = "", // 래퍼 div 스타일
  inputClassName = "", // 실제 input/textarea 스타일 추가
  ...props
}) {
  const Element = as === "textarea" ? "textarea" : "input";

  const baseInputClasses = [
    "block w-full",
    "rounded-lg border",
    "placeholder:text-gray-50",
    "text-sm",
    "transition focus:outline-none",
  ].join(" ");

  // 읽기/쓰기 공통 베이스 색
  const editableBaseClasses = "border-gray-30 bg-white text-gray-90";

  // input 전용 (고정 높이 + 패딩, 전부 scale 기반)
  const inputSpecificClasses = "h-11 px-4 py-2.5";

  // textarea 전용 (최소 높이만, 고정 높이는 X)
  const textareaSpecificClasses = "min-h-32 px-4 py-3 resize-none";

  // 포커스 스타일 (읽기 가능할 때만)
  const editableFocusClasses =
    "focus:border-gray-60 focus:ring-2 focus:ring-gray-20 focus:ring-offset-0";

  // 읽기 전용 스타일 (회색 배경 + 연한 테두리)
  const readOnlyClasses =
    "border-gray-20 bg-gray-10 text-gray-80 cursor-default";

  const composedInputClassName = [
    baseInputClasses,
    as === "textarea" ? textareaSpecificClasses : inputSpecificClasses,
    readOnly
      ? readOnlyClasses
      : `${editableBaseClasses} ${editableFocusClasses}`,
    inputClassName,
  ]
    .filter(Boolean)
    .join(" ");

  const handleChange = (e) => {
    if (readOnly) return; // 수정 불가 모드에서는 값 변경 막기
    onValueChange && onValueChange(e.target.value);
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-2 block text-sm font-semibold text-gray-80">
          {label}
          {required && <span className="ml-1 text-main">*</span>}
        </label>
      )}

      <Element
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={composedInputClassName}
        {...props}
      />
    </div>
  );
}
