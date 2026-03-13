import { Link } from 'react-router-dom';
import { 
  PenTool, Globe, ChevronRight, FileText, UploadCloud, 
  CheckCircle, Star, PenLine, MousePointer2 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUIStore } from '@/lib/stores/useUIStore';

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const language = useUIStore((s) => s.language);
  const toggleLanguage = useUIStore((s) => s.toggleLanguage);

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'np' : 'en';
    toggleLanguage();
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md px-6 lg:px-20 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <PenTool className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold tracking-tight text-foreground font-['Fraunces']">SignFlow Nepal</h2>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold hover:text-primary transition-colors">{t('landing.nav.features')}</a>
            <a href="#process" className="text-sm font-semibold hover:text-primary transition-colors">{t('landing.nav.workflow')}</a>
            <a href="#testimonials" className="text-sm font-semibold hover:text-primary transition-colors">{t('landing.nav.testimonials')}</a>
            <div className="h-4 w-[1px] bg-border"></div>
            <button 
              onClick={handleLanguageToggle}
              className="flex items-center gap-1 text-sm font-bold text-foreground hover:text-primary uppercase"
            >
              <Globe className="w-4 h-4" /> {language === 'en' ? 'EN/NP' : 'NP/EN'}
            </button>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:flex text-sm font-bold px-4 py-2 rounded-lg hover:bg-accent transition-colors">
              {t('common.login')}
            </Link>
            <Link to="/signup" className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              {t('common.getStarted')}
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 py-20 lg:px-20 lg:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div className="inline-flex max-w-max items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider">{t('landing.hero.trusted')}</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-foreground font-['Fraunces']">
                {t('landing.hero.title')}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed font-['Syne']">
                {t('landing.hero.subtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="bg-foreground text-background h-14 px-8 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all">
                  <PenLine className="w-5 h-5" />
                  {t('landing.hero.cta')}
                </Link>
                <button className="border-2 border-primary/20 h-14 px-8 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all text-foreground">
                  {t('landing.hero.demo')}
                </button>
              </div>
            </div>
            
            {/* Floating Signature Pad Demo */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-50"></div>
              <div className="relative bg-card p-8 rounded-2xl shadow-2xl border border-border">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold text-muted-foreground uppercase">Signature Preview</span>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Type your name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rajesh Hamal"
                    className="w-full h-14 border border-border bg-background rounded-xl px-4 font-semibold text-lg focus:ring-2 ring-primary outline-none"
                    readOnly
                    value="Rajesh Hamal"
                  />
                  
                  <div className="mt-8 border-b-2 border-border pb-2 relative">
                    <div className="font-['Fraunces'] italic text-5xl text-primary transform -rotate-2 select-none">
                      Rajesh Hamal
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
                    Digitally encrypted and verified by SignFlow Security
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Experience the Flow Section */}
        <section id="process" className="bg-muted/30 py-24 px-6 lg:px-20 overflow-hidden">
          <div className="mx-auto max-w-7xl text-foreground">
            <div className="text-center mb-20 text-foreground">
              <h2 className="text-3xl lg:text-5xl font-bold mb-4 font-['Fraunces'] text-foreground">Experience the Flow</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto font-['Syne']">Witness the seamless journey of your document from start to finish.</p>
            </div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 lg:px-20">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-border hidden md:block -translate-y-1/2">
                <div className="h-full bg-primary w-2/3 shadow-[0_0_15px_rgba(235,107,10,0.5)]"></div>
              </div>
              
              {/* Step 1: Upload */}
              <div className="relative z-10 flex flex-col items-center gap-6 group">
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="text-center bg-background px-2 py-1 relative -mt-2">
                  <h4 className="font-bold text-xl mb-1 text-foreground">Upload</h4>
                  <p className="text-sm text-muted-foreground">PDF, Word, or Scans</p>
                </div>
              </div>
              
              {/* Step 2: Edit */}
              <div className="relative z-10 flex flex-col items-center gap-6 group">
                <div className="w-24 h-24 rounded-2xl bg-forest flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform overflow-hidden relative border border-forest/20">
                  <FileText className="w-10 h-10 text-white" />
                  <div className="absolute bottom-2 right-2 bg-primary transform rotate-12 p-1 rounded-sm shadow-md text-primary-foreground">
                    <PenTool className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-center bg-background px-2 py-1 relative -mt-2">
                  <h4 className="font-bold text-xl mb-1 text-foreground">Edit</h4>
                  <p className="text-sm text-muted-foreground">Drag & Drop Fields</p>
                </div>
              </div>
              
              {/* Step 3: Signed */}
              <div className="relative z-10 flex flex-col items-center gap-6 group opacity-70">
                <div className="w-20 h-20 rounded-2xl bg-card border-2 border-border flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <div className="text-center bg-background px-2 py-1 relative -mt-2">
                  <h4 className="font-bold text-xl mb-1 text-foreground">Completed</h4>
                  <p className="text-sm text-muted-foreground">Legally Secured</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The rest of the page would be i18n'd similarly */}
        <section className="py-24 px-6 lg:px-20 bg-background text-foreground text-center">
            <p className="text-muted-foreground">Additional sections would be internationalized in production.</p>
        </section>
      </main>

      <footer className="bg-muted/10 border-t border-border py-12 px-6 lg:px-20 text-foreground">
        <div className="mx-auto max-w-7xl text-center">
           <p className="text-xs text-muted-foreground">© 2026 SignFlow Nepal Technologies Pvt. Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
