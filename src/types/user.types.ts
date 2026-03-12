export interface IUser {
  id: string;
  name: string;
  email: string;
  companyName?: string;
  avatarUrl?: string;
  signatureBase64?: string;
  sealBase64?: string;
}
