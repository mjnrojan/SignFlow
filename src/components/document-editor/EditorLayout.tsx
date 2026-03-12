import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  HelpCircle, 
  Settings, 
  Monitor, 
  Save, 
  Send as SendIcon,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditorLayoutProps {
  children: React.ReactNode;
  documentTitle: string;
  onSave: () => void;
  onSend: () => void;
}

export function EditorLayout({ children, documentTitle, onSave, onSend }: EditorLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-muted/30 overflow-hidden">
      {/* Editor Top Bar */}
      <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-4 min-w-0">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors shrink-0"
            title="Back"
          >
            <ArrowLeft className="size-5" />
          </button>
          
          <div className="h-6 w-px bg-border"></div>
          
          <div className="flex flex-col min-w-0">
            <h1 className="text-sm font-bold text-foreground truncate font-['Fraunces']">{documentTitle}</h1>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-primary flex items-center gap-1">
                  <CheckCircle2 className="size-3" />
                  Saved to Kathmandu Node
               </span>
            </div>
          </div>
        </div>

        {/* View Controls & Settings */}
        <div className="hidden lg:flex items-center gap-4">
           <div className="flex bg-muted p-1 rounded-lg">
              <button className="px-3 py-1 text-xs font-bold text-primary bg-background rounded-md shadow-sm flex items-center gap-2">
                 <Monitor className="size-3.5" />
                 Desktop
              </button>
              <button className="px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">
                 Tablet
              </button>
           </div>
           
           <div className="h-6 w-px bg-border"></div>
           
           <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground" title="Help">
                 <HelpCircle className="size-5" />
              </button>
              <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground" title="Settings">
                 <Settings className="size-5" />
              </button>
           </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onSave}
            className="hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-muted border border-border rounded-xl text-sm font-bold transition-all font-['Syne'] active:scale-95"
          >
            <Save className="size-4" />
            <span>Save Draft</span>
          </button>
          
          <div className="flex items-center">
            <button 
              onClick={onSend}
              className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-l-xl font-bold text-sm shadow-lg shadow-primary/20 flex items-center gap-2 transition-all active:scale-95 font-['Syne']"
            >
              <SendIcon className="size-4" />
              <span>Review & Send</span>
            </button>
            <button className="px-2 py-2 bg-primary hover:bg-primary/90 text-white border-l border-white/20 rounded-r-xl transition-all">
               <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Editor Main Canvas (with sidebars) */}
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
}
