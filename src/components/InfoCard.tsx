interface Props {
  icon?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function InfoCard({
  icon,
  title,
  subtitle,
  className = "",
}: Props) {
  return (
    <div
      className={
        "flex flex-col items-center justify-center pt-2 pb-1.5 px-2.5 rounded-[10px] border border-[#0000000D] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.06)]" +
        className
      }
    >
      {/* Icon */}
      {icon ? (
        <div className="h-[42px] flex flex-col items-center justify-center">
          <img src={icon} alt={title} className="h-full w-full" />
        </div>
      ) : null}

      {/* Title+ subtitle */}

      <div className="text-center">
        <div className="text-xs leading-3">{title}</div>
        {subtitle && (
          <div className="text-[10px] leading-[20px] text-[#9B9B9B] font-bold tracking-[0.33px]">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
