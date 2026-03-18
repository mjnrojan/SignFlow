import { type IDocument, DocumentStatus, FieldType } from '@/types/document.types';

export const MOCK_DOCUMENTS: IDocument[] = [
  {
    id: 'doc_1',
    title: 'Work Project - Log Week 4',
    status: DocumentStatus.SENT,
    direction: 'sent',
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-02T10:00:00Z',
    sentAt: '2026-03-02T10:00:00Z',
    fileUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_1',
        type: FieldType.SIGNATURE,
        position: { x: 0.2, y: 0.6, width: 0.2, height: 0.08, pageNumber: 1 },
        recipientId: 'rec_1',
        required: true,
      },
      {
        id: 'fld_2',
        type: FieldType.DATE,
        position: { x: 0.5, y: 0.6, width: 0.15, height: 0.04, pageNumber: 1 },
        recipientId: 'rec_1',
        required: true,
      }
    ],
    recipients: ['rec_1', 'rec_2']
  },
  {
    id: 'doc_2',
    title: 'Consultancy Contract - TechPatan',
    status: DocumentStatus.COMPLETED,
    direction: 'sent',
    createdAt: '2026-02-15T14:30:00Z',
    updatedAt: '2026-02-20T11:00:00Z',
    sentAt: '2026-02-16T09:00:00Z',
    completedAt: '2026-02-20T11:00:00Z',
    fileUrl: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_4',
        type: FieldType.SIGNATURE,
        position: { x: 0.2, y: 0.7, width: 0.2, height: 0.08, pageNumber: 2 },
        recipientId: 'rec_3',
        required: true,
        value: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      }
    ],
    recipients: ['rec_3']
  },
  {
    id: 'doc_4',
    title: 'Vendor SLA - HimalCloud Pvt. Ltd.',
    status: DocumentStatus.SENT,
    direction: 'sent',
    createdAt: '2026-02-28T08:15:00Z',
    updatedAt: '2026-03-01T09:00:00Z',
    sentAt: '2026-03-01T09:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_5',
        type: FieldType.SIGNATURE,
        position: { x: 0.15, y: 0.75, width: 0.2, height: 0.08, pageNumber: 3 },
        recipientId: 'rec_4',
        required: true,
      },
      {
        id: 'fld_6',
        type: FieldType.SEAL,
        position: { x: 0.6, y: 0.7, width: 0.12, height: 0.12, pageNumber: 3 },
        recipientId: 'rec_4',
        required: true,
      }
    ],
    recipients: ['rec_4']
  },
  {
    id: 'doc_7',
    title: 'Pokhara Property Rental Deed',
    status: DocumentStatus.SENT,
    direction: 'sent',
    createdAt: '2026-03-05T14:00:00Z',
    updatedAt: '2026-03-06T10:00:00Z',
    sentAt: '2026-03-06T10:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_10',
        type: FieldType.SIGNATURE,
        position: { x: 0.15, y: 0.8, width: 0.2, height: 0.08, pageNumber: 1 },
        recipientId: 'rec_8',
        required: true,
      }
    ],
    recipients: ['rec_8']
  },
  {
    id: 'doc_101',
    title: 'Office Lease Agreement - YetiCorp',
    status: DocumentStatus.SENT,
    direction: 'received',
    createdAt: '2026-03-10T09:00:00Z',
    updatedAt: '2026-03-11T10:00:00Z',
    sentAt: '2026-03-11T10:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_other_1',
    fields: [
      {
        id: 'fld_101',
        type: FieldType.SIGNATURE,
        position: { x: 0.3, y: 0.8, width: 0.2, height: 0.08, pageNumber: 1 },
        recipientId: 'usr_nepal_123',
        required: true,
      }
    ],
    recipients: ['usr_nepal_123']
  },
  {
    id: 'doc_102',
    title: 'NDA - Mount Everest Tech',
    status: DocumentStatus.COMPLETED,
    direction: 'received',
    createdAt: '2026-01-10T11:00:00Z',
    updatedAt: '2026-01-12T15:00:00Z',
    sentAt: '2026-01-10T11:00:00Z',
    completedAt: '2026-01-12T15:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_other_2',
    fields: [
      {
        id: 'fld_102',
        type: FieldType.SIGNATURE,
        position: { x: 0.2, y: 0.8, width: 0.2, height: 0.08, pageNumber: 3 },
        recipientId: 'usr_nepal_123',
        required: true,
        value: 'data:image/png;base64,...',
      }
    ],
    recipients: ['usr_nepal_123']
  },
  {
    id: 'doc_103',
    title: 'Partnership Agreement - Kathmandu Travels',
    status: DocumentStatus.DRAFT,
    direction: 'received',
    createdAt: '2026-03-15T10:00:00Z',
    updatedAt: '2026-03-15T10:30:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_other_3',
    fields: [],
    recipients: ['usr_nepal_123']
  }
];
