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
  updateField: (fieldId: string, updates: Partial<IDocumentField>) => void;
  updateDocumentStatus: (documentId: string, status: DocumentStatus) => void;
  addDocument: (document: IDocument) => void;
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
    updateField: (fieldId, updates) =>
      set((state) => {
        const activeDoc = state.activeDocument;
        if (!activeDoc) return;

        // 1. Update in activeDocument
        const fieldIndex = activeDoc.fields.findIndex(f => f.id === fieldId);
        if (fieldIndex !== -1) {
          const oldField = activeDoc.fields[fieldIndex];
          // Create a completely new object to force reactivity
          activeDoc.fields[fieldIndex] = { 
            ...oldField, 
            ...updates,
            position: updates.position 
              ? { ...oldField.position, ...updates.position } 
              : oldField.position
          };
        }
        
        // 2. Double check sync with the master documents list
        const docIndex = state.documents.findIndex(d => d.id === activeDoc.id);
        if (docIndex !== -1) {
          const listDoc = state.documents[docIndex];
          const listFieldIndex = listDoc.fields.findIndex(f => f.id === fieldId);
          if (listFieldIndex !== -1) {
            const listField = listDoc.fields[listFieldIndex];
            if (updates.value !== undefined) {
               console.log(`[Store] Updating field ${fieldId} with value (len: ${updates.value.length})`);
               listField.value = updates.value;
            }
            if (updates.recipientId !== undefined) listField.recipientId = updates.recipientId;
            if (updates.position) {
              listField.position = { ...listField.position, ...updates.position };
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
    addDocument: (document) =>
      set((state) => {
        state.documents.unshift(document);
      }),
  }))
);
