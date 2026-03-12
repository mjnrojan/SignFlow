import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  DndContext, 
  DragOverlay, 
  useSensor, 
  useSensors, 
  PointerSensor, 
  type DragEndEvent, 
  type DragStartEvent,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core';
import { 
  Loader2, 
  FileEdit,
  PenTool,
  Hash,
  Calendar,
  Type,
  ShieldCheck
} from 'lucide-react';
import { EditorLayout } from '@/components/document-editor/EditorLayout';
import { FieldToolbar } from '@/components/document-editor/FieldToolbar';
import { CanvasContainer } from '@/components/document-editor/CanvasContainer';
import { PropertiesPanel } from '@/components/document-editor/PropertiesPanel';
import { useDocumentStore } from '@/lib/stores/useDocumentStore';
import { FieldType } from '@/types/document.types';

export default function DocumentEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activeDocument, setActiveDocument, addField, removeField } = useDocumentStore();
  
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const [activeDragType, setActiveDragType] = useState<FieldType | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>('rec_1'); // Default to first mock recipient

  // Initialize sensors for dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Load document
  useMemo(() => {
    if (id) {
       setActiveDocument(id);
    }
  }, [id, setActiveDocument]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const type = active.data.current?.type as FieldType;
    if (type) {
       setActiveDragType(type);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragType(null);

    if (over && over.id.toString().startsWith('droppable-page-')) {
      const type = active.data.current?.type as FieldType;
      const pageNumber = over.data.current?.pageNumber as number;
      
      // Calculate relative coordinates
      // translated is the rect after transform
      const x = active.rect.current.translated 
        ? active.rect.current.translated.left - over.rect.left 
        : 0;
      const y = active.rect.current.translated 
        ? active.rect.current.translated.top - over.rect.top 
        : 0;
      
      const newField = {
        id: `field-${Date.now()}`,
        type: type || FieldType.SIGNATURE,
        position: { x, y, pageNumber },
        required: true,
        recipientId: selectedRecipientId || undefined
      };
      
      addField(newField);
      setActiveFieldId(newField.id);
    }
  };

  const handleUpdateField = (fieldId: string, updates: any) => {
     // In a real app we'd have a store action for this, for now let's assume it updates local state or we'd add it to store
     // Mock update for demo:
     console.log('Update field:', fieldId, updates);
  };

  const currentField = activeDocument?.fields.find(f => f.id === activeFieldId) || null;

  if (!activeDocument) {
    return (
      <div className="h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="size-10 animate-spin text-primary" />
        <p className="text-xl font-bold font-['Fraunces']">Initializing Editor...</p>
      </div>
    );
  }

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <EditorLayout 
        documentTitle={activeDocument.title}
        onSave={() => alert('Draft Saved Successfully!')}
        onSend={() => navigate(`/documents/${activeDocument.id}`)}
      >
        {/* Left Sidebar: Fields */}
        <FieldToolbar 
          selectedRecipientId={selectedRecipientId}
          onSelectRecipient={setSelectedRecipientId}
        />

        {/* Center: Canvas */}
        <div className="flex-1 overflow-hidden relative">
          <CanvasContainer 
            fileUrl={activeDocument.fileUrl}
            fields={activeDocument.fields}
            activeFieldId={activeFieldId}
            onSelectField={setActiveFieldId}
            onRemoveField={removeField}
          />
        </div>

        {/* Right Sidebar: Properties */}
        <PropertiesPanel 
          activeField={currentField}
          onUpdate={handleUpdateField}
          onRemove={removeField}
        />
      </EditorLayout>

      {/* Drag Overlay for smooth UI */}
      <DragOverlay dropAnimation={{
          sideEffects: defaultDropAnimationSideEffects({
            styles: {
              active: {
                opacity: '0.5',
              },
            },
          }),
        }}>
        {activeDragType ? (
          <div className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-2xl flex items-center gap-3 opacity-90 scale-105 rotate-[-4deg]">
             {getIconForType(activeDragType)}
             <span className="text-xs uppercase tracking-widest">{activeDragType}</span>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function getIconForType(type: FieldType) {
  switch(type) {
    case FieldType.SIGNATURE: return <PenTool className="size-4" />;
    case FieldType.INITIALS: return <Hash className="size-4" />;
    case FieldType.DATE: return <Calendar className="size-4" />;
    case FieldType.TEXT: return <Type className="size-4" />;
    case FieldType.SEAL: return <ShieldCheck className="size-4" />;
    default: return <FileEdit className="size-4" />;
  }
}
