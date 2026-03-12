import type { IAuditLog } from '@/types/audit.types';

export const MOCK_AUDIT_LOGS: IAuditLog[] = [
  {
    id: 'log_1',
    documentId: 'doc_1',
    action: 'Document Created',
    timestamp: '2026-03-01T10:00:00Z',
    userId: 'usr_nepal_123',
    userEmail: 'aarav.sharma@example.com.np',
    ipAddress: '110.44.116.12',
    deviceInfo: 'Chrome 120 / Windows 11'
  },
  {
    id: 'log_2',
    documentId: 'doc_1',
    action: 'Fields Placed (3 fields)',
    timestamp: '2026-03-01T10:45:00Z',
    userId: 'usr_nepal_123',
    userEmail: 'aarav.sharma@example.com.np',
    ipAddress: '110.44.116.12',
    deviceInfo: 'Chrome 120 / Windows 11'
  },
  {
    id: 'log_3',
    documentId: 'doc_1',
    action: 'Document Sent for Signature',
    timestamp: '2026-03-02T10:00:00Z',
    userId: 'usr_nepal_123',
    userEmail: 'aarav.sharma@example.com.np',
    ipAddress: '110.44.116.12',
    deviceInfo: 'Chrome 120 / Windows 11'
  },
  {
    id: 'log_4',
    documentId: 'doc_1',
    action: 'Viewed by Bikash Tamang',
    timestamp: '2026-03-02T14:30:00Z',
    userEmail: 'bikash.tamang@gmail.com',
    ipAddress: '103.1.92.45',
    deviceInfo: 'Safari / iPhone 15'
  },
  {
    id: 'log_5',
    documentId: 'doc_2',
    action: 'Document Created',
    timestamp: '2026-02-15T14:30:00Z',
    userId: 'usr_nepal_123',
    userEmail: 'aarav.sharma@example.com.np',
    ipAddress: '110.44.116.12'
  },
  {
    id: 'log_6',
    documentId: 'doc_2',
    action: 'Document Sent for Signature',
    timestamp: '2026-02-16T09:00:00Z',
    userId: 'usr_nepal_123',
    userEmail: 'aarav.sharma@example.com.np',
    ipAddress: '110.44.116.12'
  },
  {
    id: 'log_7',
    documentId: 'doc_2',
    action: 'Signed by Nabin Shrestha',
    timestamp: '2026-02-20T11:00:00Z',
    userEmail: 'nabin.shrestha@techpatan.com',
    ipAddress: '27.34.68.91',
    deviceInfo: 'Firefox 121 / macOS'
  },
  {
    id: 'log_8',
    documentId: 'doc_2',
    action: 'Document Completed — All Signatures Collected',
    timestamp: '2026-02-20T11:00:05Z',
    userId: 'usr_nepal_123',
    userEmail: 'aarav.sharma@example.com.np'
  },
  {
    id: 'log_9',
    documentId: 'doc_5',
    action: 'Document Created',
    timestamp: '2026-01-20T11:00:00Z',
    userId: 'usr_nepal_123',
    userEmail: 'aarav.sharma@example.com.np',
    ipAddress: '110.44.116.12'
  },
  {
    id: 'log_10',
    documentId: 'doc_5',
    action: 'Signed by Dr. Meena Acharya',
    timestamp: '2026-02-01T10:00:00Z',
    userEmail: 'meena.acharya@ingo-nepal.org',
    ipAddress: '202.52.1.14',
    deviceInfo: 'Chrome 120 / Windows 10'
  },
  {
    id: 'log_11',
    documentId: 'doc_5',
    action: 'Signed by David Henderson',
    timestamp: '2026-02-05T15:30:00Z',
    userEmail: 'david.h@globalpartners.org',
    ipAddress: '198.51.100.23',
    deviceInfo: 'Chrome 120 / macOS'
  },
  {
    id: 'log_12',
    documentId: 'doc_9',
    action: 'Declined by Krishna Bahadur KC',
    timestamp: '2026-03-02T08:00:00Z',
    userEmail: 'krishna.kc@construction.com.np',
    ipAddress: '27.111.24.67',
    deviceInfo: 'Samsung Browser / Android'
  }
];
