export enum DocumentStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  DECLINED = 'DECLINED',
  VOIDED = 'VOIDED'
}

export enum FieldType {
  SIGNATURE = 'SIGNATURE',
  INITIALS = 'INITIALS',
  DATE = 'DATE',
  TEXT = 'TEXT',
  SEAL = 'SEAL'
}

export interface IPosition {
  x: number;
  y: number;
  width?: number;
  height?: number;
  pageNumber: number;
}

export interface IDocumentField {
  id: string;
  type: FieldType;
  position: IPosition;
  recipientId?: string; // assigned to a Recipient
  required: boolean;
  value?: string; // populated after signing
}

export interface IDocument {
  id: string;
  title: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  completedAt?: string;
  fileUrl: string; // url to the original PDF
  authorId: string;
  fields: IDocumentField[];
  recipients: string[]; // recipient IDs
}
