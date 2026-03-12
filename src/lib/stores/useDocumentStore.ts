import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type IDocument, type IDocumentField, type DocumentStatus } from '@/types/document.types';
import { MOCK_DOCUMENTS } from '../mock-data/documents.mock';

interface DocumentState {
  documents: IDocument[];
  activeDocument: IDocument | null;
  setActiveDocument: (id: string | null) => void;
  addField: (field: IDocumentField) => void;
  removeField: (fieldId: string) => void;
  updateFieldPosition: (fieldId: string, x: number, y: number, pageNumber: number) => void;
  updateDocumentStatus: (documentId: string, status: DocumentStatus) => void;
}

export const useDocumentStore = create<DocumentState>()(
  immer((set) => ({
    documents: MOCK_DOCUMENTS,
    activeDocument: null,
    setActiveDocument: (id) =>
      set((state) => {
        if (!id) {
          state.activeDocument = null;
        } else {
          // Find document in list or return null
          const found = state.documents.find((d) => d.id === id);
          state.activeDocument = found ? { ...found } : null; // Copy correctly to avoid referential bleeding, or just assign it directly in immer if it allows nested mutability proxy? Immer allows direct assignment of proxy or clone.
          if (found) {
            state.activeDocument = found; // Standard immer assignment
          }
        }
      }),
    addField: (field) =>
      set((state) => {
        if (state.activeDocument) {
          state.activeDocument.fields.push(field);
          // Sync to master list
          const docIndex = state.documents.findIndex((d) => d.id === state.activeDocument!.id);
          if (docIndex !== -1) {
            state.documents[docIndex].fields.push(field);
          }
        }
      }),
    removeField: (fieldId) =>
      set((state) => {
        if (state.activeDocument) {
          state.activeDocument.fields = state.activeDocument.fields.filter(f => f.id !== fieldId);
          // Sync to master list
          const docIndex = state.documents.findIndex((d) => d.id === state.activeDocument!.id);
          if (docIndex !== -1) {
            state.documents[docIndex].fields = state.documents[docIndex].fields.filter(f => f.id !== fieldId);
          }
        }
      }),
    updateFieldPosition: (fieldId, x, y, pageNumber) =>
      set((state) => {
        if (state.activeDocument) {
          const field = state.activeDocument.fields.find(f => f.id === fieldId);
          if (field) {
            field.position.x = x;
            field.position.y = y;
            field.position.pageNumber = pageNumber;
          }
          // Sync
          const docIndex = state.documents.findIndex((d) => d.id === state.activeDocument!.id);
          if (docIndex !== -1) {
            const listField = state.documents[docIndex].fields.find(f => f.id === fieldId);
            if (listField) {
              listField.position.x = x;
              listField.position.y = y;
              listField.position.pageNumber = pageNumber;
            }
          }
        }
      }),
    updateDocumentStatus: (documentId, status) =>
      set((state) => {
        const docIndex = state.documents.findIndex(d => d.id === documentId);
        if (docIndex !== -1) {
          state.documents[docIndex].status = status;
          if (state.activeDocument?.id === documentId) {
            state.activeDocument.status = status;
          }
        }
      }),
  }))
);
