export default function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  className = "",
}) {
  const handleClick = () => {
    if (disabled) return;
    onChange?.(!checked);
  };

  const baseTrack =
    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors";
  const trackColor = disabled
    ? "bg-gray-30"
    : checked
    ? "bg-main" // ON일 때 메인 색
    : "bg-gray-40";

  const thumbBase =
    "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform";
  const thumbPos = checked ? "translate-x-5" : "translate-x-1";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={["focus:outline-none", className].join(" ")}
    >
      <span className={[baseTrack, trackColor].join(" ")}>
        <span className={[thumbBase, thumbPos].join(" ")} />
      </span>
    </button>
  );
}
