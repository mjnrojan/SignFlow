export enum SignatureMode {
  DRAW = 'DRAW',
  TYPE = 'TYPE',
  UPLOAD = 'UPLOAD'
}

export interface ISignatureData {
  base64: string;
  mode: SignatureMode;
  metadata?: {
    ipAddress?: string;
    userAgent?: string;
    timestamp?: string;
  };
}
