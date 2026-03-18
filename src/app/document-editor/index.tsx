import { useState, useEffect } from 'react';
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
import { useUserStore } from '@/lib/stores/useUserStore';
import { FieldType } from '@/types/document.types';
import { useTranslation } from 'react-i18next';
import { EditorSkeleton } from '@/components/shared/EditorSkeleton';
import { SignatureModal } from '@/components/signature/SignatureModal';

export default function DocumentEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { activeDocument, setActiveDocument, addField, removeField, updateField } = useDocumentStore();
  const { user } = useUserStore();
  
  const [activeFieldId, setActiveFieldId] = useState<string | null>(null);
  const [activeDragType, setActiveDragType] = useState<FieldType | null>(null);
  const [selectedRecipientId, setSelectedRecipientId] = useState<string | null>('rec_1');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulated loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectField = (id: string, forceOpenModal = false) => {
    const field = activeDocument?.fields.find(f => f.id === id);
    
    if (forceOpenModal && field && (field.type === FieldType.SIGNATURE || field.type === FieldType.SEAL)) {
      setIsModalOpen(true);
    }
    
    setActiveFieldId(id);
  };

  // Initialize sensors for dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Load document
  useEffect(() => {
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
      
      const pageRect = over.rect;
      const activeRect = active.rect.current.translated;

      if (activeRect && pageRect) {
        // Use center of the dragged item for placement
        const centerX = activeRect.left + activeRect.width / 2;
        const centerY = activeRect.top + activeRect.height / 2;

        const pixelX = centerX - pageRect.left;
        const pixelY = centerY - pageRect.top;
        
        // Convert to percentages (0-1) for persistence
        const x = Math.max(0, Math.min(1, pixelX / pageRect.width));
        const y = Math.max(0, Math.min(1, pixelY / pageRect.height));
        
        const newField = {
          id: `field-${Date.now()}`,
          type: type || FieldType.SIGNATURE,
          position: { 
            x: x - 0.075, // Adjust by half of default width (0.15/2) to center it
            y: y - 0.04,  // Adjust by half of default height (0.08/2) to center it
            width: 0.15,
            height: 0.08,
            pageNumber 
          },
          required: true,
          recipientId: selectedRecipientId || undefined
        };
        
        // Ensure bounds
        newField.position.x = Math.max(0, Math.min(0.85, newField.position.x));
        newField.position.y = Math.max(0, Math.min(0.92, newField.position.y));

        addField(newField);
        setActiveFieldId(newField.id);
      }
    }
  };

  const currentField = activeDocument?.fields.find(f => f.id === activeFieldId) || null;

  if (isLoading || !activeDocument) {
    return <EditorSkeleton />;
  }

  return (
    <DndContext 
      sensors={sensors} 
      onDragStart={handleDragStart} 
      onDragEnd={handleDragEnd}
    >
      <EditorLayout 
        documentTitle={activeDocument.title}
        onSave={() => alert(t('editor.savedSuccess'))}
        onSend={() => navigate(`/documents/${activeDocument.id}/send`)}
      >
        {/* Left Sidebar: Fields */}
        <FieldToolbar 
          selectedRecipientId={selectedRecipientId}
          onSelectRecipient={setSelectedRecipientId}
        />

        {/* Center: Canvas */}
        <div className="flex-1 overflow-hidden relative bg-muted/20">
          <CanvasContainer 
            fileUrl={activeDocument.fileUrl}
            fields={activeDocument.fields}
            activeFieldId={activeFieldId}
            onSelectField={handleSelectField}
            onRemoveField={removeField}
            onUpdateField={updateField}
          />
        </div>

        {/* Right Sidebar: Properties */}
        <PropertiesPanel 
          activeField={currentField}
          recipientId={currentField?.recipientId || selectedRecipientId}
          onUpdate={updateField}
          onRemove={removeField}
        />
      </EditorLayout>

      {/* Signature Modal for Signing Fields */}
      {currentField && (currentField.type === FieldType.SIGNATURE || currentField.type === FieldType.SEAL) && (
        <SignatureModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={(dataUrl: string) => {
            const targetId = activeFieldId || currentField.id;
            console.log(`[SignFlow] Adopting sign for field: ${targetId}, Data: ${dataUrl.substring(0, 50)}...`);
            
            if (targetId) {
              // FOR DEBUGGING: Show alert to confirm code reachability
              // alert(`Signature captured for ${targetId}. Applying...`);
              
              updateField(targetId, { value: dataUrl });
              
              // Ensure we close the modal after a small delay
              setTimeout(() => {
                setIsModalOpen(false);
                console.log('[SignFlow] Modal closed.');
              }, 100);
            } else {
              console.error('[SignFlow] No active field ID found for adoption');
              setIsModalOpen(false);
            }
          }}
          type={currentField.type === FieldType.SEAL ? 'seal' : 'signature'}
          defaultName={user?.name || t('common.yourName')}
        />
      )}

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
          <div className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl shadow-2xl flex items-center gap-3 opacity-90 scale-105 rotate-[-4deg]">
             {getIconForType(activeDragType)}
             <span className="text-xs uppercase tracking-widest">{t(`editor.fields.${activeDragType.toLowerCase()}`)}</span>
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
