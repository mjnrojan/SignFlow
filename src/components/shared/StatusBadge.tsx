import { DocumentStatus } from '@/types/document.types';
import { getStatusConfig } from '@/lib/utils/document-status';

interface IStatusBadgeProps {
  status: DocumentStatus;
}

export function StatusBadge({ status }: IStatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border shadow-sm transition-all
        ${config.bgClass} ${config.textClass} ${config.borderClass}
      `}
    >
      <span className="size-1.5 rounded-full bg-current animate-pulse duration-[2000ms]" />
      <span className="font-['Syne']">{config.label}</span>
    </span>
  );
}
