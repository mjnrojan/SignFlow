import { useQuery } from '@tanstack/react-query';
import type { ITemplate } from '@/types/template.types';
import { MOCK_TEMPLATES } from '../mock-data/templates.mock';

export const useTemplates = () =>
  useQuery<ITemplate[]>({
    queryKey: ['templates'],
    queryFn: () =>
      new Promise<ITemplate[]>((resolve) =>
        setTimeout(() => resolve(MOCK_TEMPLATES), 300)
      ),
  });
