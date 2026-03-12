import { useQuery } from '@tanstack/react-query';
import type { IDocument } from '@/types/document.types';
import { MOCK_DOCUMENTS } from '../mock-data/documents.mock';

export const useDocuments = () =>
  useQuery<IDocument[]>({
    queryKey: ['documents'],
    queryFn: () =>
      new Promise<IDocument[]>((resolve) =>
        setTimeout(() => resolve(MOCK_DOCUMENTS), 300)
      ),
  });
