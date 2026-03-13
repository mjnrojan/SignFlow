import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { ITemplate } from '@/types/template.types';
import { MOCK_TEMPLATES } from '../mock-data/templates.mock';

interface TemplateState {
  templates: ITemplate[];
  categories: string[];
  isLoading: boolean;
  getTemplateById: (id: string) => ITemplate | undefined;
}

export const useTemplateStore = create<TemplateState>()(
  immer((_set, get) => ({
    templates: MOCK_TEMPLATES,
    categories: Array.from(new Set(MOCK_TEMPLATES.map(t => t.category))),
    isLoading: false,
    getTemplateById: (id) => {
      return get().templates.find((t) => t.id === id);
    },
  }))
);
