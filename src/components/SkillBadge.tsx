export default function SkillBadge({
  icon,
  label,
  subLabel,
  large = false,
}: {
  icon?: string;
  label: string;
  subLabel?: string;
  large?: boolean;
}) {
  return (
    <span className="border border-[#EAEAEA] flex items-center ps-3.5 pe-5 py-1.5 rounded-full bg-white mb-1 w-fit gap-x-2.5">
      {/* Icon */}
      <img
        src={icon || "/placeholder.jpg"}
        alt={label}
        className={large ? "h-[1.875rem]" : "size-6"}
      />
      {/* Label + Sub Label */}
      <p>{label}</p>
      {subLabel && (
        <p className="text-secondary font-bold text-[10px] leading-3">
          AGE {subLabel}
        </p>
      )}
    </span>
  );
}
