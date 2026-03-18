import { useState, useMemo } from 'react';
import { 
  Search, 
  MoreVertical, 
  Eye, 
  Trash2, 
  Plus, 
  Download, 
  FileText,
  ChevronDown,
  CheckSquare,
  Square,
  ArrowUpDown,
  Share2,
  Archive,
  FileEdit
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '@/lib/hooks/useDocuments';
import { DocumentStatus } from '@/types/document.types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { useTranslation } from 'react-i18next';

export default function DocumentsListPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: documents, isLoading } = useDocuments();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<DocumentStatus | 'ALL'>('ALL');
  const [directionFilter, setDirectionFilter] = useState<'ALL' | 'sent' | 'received'>('ALL');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  // Filter logic
  const filteredDocs = useMemo(() => {
    if (!documents) return [];
    return documents.filter((doc) => {
      const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || doc.status === statusFilter;
      const matchesDirection = directionFilter === 'ALL' || doc.direction === directionFilter;
      return matchesSearch && matchesStatus && matchesDirection;
    });
  }, [documents, searchTerm, statusFilter, directionFilter]);

  // Selection logic
  const toggleSelection = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const toggleAll = () => {
    if (selectedIds.size === filteredDocs.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredDocs.map((d) => d.id)));
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-end mb-4">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-muted animate-pulse rounded-lg"></div>
            <div className="h-4 w-64 bg-muted animate-pulse rounded-md"></div>
          </div>
          <div className="h-10 w-32 bg-muted animate-pulse rounded-lg"></div>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-['Fraunces'] text-foreground">{t('documents.title')}</h1>
          <p className="text-muted-foreground mt-1 font-['Syne'] tracking-wide">
            {t('documents.subtitle', { count: documents?.length || 0 })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/documents/upload')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="font-['Syne']">{t('documents.newDoc')}</span>
          </button>
        </div>
      </div>

      {/* Direction Tabs */}
      <div className="flex bg-muted/50 p-1.5 rounded-xl w-fit">
        {(['ALL', 'sent', 'received'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setDirectionFilter(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all capitalize ${
              directionFilter === tab 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab === 'ALL' ? 'All Documents' : tab}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-4 w-full">
          {/* Search */}
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder={t('documents.searchPlaceholder')}
              className="w-full bg-muted border border-transparent focus:border-primary/30 focus:bg-background rounded-xl pl-10 pr-4 py-2 text-sm outline-none transition-all font-['Syne']"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div className="relative group shrink-0">
            <select 
              className="appearance-none bg-muted border border-transparent hover:border-primary/20 rounded-xl pl-4 pr-10 py-2 text-sm outline-none cursor-pointer font-bold font-['Syne'] transition-all"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="ALL">{t('documents.filterAll')}</option>
              {Object.values(DocumentStatus).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Bulk Actions (Conditional) */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-2 p-1.5 bg-primary/10 rounded-xl border border-primary/20 animate-in zoom-in-95 duration-200">
            <span className="px-3 text-xs font-bold text-primary">{selectedIds.size} selected</span>
            <div className="w-px h-4 bg-primary/20 mx-1"></div>
            <button className="p-2 hover:bg-background rounded-lg text-primary transition-colors" title={t('common.download')}>
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-background rounded-lg text-primary transition-colors" title="Archive Selected">
              <Archive className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors" title={t('common.delete')}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Grid List (Table) */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1 custom-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted/30 text-muted-foreground text-[10px] uppercase tracking-widest font-bold border-b border-border">
                <th className="px-6 py-4 w-10">
                  <button onClick={toggleAll} className="block text-primary">
                    {selectedIds.size === filteredDocs.length && filteredDocs.length > 0 ? (
                      <CheckSquare className="w-5 h-5" />
                    ) : (
                      <Square className="w-5 h-5 text-muted-foreground/40" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors group">
                    {t('documents.table.document')} <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </th>
                <th className="px-6 py-4">{t('documents.table.recipients')}</th>
                <th className="px-6 py-4">{t('documents.table.status')}</th>
                <th className="px-6 py-4">{t('documents.table.created')}</th>
                <th className="px-6 py-4 text-right">{t('common.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredDocs.map((doc) => (
                <tr 
                  key={doc.id} 
                  className={`hover:bg-accent/30 transition-colors group ${selectedIds.has(doc.id) ? 'bg-primary/5' : ''}`}
                >
                  <td className="px-6 py-4">
                    <button onClick={() => toggleSelection(doc.id)} className="block">
                      {selectedIds.has(doc.id) ? (
                        <CheckSquare className="w-5 h-5 text-primary" />
                      ) : (
                        <Square className="w-5 h-5 text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-11 bg-destructive/5 border border-destructive/10 rounded-lg flex items-center justify-center shrink-0">
                         <FileText className="w-5 h-5 text-destructive/60" />
                      </div>
                      <div className="min-w-0">
                        <p 
                          onClick={() => navigate(`/documents/${doc.id}`)}
                          className="text-sm font-bold text-foreground truncate max-w-[240px] font-['Fraunces'] group-hover:text-primary transition-colors cursor-pointer"
                        >
                          {doc.title}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-md ${doc.direction === 'sent' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                            {doc.direction}
                          </span>
                          <p className="text-[10px] text-muted-foreground font-mono">ID: {doc.id.toUpperCase()}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-1.5 overflow-hidden">
                       <div className="size-7 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-primary">A</div>
                       <div className="size-7 rounded-full bg-secondary/20 border-2 border-background flex items-center justify-center text-[10px] font-bold text-secondary">B</div>
                       <div className="size-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-[10px] font-bold text-muted-foreground">+2</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={doc.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-foreground font-medium">{new Date(doc.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}</div>
                    <div className="text-[10px] text-muted-foreground">{new Date(doc.createdAt).getFullYear()}</div>
                  </td>
                  <td className="px-6 py-4 text-right relative">
                     <button 
                        onClick={() => setActiveMenu(activeMenu === doc.id ? null : doc.id)}
                        className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {activeMenu === doc.id && (
                        <>
                          <div className="fixed inset-0 z-30" onClick={() => setActiveMenu(null)}></div>
                          <div className="absolute right-6 top-12 w-56 bg-card border border-border rounded-2xl shadow-2xl py-2 z-40 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-2 border-b border-border/50 mb-1">
                               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{t('documents.menu.title')}</p>
                            </div>
                            <button 
                              onClick={() => { navigate(`/documents/${doc.id}`); setActiveMenu(null); }}
                              className="w-full px-4 py-2.5 text-sm text-foreground hover:bg-accent flex items-center gap-3 group"
                            >
                              <Eye className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /> 
                              <span className="font-['Syne'] font-medium">{t('documents.menu.viewDetails')}</span>
                            </button>
                            <button 
                              onClick={() => { navigate(`/documents/${doc.id}/edit`); setActiveMenu(null); }}
                              className="w-full px-4 py-2.5 text-sm text-foreground hover:bg-accent flex items-center gap-3 group"
                            >
                              <FileEdit className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /> 
                              <span className="font-['Syne'] font-medium">{t('documents.menu.editFields')}</span>
                            </button>
                            <button className="w-full px-4 py-2.5 text-sm text-foreground hover:bg-accent flex items-center gap-3 group">
                              <Share2 className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /> 
                              <span className="font-['Syne'] font-medium">{t('documents.menu.shareSend')}</span>
                            </button>
                            <button className="w-full px-4 py-2.5 text-sm text-foreground hover:bg-accent flex items-center gap-3 group">
                              <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /> 
                              <span className="font-['Syne'] font-medium">{t('documents.menu.downloadPdf')}</span>
                            </button>
                            <div className="h-px bg-border/50 my-1"></div>
                            <button className="w-full px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 flex items-center gap-3 group">
                              <Trash2 className="w-4 h-4 opacity-70 group-hover:opacity-100" /> 
                              <span className="font-['Syne'] font-medium">{t('documents.menu.deleteDoc')}</span>
                            </button>
                          </div>
                        </>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDocs.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
               <div className="bg-muted size-16 rounded-3xl flex items-center justify-center">
                  <Search className="size-8 text-muted-foreground" />
               </div>
               <div>
                  <p className="text-xl font-bold font-['Fraunces']">{t('documents.empty.title')}</p>
                  <p className="text-sm text-muted-foreground font-['Syne'] max-w-[280px]">{t('documents.empty.description')}</p>
               </div>
               <button 
                  onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); }}
                  className="text-primary font-bold text-sm hover:underline"
               >
                  {t('documents.empty.clear')}
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
