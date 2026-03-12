export enum RecipientStatus {
  WAITING = 'WAITING',
  NOTIFIED = 'NOTIFIED',
  VIEWED = 'VIEWED',
  SIGNED = 'SIGNED',
  DECLINED = 'DECLINED'
}

export enum RecipientRole {
  SIGNER = 'SIGNER',
  CC = 'CC',
  APPROVER = 'APPROVER'
}

export interface IRecipient {
  id: string;
  name: string;
  email: string;
  role: RecipientRole;
  status: RecipientStatus;
  order: number; // For sequential signing
  color: string; // Used to color-code fields to recipients
  message?: string;
}
