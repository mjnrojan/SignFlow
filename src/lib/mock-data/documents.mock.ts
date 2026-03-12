import { type IDocument, DocumentStatus, FieldType } from '@/types/document.types';

export const MOCK_DOCUMENTS: IDocument[] = [
  {
    id: 'doc_1',
    title: 'Kathmandu Office Lease Agreement',
    status: DocumentStatus.SENT,
    createdAt: '2026-03-01T10:00:00Z',
    updatedAt: '2026-03-02T10:00:00Z',
    sentAt: '2026-03-02T10:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_1',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 500, width: 200, height: 60, pageNumber: 1 },
        recipientId: 'rec_1',
        required: true,
      },
      {
        id: 'fld_2',
        type: FieldType.DATE,
        position: { x: 350, y: 510, width: 150, height: 30, pageNumber: 1 },
        recipientId: 'rec_1',
        required: true,
      },
      {
        id: 'fld_3',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 600, width: 200, height: 60, pageNumber: 1 },
        recipientId: 'rec_2',
        required: true,
      }
    ],
    recipients: ['rec_1', 'rec_2']
  },
  {
    id: 'doc_2',
    title: 'Consultancy Contract - TechPatan',
    status: DocumentStatus.COMPLETED,
    createdAt: '2026-02-15T14:30:00Z',
    updatedAt: '2026-02-20T11:00:00Z',
    sentAt: '2026-02-16T09:00:00Z',
    completedAt: '2026-02-20T11:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_4',
        type: FieldType.SIGNATURE,
        position: { x: 120, y: 680, width: 200, height: 60, pageNumber: 2 },
        recipientId: 'rec_3',
        required: true,
        value: 'data:image/png;base64,MOCK_SIGNATURE_DATA',
      }
    ],
    recipients: ['rec_3']
  },
  {
    id: 'doc_3',
    title: 'Employee NDA - Sita Rai',
    status: DocumentStatus.DRAFT,
    createdAt: '2026-03-09T16:45:00Z',
    updatedAt: '2026-03-09T16:45:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [],
    recipients: []
  },
  {
    id: 'doc_4',
    title: 'Vendor SLA - HimalCloud Pvt. Ltd.',
    status: DocumentStatus.SENT,
    createdAt: '2026-02-28T08:15:00Z',
    updatedAt: '2026-03-01T09:00:00Z',
    sentAt: '2026-03-01T09:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_5',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 720, width: 200, height: 60, pageNumber: 3 },
        recipientId: 'rec_4',
        required: true,
      },
      {
        id: 'fld_6',
        type: FieldType.SEAL,
        position: { x: 350, y: 700, width: 100, height: 100, pageNumber: 3 },
        recipientId: 'rec_4',
        required: true,
      }
    ],
    recipients: ['rec_4']
  },
  {
    id: 'doc_5',
    title: 'NGO MoU - INGO Partnership Agreement',
    status: DocumentStatus.COMPLETED,
    createdAt: '2026-01-20T11:00:00Z',
    updatedAt: '2026-02-05T15:30:00Z',
    sentAt: '2026-01-21T09:00:00Z',
    completedAt: '2026-02-05T15:30:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_7',
        type: FieldType.SIGNATURE,
        position: { x: 80, y: 650, width: 200, height: 60, pageNumber: 4 },
        recipientId: 'rec_5',
        required: true,
        value: 'data:image/png;base64,MOCK_SIGNATURE_DATA_5',
      },
      {
        id: 'fld_8',
        type: FieldType.SIGNATURE,
        position: { x: 320, y: 650, width: 200, height: 60, pageNumber: 4 },
        recipientId: 'rec_6',
        required: true,
        value: 'data:image/png;base64,MOCK_SIGNATURE_DATA_6',
      }
    ],
    recipients: ['rec_5', 'rec_6']
  },
  {
    id: 'doc_6',
    title: 'Freelance Design Contract - Ankit Basnet',
    status: DocumentStatus.EXPIRED,
    createdAt: '2026-01-05T10:00:00Z',
    updatedAt: '2026-02-05T00:00:00Z',
    sentAt: '2026-01-06T09:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_9',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 500, width: 200, height: 60, pageNumber: 1 },
        recipientId: 'rec_7',
        required: true,
      }
    ],
    recipients: ['rec_7']
  },
  {
    id: 'doc_7',
    title: 'Pokhara Property Rental Deed',
    status: DocumentStatus.SENT,
    createdAt: '2026-03-05T14:00:00Z',
    updatedAt: '2026-03-06T10:00:00Z',
    sentAt: '2026-03-06T10:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_10',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 700, width: 200, height: 60, pageNumber: 2 },
        recipientId: 'rec_8',
        required: true,
      },
      {
        id: 'fld_11',
        type: FieldType.INITIALS,
        position: { x: 450, y: 300, width: 80, height: 40, pageNumber: 1 },
        recipientId: 'rec_8',
        required: true,
      },
      {
        id: 'fld_12',
        type: FieldType.TEXT,
        position: { x: 100, y: 200, width: 300, height: 30, pageNumber: 1 },
        recipientId: 'rec_8',
        required: false,
      }
    ],
    recipients: ['rec_8']
  },
  {
    id: 'doc_8',
    title: 'HR Offer Letter - Priya Maharjan',
    status: DocumentStatus.COMPLETED,
    createdAt: '2026-02-10T09:00:00Z',
    updatedAt: '2026-02-12T16:00:00Z',
    sentAt: '2026-02-10T10:00:00Z',
    completedAt: '2026-02-12T16:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_13',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 600, width: 200, height: 60, pageNumber: 1 },
        recipientId: 'rec_9',
        required: true,
        value: 'data:image/png;base64,MOCK_SIGNATURE_DATA_9',
      },
      {
        id: 'fld_14',
        type: FieldType.DATE,
        position: { x: 350, y: 610, width: 150, height: 30, pageNumber: 1 },
        recipientId: 'rec_9',
        required: true,
        value: '2026-02-12',
      }
    ],
    recipients: ['rec_9']
  },
  {
    id: 'doc_9',
    title: 'Construction Contract - Lalitpur Site',
    status: DocumentStatus.DECLINED,
    createdAt: '2026-02-25T13:00:00Z',
    updatedAt: '2026-03-02T08:00:00Z',
    sentAt: '2026-02-26T09:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_15',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 500, width: 200, height: 60, pageNumber: 1 },
        recipientId: 'rec_10',
        required: true,
      },
      {
        id: 'fld_16',
        type: FieldType.SEAL,
        position: { x: 350, y: 480, width: 100, height: 100, pageNumber: 1 },
        recipientId: 'rec_10',
        required: true,
      }
    ],
    recipients: ['rec_10']
  },
  {
    id: 'doc_10',
    title: 'Biratnagar Warehouse Lease',
    status: DocumentStatus.DRAFT,
    createdAt: '2026-03-10T07:00:00Z',
    updatedAt: '2026-03-10T07:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [],
    recipients: []
  },
  {
    id: 'doc_11',
    title: 'IT Support Agreement - ByteWorks Nepal',
    status: DocumentStatus.VOIDED,
    createdAt: '2026-01-15T11:00:00Z',
    updatedAt: '2026-02-01T14:00:00Z',
    sentAt: '2026-01-16T09:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_17',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 550, width: 200, height: 60, pageNumber: 1 },
        recipientId: 'rec_11',
        required: true,
      }
    ],
    recipients: ['rec_11']
  },
  {
    id: 'doc_12',
    title: 'Internship Agreement - Tribhuvan University',
    status: DocumentStatus.SENT,
    createdAt: '2026-03-08T12:00:00Z',
    updatedAt: '2026-03-09T08:00:00Z',
    sentAt: '2026-03-09T08:00:00Z',
    fileUrl: '/mock-pdfs/sample.pdf',
    authorId: 'usr_nepal_123',
    fields: [
      {
        id: 'fld_18',
        type: FieldType.SIGNATURE,
        position: { x: 100, y: 580, width: 200, height: 60, pageNumber: 1 },
        recipientId: 'rec_12',
        required: true,
      },
      {
        id: 'fld_19',
        type: FieldType.TEXT,
        position: { x: 100, y: 400, width: 300, height: 30, pageNumber: 1 },
        recipientId: 'rec_12',
        required: true,
      }
    ],
    recipients: ['rec_12']
  }
];
