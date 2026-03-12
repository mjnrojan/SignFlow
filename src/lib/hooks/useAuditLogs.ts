import { useQuery } from '@tanstack/react-query';
import type { IAuditLog } from '@/types/audit.types';
import { MOCK_AUDIT_LOGS } from '../mock-data/audit-logs.mock';

export const useAuditLogs = () =>
  useQuery<IAuditLog[]>({
    queryKey: ['audit-logs'],
    queryFn: () =>
      new Promise<IAuditLog[]>((resolve) =>
        setTimeout(() => resolve(MOCK_AUDIT_LOGS), 300)
      ),
  });
