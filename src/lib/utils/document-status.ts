import { DocumentStatus } from '@/types/document.types';

interface IStatusConfig {
  label: string;
  color: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}

const STATUS_MAP: Record<DocumentStatus, IStatusConfig> = {
  [DocumentStatus.DRAFT]: {
    label: 'Draft',
    color: '#64748b',
    bgClass: 'bg-slate-100 dark:bg-slate-800',
    textClass: 'text-slate-700 dark:text-slate-300',
    borderClass: 'border-slate-200 dark:border-slate-700',
  },
  [DocumentStatus.SENT]: {
    label: 'Sent',
    color: '#E8760A',
    bgClass: 'bg-orange-50 dark:bg-orange-950',
    textClass: 'text-orange-700 dark:text-orange-300',
    borderClass: 'border-orange-200 dark:border-orange-800',
  },
  [DocumentStatus.COMPLETED]: {
    label: 'Completed',
    color: '#059669',
    bgClass: 'bg-green-50 dark:bg-green-950',
    textClass: 'text-green-700 dark:text-green-300',
    borderClass: 'border-green-200 dark:border-green-800',
  },
  [DocumentStatus.EXPIRED]: {
    label: 'Expired',
    color: '#d97706',
    bgClass: 'bg-amber-50 dark:bg-amber-950',
    textClass: 'text-amber-700 dark:text-amber-300',
    borderClass: 'border-amber-200 dark:border-amber-800',
  },
  [DocumentStatus.DECLINED]: {
    label: 'Declined',
    color: '#dc2626',
    bgClass: 'bg-red-50 dark:bg-red-950',
    textClass: 'text-red-700 dark:text-red-300',
    borderClass: 'border-red-200 dark:border-red-800',
  },
  [DocumentStatus.VOIDED]: {
    label: 'Voided',
    color: '#6b7280',
    bgClass: 'bg-gray-100 dark:bg-gray-800',
    textClass: 'text-gray-600 dark:text-gray-400',
    borderClass: 'border-gray-200 dark:border-gray-700',
  },
};

export function getStatusConfig(status: DocumentStatus): IStatusConfig {
  return STATUS_MAP[status];
}

export function getStatusLabel(status: DocumentStatus): string {
  return STATUS_MAP[status].label;
}
