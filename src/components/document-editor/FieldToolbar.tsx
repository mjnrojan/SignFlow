import { 
  PenTool, 
  Hash, 
  Calendar, 
  Type, 
  User, 
  ChevronRight,
  ShieldCheck,
  Layers,
  Search,
  Users,
  Plus
} from 'lucide-react';
import { useState } from 'react';
import { FieldType } from '@/types/document.types';
import { useDraggable } from '@dnd-kit/core';
import { RecipientList } from './RecipientList';
import { useTranslation } from 'react-i18next';

interface DraggableFieldItemProps {
  type: FieldType;
  label: string;
  icon: React.ReactNode;
}

function DraggableFieldItem({ type, label, icon }: DraggableFieldItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `toolbar-${type}`,
    data: { type }
  });

  const style = isDragging ? {
    opacity: 0.3,
    cursor: 'grabbing'
  } : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        w-full flex items-center gap-3 p-3 text-sm font-semibold rounded-xl transition-all border shrink-0 
        ${isDragging ? 'bg-primary/5 border-primary shadow-lg ring-2 ring-primary/20 rotate-[-4deg]' : 'bg-card border-border hover:border-primary/50 hover:bg-accent/40 active:scale-95 group'}
      `}
    >
      <div className={`p-2 rounded-lg transition-colors ${isDragging ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground'}`}>
        {icon}
      </div>
      <div className="flex-1 text-left">
         <span className={`block leading-none ${isDragging ? 'text-primary font-bold' : 'text-foreground'}`}>{label}</span>
      </div>
      <ChevronRight className={`size-4 text-muted-foreground transition-transform group-hover:translate-x-1 ${isDragging ? 'hidden' : ''}`} />
    </button>
  );
}

interface FieldToolbarProps {
  selectedRecipientId: string | null;
  onSelectRecipient: (id: string) => void;
}

export function FieldToolbar({ selectedRecipientId, onSelectRecipient }: FieldToolbarProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'fields' | 'recipients'>('fields');
  
  const fields = [
    { type: FieldType.SIGNATURE, translationKey: 'editor.fields.signature', icon: <PenTool className="size-4" /> },
    { type: FieldType.INITIALS, translationKey: 'editor.fields.initials', icon: <Hash className="size-4" /> },
    { type: FieldType.DATE, translationKey: 'editor.fields.date', icon: <Calendar className="size-4" /> },
    { type: FieldType.TEXT, translationKey: 'editor.fields.text', icon: <Type className="size-4" /> },
    { type: FieldType.SEAL, translationKey: 'editor.fields.seal', icon: <ShieldCheck className="size-4" /> },
  ];

  return (
    <div className="w-72 bg-card border-r border-border h-full flex flex-col shrink-0 animate-in slide-in-from-left duration-500 z-20 overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-border bg-muted/30">
        <button 
          onClick={() => setActiveTab('fields')}
          className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex flex-col items-center gap-1 transition-all
            ${activeTab === 'fields' ? 'text-primary bg-background border-r border-border' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
        >
          <Layers className="size-4 md:mb-1" />
          <span>{t('editor.tabs.fields')}</span>
        </button>
        <button 
          onClick={() => setActiveTab('recipients')}
          className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex flex-col items-center gap-1 transition-all
            ${activeTab === 'recipients' ? 'text-primary bg-background border-l border-border' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
        >
          <Users className="size-4 md:mb-1" />
          <span>{t('editor.tabs.people')}</span>
        </button>
      </div>

      {activeTab === 'fields' ? (
        <>
          {/* Search Header */}
          <div className="p-6 pb-2 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-2 mb-2">
               <Layers className="size-4 text-primary" />
               <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-['Syne']">
                  {t('editor.fields.dragDrop')}
               </h3>
            </div>
            
            <div className="relative group grayscale focus-within:grayscale-0 transition-all opacity-50 focus-within:opacity-100">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
              <input 
                type="text" 
                placeholder={t('editor.searchPlaceholder')}
                disabled
                className="w-full bg-muted border border-border rounded-xl pl-9 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Field List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 custom-scrollbar animate-in fade-in duration-300">
            {fields.map((field) => (
              <DraggableFieldItem 
                key={field.type}
                type={field.type}
                label={t(field.translationKey)}
                icon={field.icon}
              />
            ))}

            {/* Dynamic / Advanced Fields Section Header */}
            <div className="pt-6 pb-2 border-t border-border mt-4">
               <div className="flex items-center gap-2 mb-4">
                  <User className="size-4 text-muted-foreground shrink-0" />
                  <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-['Syne']">
                     {t('editor.dynamicMetadata')}
                  </h3>
               </div>
               
               {/* Placeholder for future dynamic fields */}
               <div className="p-4 bg-muted/20 border border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-center space-y-2 group cursor-not-allowed">
                  <div className="size-8 bg-muted rounded-full flex items-center justify-center">
                     <Plus className="size-3 text-muted-foreground" />
                  </div>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-tighter">
                    {t('editor.enterpriseBlocked')}
                  </p>
               </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-muted/20 border-t border-border mt-auto">
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-xl relative overflow-hidden">
               <p className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tighter">DND Feature</p>
               <p className="text-[10px] text-muted-foreground font-['Syne'] leading-relaxed relative z-10">
                  {t('editor.dndInfo')}
               </p>
               <div className="absolute top-0 right-0 size-8 bg-primary/10 rounded-bl-3xl"></div>
            </div>
          </div>
        </>
      ) : (
        <RecipientList 
          selectedRecipientId={selectedRecipientId}
          onSelectRecipient={onSelectRecipient}
        />
      )}
    </div>
  );
}
