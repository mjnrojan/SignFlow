import { type IRecipient, RecipientRole, RecipientStatus } from '@/types/recipient.types';

export const MOCK_RECIPIENTS: IRecipient[] = [
  {
    id: 'rec_1',
    name: 'Bikash Tamang',
    email: 'bikash.tamang@gmail.com',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.WAITING,
    order: 1,
    color: '#E8760A'
  },
  {
    id: 'rec_2',
    name: 'Sushma Karki',
    email: 'sushma.karki@ncell.com.np',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.NOTIFIED,
    order: 2,
    color: '#1A3D2B'
  },
  {
    id: 'rec_3',
    name: 'Nabin Shrestha',
    email: 'nabin.shrestha@techpatan.com',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.SIGNED,
    order: 1,
    color: '#0284c7'
  },
  {
    id: 'rec_4',
    name: 'Rajendra Thapa',
    email: 'rajendra@himalcloud.com.np',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.VIEWED,
    order: 1,
    color: '#7c3aed'
  },
  {
    id: 'rec_5',
    name: 'Dr. Meena Acharya',
    email: 'meena.acharya@ingo-nepal.org',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.SIGNED,
    order: 1,
    color: '#E8760A'
  },
  {
    id: 'rec_6',
    name: 'David Henderson',
    email: 'david.h@globalpartners.org',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.SIGNED,
    order: 2,
    color: '#0284c7'
  },
  {
    id: 'rec_7',
    name: 'Ankit Basnet',
    email: 'ankit.basnet@freelance.com',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.WAITING,
    order: 1,
    color: '#dc2626'
  },
  {
    id: 'rec_8',
    name: 'Sunita Gurung',
    email: 'sunita.gurung@realty.com.np',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.NOTIFIED,
    order: 1,
    color: '#059669'
  },
  {
    id: 'rec_9',
    name: 'Priya Maharjan',
    email: 'priya.maharjan@personal.com',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.SIGNED,
    order: 1,
    color: '#E8760A'
  },
  {
    id: 'rec_10',
    name: 'Krishna Bahadur KC',
    email: 'krishna.kc@construction.com.np',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.DECLINED,
    order: 1,
    color: '#dc2626'
  },
  {
    id: 'rec_11',
    name: 'Ramesh Pandey',
    email: 'ramesh@byteworks.com.np',
    role: RecipientRole.APPROVER,
    status: RecipientStatus.WAITING,
    order: 1,
    color: '#7c3aed'
  },
  {
    id: 'rec_12',
    name: 'Dipesh Adhikari',
    email: 'dipesh.adhikari@tu.edu.np',
    role: RecipientRole.SIGNER,
    status: RecipientStatus.NOTIFIED,
    order: 1,
    color: '#059669'
  }
];
