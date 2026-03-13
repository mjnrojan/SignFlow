import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTemplateStore } from '@/lib/stores/useTemplateStore';
import { useDocumentStore } from '@/lib/stores/useDocumentStore';
import { 
  UploadCloud, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';


export default function DocumentUploadPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template');
  const { getTemplateById } = useTemplateStore();
  const { addDocument } = useDocumentStore();
  
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  useEffect(() => {
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        setTitle(template.name);
        // Simulate a dummy file for the template
        const dummyFile = new File([""], "template.pdf", { type: "application/pdf" });
        setFile(dummyFile);
      }
    }
  }, [templateId, getTemplateById]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.includes('word'))) {
      setFile(droppedFile);
      if (!title) setTitle(droppedFile.name.split('.')[0]);
    }
  }, [title]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) setTitle(selectedFile.name.split('.')[0]);
    }
  };

  const handleUpload = () => {
    if (!file || !title) return;

    setIsUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          const newId = `doc_${Math.random().toString(36).substr(2, 9)}`;
          // In a real app, we'd add to store here
          addDocument({
            id: newId,
            title,
            status: 'DRAFT' as any,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            fileUrl: '/mock-pdfs/sample.pdf',
            authorId: 'user_1',
            recipients: [],
            fields: []
          });
          navigate(`/documents/${newId}/edit`);
        }, 800);
      }
      setUploadProgress(progress);
    }, 200);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold font-['Fraunces'] tracking-tight">Upload Your Document</h1>
        <p className="text-muted-foreground font-['Syne'] max-w-xl mx-auto">
          Securely upload your agreements, contracts, or letters to start the digital signing workflow in Nepal.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Upload Column */}
        <div className="lg:col-span-2 space-y-6">
          <div 
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`
              relative border-2 border-dashed rounded-[2rem] p-12 transition-all duration-300 flex flex-col items-center justify-center text-center
              ${isDragOver ? 'border-primary bg-primary/5 scale-[1.01]' : 'border-border bg-card hover:border-primary/50'}
              ${file ? 'border-primary/50 bg-primary/5' : ''}
              min-h-[400px]
            `}
          >
            {isUploading ? (
              <div className="w-full max-w-md space-y-8 py-10">
                <div className="relative size-24 mx-auto">
                   <div className="absolute inset-0 rounded-full border-4 border-primary/10"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                   <div className="absolute inset-0 flex items-center justify-center text-primary font-bold">{Math.round(uploadProgress)}%</div>
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-bold font-['Fraunces']">Encrypting & Uploading</h3>
                   <p className="text-sm text-muted-foreground font-['Syne'] italic">Hashing on local servers for Nepal legal compliance...</p>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-primary transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : file ? (
              <div className="space-y-6 animate-in zoom-in-95 duration-300">
                <div className="size-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-primary/20">
                  <FileText className="size-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-['Fraunces'] truncate max-w-md">{file.name}</h3>
                  <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest mt-1">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready
                  </p>
                </div>
                <button 
                  onClick={() => setFile(null)}
                  className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 px-4 py-2 rounded-full transition-colors flex items-center gap-2 mx-auto"
                >
                  <X className="size-3" /> Remove File
                </button>
              </div>
            ) : (
              <>
                <div className="size-24 bg-muted rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner">
                  <UploadCloud className="size-10 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold font-['Fraunces']">Drag and drop files here</p>
                    <p className="text-muted-foreground font-['Syne']">PDF or Microsoft Word (.docx) only</p>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 bg-border"></div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">OR</span>
                    <div className="h-px w-12 bg-border"></div>
                  </div>
                  <label className="inline-block cursor-pointer px-8 py-3 bg-secondary hover:bg-secondary/90 text-white rounded-xl font-bold text-sm shadow-xl shadow-secondary/20 transition-all active:scale-95 font-['Syne']">
                    Browse Local Files
                    <input type="file" className="hidden" accept=".pdf,.docx" onChange={handleFileChange} />
                  </label>
                </div>
              </>
            )}
            
            {/* Background elements */}
            <div className="absolute top-4 right-4 text-[10px] font-bold text-muted-foreground tracking-widest uppercase opacity-20">Secure Uplink</div>
            <div className="absolute bottom-4 left-4 flex gap-1 opacity-20">
               <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
               <div className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
               <div className="size-2 bg-primary rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Form details */}
          <div className={`space-y-6 transition-opacity duration-500 ${!file || isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
             <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 font-['Syne']">Provide a Document Title</label>
                <div className="relative">
                  <FileText className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="e.g. Sales Agreement - Kathmandu Branch"
                    className="w-full bg-muted/50 border border-transparent focus:border-primary/20 focus:bg-background rounded-xl pl-12 pr-4 py-4 text-lg font-bold outline-none transition-all font-['Fraunces'] placeholder:text-muted-foreground/50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
             </div>

             <button 
                disabled={!file || !title || isUploading}
                onClick={handleUpload}
                className="w-full py-5 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-50 disabled:scale-100 group"
             >
                <Zap className="size-6 text-yellow-400 fill-current" />
                <span className="font-['Syne']">Initialize Document Flow</span>
                <ArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
             </button>
          </div>
        </div>

        {/* Sidebar Features */}
        <div className="space-y-6">
           <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-lg font-['Fraunces']">Security First</h3>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <ShieldCheck className="size-5 text-primary shrink-0" />
                    <div>
                      <p className="text-sm font-bold">AES-256 Encryption</p>
                      <p className="text-[11px] text-muted-foreground">Local encryption ensures your data never leaves the territory unauthorized.</p>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <CheckCircle2 className="size-5 text-secondary shrink-0" />
                    <div>
                      <p className="text-sm font-bold">Legal Compliance</p>
                      <p className="text-[11px] text-muted-foreground">Certified compliance with Nepal's Digital Signature Act 2063.</p>
                    </div>
                 </div>
                 <div className="flex gap-3">
                    <FileCheck className="size-5 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold">SHA-512 Hashing</p>
                      <p className="text-[11px] text-muted-foreground">Permanent tamper-evident seal on every file uploaded.</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 relative overflow-hidden group">
              <div className="relative z-10 space-y-3">
                 <p className="text-xs font-bold text-primary uppercase tracking-widest">Pro Tip</p>
                 <h4 className="font-bold font-['Fraunces']">Need multiple signers?</h4>
                 <p className="text-xs text-muted-foreground font-['Syne'] leading-relaxed">
                   You can add up to 15 recipients for parallel or sequential signing once the document is uploaded.
                 </p>
              </div>
              <UploadCloud className="absolute -bottom-4 -right-4 size-24 text-primary opacity-5 transform group-hover:rotate-12 transition-transform" />
           </div>

           <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3 text-amber-800">
              <AlertCircle className="size-5 shrink-0" />
              <p className="text-[10px] font-medium font-['Syne'] leading-tight">
                Maximum file size is 25MB. Contact support for high-volume enterprise uploads.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
