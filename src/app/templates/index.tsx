import { useState, useEffect } from 'react';
import { useTemplateStore } from '@/lib/stores/useTemplateStore';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  LayoutGrid, 
  List, 
  Plus, 
  Filter,
  FileText,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export default function TemplatesPage() {
  const { templates, categories } = useTemplateStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full space-y-6 pb-20">
        <div className="h-32 bg-muted animate-pulse rounded-[2.5rem] w-full" />
        <div className="h-16 bg-muted animate-pulse rounded-2xl w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {Array.from({ length: 8 }).map((_, i) => (
             <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm h-64">
                <div className="h-40 bg-muted animate-pulse" />
                <div className="p-4 space-y-2">
                   <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                   <div className="h-3 bg-muted animate-pulse rounded w-full" />
                </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? template.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handleUseTemplate = (templateId: string) => {
    // In demo, we'll navigate to editor with template context
    navigate(`/documents/new?template=${templateId}`);
  };

  return (
    <div className="flex flex-col min-h-full space-y-6 pb-20">
      <PageHeader 
        title={t('sidebar.templates')} 
        description="Jumpstart your document workflow with compliant templates."
        actions={
          <Button className="rounded-xl h-10 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            <Plus className="size-4 mr-2" />
            {t('dashboard.actions.newDocument')}
          </Button>
        }
      />

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-card border border-border p-4 rounded-2xl shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search patterns or template names..." 
            className="pl-10 h-10 rounded-xl bg-muted/20 border-border focus:bg-background transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide no-scrollbar">
           <Button 
            variant={selectedCategory === null ? 'default' : 'ghost'} 
            size="sm" 
            className="rounded-lg h-9 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
            onClick={() => setSelectedCategory(null)}
           >
            All
           </Button>
           {categories.map(category => (
             <Button 
              key={category}
              variant={selectedCategory === category ? 'default' : 'ghost'} 
              size="sm" 
              className="rounded-lg h-9 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap"
              onClick={() => setSelectedCategory(category)}
             >
              {category}
             </Button>
           ))}
        </div>

        <div className="h-6 w-px bg-border hidden md:block"></div>

        <div className="flex bg-muted p-1 rounded-lg shrink-0">
           <button 
            onClick={() => setViewMode('grid')}
            className={cn("p-1.5 rounded transition-all", viewMode === 'grid' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
           >
            <LayoutGrid className="size-4" />
           </button>
           <button 
            onClick={() => setViewMode('list')}
            className={cn("p-1.5 rounded transition-all", viewMode === 'list' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
           >
            <List className="size-4" />
           </button>
        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length > 0 ? (
        <div className={cn(
          "grid gap-6",
          viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" : "grid-cols-1"
        )}>
          {filteredTemplates.map((template, index) => (
            viewMode === 'grid' ? (
              <div 
                key={template.id} 
                className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="aspect-[4/3] relative bg-muted/30 overflow-hidden">
                   <img 
                    src={template.thumbnailUrl} 
                    alt={template.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        onClick={() => handleUseTemplate(template.id)}
                        className="w-full bg-white text-black hover:bg-white/90 font-bold h-10 rounded-xl active:scale-95 transition-all"
                      >
                        Use Template <ChevronRight className="size-4 ml-1" />
                      </Button>
                   </div>
                   <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm border border-border px-2 py-1 rounded-lg text-[8px] font-bold text-primary uppercase tracking-widest shadow-sm">
                      {template.category}
                   </div>
                   {index < 2 && (
                     <div className="absolute top-3 right-3 bg-forest text-white px-2 py-1 rounded-lg text-[8px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1">
                        <Sparkles className="size-2.5" /> Featured
                     </div>
                   )}
                </div>
                <div className="p-5 space-y-2">
                   <h3 className="font-bold text-foreground font-['Fraunces'] group-hover:text-primary transition-colors">{template.name}</h3>
                   <p className="text-xs text-muted-foreground font-['Syne'] line-clamp-2 leading-relaxed">
                      {template.description}
                   </p>
                   <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                         <FileText className="size-3" />
                         Standard Form
                      </div>
                      <ArrowRight className="size-4 text-primary group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            ) : (
              <div 
                key={template.id}
                className="bg-card border border-border hover:border-primary/30 rounded-2xl p-4 flex items-center gap-4 group transition-all animate-in fade-in slide-in-from-left-4"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="size-16 bg-muted/30 rounded-xl overflow-hidden shrink-0 border border-border">
                   <img src={template.thumbnailUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt={template.name} />
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-3">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors font-['Fraunces']">{template.name}</h3>
                      <span className="text-[8px] bg-muted px-2 py-0.5 rounded text-muted-foreground font-bold uppercase tracking-widest">{template.category}</span>
                   </div>
                   <p className="text-xs text-muted-foreground font-['Syne'] line-clamp-1 mt-1">{template.description}</p>
                </div>
                <Button 
                  onClick={() => handleUseTemplate(template.id)}
                  variant="outline" 
                  className="rounded-xl h-9 text-xs font-bold font-['Syne'] group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                >
                  Use Template
                </Button>
              </div>
            )
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center text-center p-8 bg-card border border-dashed border-border rounded-3xl animate-in zoom-in-95 duration-500">
           <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Filter className="size-8 text-muted-foreground opacity-20" />
           </div>
           <h3 className="text-lg font-bold font-['Fraunces']">No templates found</h3>
           <p className="text-sm text-muted-foreground max-w-sm mt-1">Try adjusting your filters or search query to find the perfect starting point.</p>
           <Button variant="link" className="mt-4" onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}>
              Reset All Filters
           </Button>
        </div>
      )}
    </div>
  );
}
