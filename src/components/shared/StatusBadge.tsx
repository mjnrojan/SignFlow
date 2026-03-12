import { DocumentStatus } from '@/types/document.types';
import { getStatusConfig } from '@/lib/utils/document-status';

interface IStatusBadgeProps {
  status: DocumentStatus;
}

export function StatusBadge({ status }: IStatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${config.bgClass} ${config.textClass} ${config.borderClass}`}
    >
      {config.label}
    </span>
  );
}
