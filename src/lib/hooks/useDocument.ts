import { useQuery } from '@tanstack/react-query';
import type { IDocument } from '@/types/document.types';
import { MOCK_DOCUMENTS } from '../mock-data/documents.mock';

export const useDocument = (id: string) =>
  useQuery<IDocument | undefined>({
    queryKey: ['document', id],
    queryFn: () =>
      new Promise<IDocument | undefined>((resolve) =>
        setTimeout(() => resolve(MOCK_DOCUMENTS.find((d) => d.id === id)), 300)
      ),
    enabled: !!id,
  });
