import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type IRecipient } from '@/types/recipient.types';
import { MOCK_RECIPIENTS } from '../mock-data/recipients.mock';

interface RecipientState {
  recipients: IRecipient[];
  addRecipient: (recipient: IRecipient) => void;
  updateRecipient: (id: string, updates: Partial<IRecipient>) => void;
  removeRecipient: (id: string) => void;
  getRecipientById: (id: string) => IRecipient | undefined;
}

export const useRecipientStore = create<RecipientState>()(
  immer((set, get) => ({
    recipients: MOCK_RECIPIENTS,
    addRecipient: (recipient) =>
      set((state) => {
        state.recipients.push(recipient);
      }),
    updateRecipient: (id, updates) =>
      set((state) => {
        const index = state.recipients.findIndex((r) => r.id === id);
        if (index !== -1) {
          state.recipients[index] = { ...state.recipients[index], ...updates };
        }
      }),
    removeRecipient: (id) =>
      set((state) => {
        state.recipients = state.recipients.filter((r) => r.id !== id);
      }),
    getRecipientById: (id) => {
      return get().recipients.find((r) => r.id === id);
    },
  }))
);
