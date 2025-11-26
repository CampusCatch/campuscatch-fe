export default function SearchInput({
  value,
  onChange,
  placeholder = "공지사항, 일정 검색...",
  className = "",
}) {
  return (
    <div
      className={[
        "flex items-center gap-3",
        "h-11 w-full",
        "rounded-2xl border border-gray-30 bg-white",
        "px-4 shadow-sm",
        "text-sm text-gray-90",
        "focus-within:border-gray-60 focus-within:ring-2",
        "focus-within:ring-gray-20 focus-within:ring-offset-0",
        className,
      ].join(" ")}
    >
      {/* 검색 아이콘 */}
      <img
        src="/icons/search.svg"
        alt="검색"
        className="w-4 h-4 shrink-0 text-gray-60"
      />

      {/* 실제 입력창 */}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-none outline-none placeholder:text-gray-50 text-sm"
      />
    </div>
  );
}
