const VARIANT_STYLES = {
  primary:
    // 메인 빨간 버튼 (설정 저장)
    "bg-main text-white hover:bg-main-strong " +
    "disabled:bg-gray-30 disabled:text-gray-60",

  secondary:
    // 흰 배경 서브 버튼 (오류 문의)
    "bg-white text-gray-90 border border-gray-30 hover:bg-gray-10 " +
    "disabled:text-gray-50 disabled:bg-gray-20",
};

export default function Button({
  children,
  variant = "primary", // "primary" | "secondary"
  className = "",
  type = "button",
  disabled = false,
  ...props
}) {
  const baseClasses = [
    "inline-flex items-center justify-center",
    "h-11 px-6", // 높이 고정, 넓이는 내용/상위 요소에 따라
    "rounded-lg",
    "text-sm font-semibold",
    "transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-main-weak focus:ring-offset-0",
  ].join(" ");

  const variantClasses = VARIANT_STYLES[variant] ?? VARIANT_STYLES.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
