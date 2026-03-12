export interface IAuditLog {
  id: string;
  documentId: string;
  action: string;
  timestamp: string;
  userId?: string;
  userEmail?: string;
  ipAddress?: string;
  deviceInfo?: string;
}
