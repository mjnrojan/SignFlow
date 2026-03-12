import type { ITemplate } from '@/types/template.types';

export const MOCK_TEMPLATES: ITemplate[] = [
  {
    id: 'tpl_1',
    name: 'Standard Rental Agreement',
    description: 'Standard 11-month rental agreement for commercial and residential properties in Nepal. Includes landlord/tenant clauses per Nepal Rent Act.',
    thumbnailUrl: 'https://placehold.co/400x500/1A3D2B/ffffff?text=Rental+Agreement',
    fileUrl: '/mock-pdfs/sample.pdf',
    category: 'Real Estate'
  },
  {
    id: 'tpl_2',
    name: 'Employment Offer Letter',
    description: 'Standard offer letter including probation period, benefits, CIT/PF, and gratuity as per Nepal Labour Act 2074.',
    thumbnailUrl: 'https://placehold.co/400x500/E8760A/ffffff?text=Offer+Letter',
    fileUrl: '/mock-pdfs/sample.pdf',
    category: 'Human Resources'
  },
  {
    id: 'tpl_3',
    name: 'Non-Disclosure Agreement (NDA)',
    description: 'Mutual NDA for protecting confidential business information between two parties operating in Nepal.',
    thumbnailUrl: 'https://placehold.co/400x500/0284c7/ffffff?text=NDA',
    fileUrl: '/mock-pdfs/sample.pdf',
    category: 'Legal'
  },
  {
    id: 'tpl_4',
    name: 'Consultancy Agreement',
    description: 'Independent consultant engagement contract with scope of work, deliverables, payment terms in NPR, and IP clauses.',
    thumbnailUrl: 'https://placehold.co/400x500/7c3aed/ffffff?text=Consultancy',
    fileUrl: '/mock-pdfs/sample.pdf',
    category: 'Professional Services'
  },
  {
    id: 'tpl_5',
    name: 'Vendor Service Level Agreement',
    description: 'SLA template for IT vendors and service providers. Includes uptime guarantees, penalty clauses, and support hours.',
    thumbnailUrl: 'https://placehold.co/400x500/059669/ffffff?text=Vendor+SLA',
    fileUrl: '/mock-pdfs/sample.pdf',
    category: 'Vendor Management'
  },
  {
    id: 'tpl_6',
    name: 'NGO Memorandum of Understanding',
    description: 'MoU template for partnerships between INGOs, local NGOs, and government bodies in Nepal. Bilingual EN/NP format.',
    thumbnailUrl: 'https://placehold.co/400x500/dc2626/ffffff?text=NGO+MoU',
    fileUrl: '/mock-pdfs/sample.pdf',
    category: 'Non-Profit'
  },
  {
    id: 'tpl_7',
    name: 'Internship Agreement',
    description: 'University internship placement contract. Covers duration, stipend, learning objectives, and supervisor assignment.',
    thumbnailUrl: 'https://placehold.co/400x500/d97706/ffffff?text=Internship',
    fileUrl: '/mock-pdfs/sample.pdf',
    category: 'Education'
  },
  {
    id: 'tpl_8',
    name: 'Property Sale Deed (Jagga Bikri)',
    description: 'Land and property sale agreement template as per Nepal Land Revenue regulations. Requires dual signatures and company seal.',
    thumbnailUrl: 'https://placehold.co/400x500/1A3D2B/ffffff?text=Sale+Deed',
    fileUrl: '/mock-pdfs/sample.pdf',
    category: 'Real Estate'
  }
];
