import { useState, useEffect } from 'react';
import { useUserStore } from '@/lib/stores/useUserStore';
import { useUIStore } from '@/lib/stores/useUIStore';
import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  PenLine, 
  Camera,
  Check,
  Mail,
  Zap,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const { user, updateUser } = useUserStore();
  const { theme, setTheme, language, setLanguage } = useUIStore();
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full space-y-8 pb-20 animate-pulse">
        <div className="h-24 bg-muted rounded-[2rem] w-full" />
        <div className="h-12 bg-muted rounded-xl w-full max-w-md" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-1 bg-muted rounded-3xl h-96" />
           <div className="lg:col-span-2 bg-muted rounded-3xl h-[600px]" />
        </div>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      // Logic would go here in real app
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-full space-y-8 pb-20 animate-in fade-in duration-700">
      <PageHeader 
        title={t('settings.title')} 
        description={t('settings.profile.description')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
            <TabsList className="flex flex-col h-auto bg-transparent border-none p-0 space-y-1">
              {[
                { id: 'profile', icon: User, label: t('settings.tabs.profile') },
                { id: 'signatures', icon: PenLine, label: t('settings.tabs.signatures') },
                { id: 'appearance', icon: Palette, label: t('settings.tabs.appearance') },
                { id: 'notifications', icon: Bell, label: t('settings.tabs.notifications') },
                { id: 'security', icon: Shield, label: t('settings.tabs.security') },
                { id: 'billing', icon: Zap, label: t('settings.tabs.billing') },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={cn(
                    "w-full justify-start gap-3 px-4 py-3 rounded-xl transition-all font-bold font-['Syne'] border-none",
                    activeTab === tab.id 
                      ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <tab.icon className="size-4" />
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </aside>
        <main className="lg:col-span-9 space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <Card className="border-border rounded-[2rem] shadow-sm overflow-hidden border-none bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="font-['Fraunces'] text-2xl">{t('settings.profile.title')}</CardTitle>
                  <CardDescription className="font-['Syne']">{t('settings.profile.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-muted/30 rounded-3xl">
                    <div className="relative group">
                       <Avatar className="size-24 border-4 border-background shadow-xl">
                         <AvatarImage src={user?.avatarUrl} />
                         <AvatarFallback className="bg-primary text-white text-2xl font-bold">
                           {user?.name.charAt(0)}
                         </AvatarFallback>
                       </Avatar>
                       <button className="absolute bottom-0 right-0 p-2 bg-forest text-white rounded-full shadow-lg hover:scale-110 active:scale-90 transition-all border-2 border-background">
                         <Camera className="size-4" />
                       </button>
                    </div>
                    <div className="text-center sm:text-left space-y-1">
                       <h4 className="font-bold text-lg">{t('settings.profile.avatar')}</h4>
                       <p className="text-xs text-muted-foreground">{t('settings.profile.changePhoto')}</p>
                       <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest">{t('common.edit')}</Button>
                          <Button size="sm" variant="ghost" className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/10">{t('common.delete')}</Button>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold ml-1">{t('settings.profile.fullName')}</Label>
                      <Input 
                        defaultValue={user?.name} 
                        className="h-12 rounded-xl bg-muted/30 border-border focus:bg-background transition-all"
                        onChange={(e) => updateUser({ name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold ml-1">{t('settings.profile.email')}</Label>
                      <div className="relative">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                         <Input 
                          defaultValue={user?.email} 
                          className="pl-11 h-12 rounded-xl bg-muted/30 border-border opacity-60 cursor-not-allowed" 
                          readOnly
                         />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold ml-1">{t('settings.profile.company')}</Label>
                      <div className="relative">
                         <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                         <Input 
                          defaultValue={user?.companyName} 
                          className="pl-11 h-12 rounded-xl bg-muted/30 border-border focus:bg-background transition-all"
                          onChange={(e) => updateUser({ companyName: e.target.value })}
                         />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] uppercase tracking-widest font-bold ml-1">{t('settings.profile.memberSince')}</Label>
                      <Input 
                        value="March 2023" 
                        className="h-12 rounded-xl bg-muted/30 border-border opacity-60" 
                        readOnly
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'signatures' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <Card className="border-none bg-card/50 backdrop-blur-sm rounded-[2rem]">
                  <CardHeader>
                     <CardTitle className="font-['Fraunces'] text-2xl">{t('settings.signatures.title')}</CardTitle>
                     <CardDescription>{t('settings.signatures.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="p-8 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center space-y-4 hover:border-primary/30 transition-colors cursor-pointer group">
                        <div className="size-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                           <PenLine className="size-8 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div>
                           <p className="font-bold">{t('settings.signatures.default')}</p>
                           <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Not Set</p>
                        </div>
                     </div>
                     <div className="p-8 border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center text-center space-y-4 hover:border-secondary/30 transition-colors cursor-pointer group">
                        <div className="size-16 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                           <Shield className="size-8 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div>
                           <p className="font-bold">{t('settings.signatures.seal')}</p>
                           <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Not Uploaded</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <Card className="border-none bg-card/50 backdrop-blur-sm rounded-[2rem]">
                <CardHeader>
                  <CardTitle className="font-['Fraunces'] text-2xl">{t('settings.appearance.title')}</CardTitle>
                  <CardDescription>{t('settings.appearance.description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-6 bg-muted/20 rounded-2xl">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold flex items-center gap-2">
                        <Palette className="size-4" /> {t('settings.appearance.darkMode')}
                      </Label>
                      <p className="text-xs text-muted-foreground">{t('settings.appearance.darkModeDesc')}</p>
                    </div>
                    <Switch 
                      checked={theme === 'dark'} 
                      onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-6 bg-muted/20 rounded-2xl">
                    <div className="space-y-1">
                      <Label className="text-sm font-bold flex items-center gap-2">
                        <Globe className="size-4" /> {t('settings.appearance.language')}
                      </Label>
                      <p className="text-xs text-muted-foreground">{t('settings.appearance.languageDesc')}</p>
                    </div>
                    <div className="flex bg-muted p-1 rounded-lg">
                       <button 
                         onClick={() => setLanguage('en')}
                         className={cn("px-4 py-1.5 text-[10px] font-bold rounded-md transition-all", language === 'en' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                       >
                         EN
                       </button>
                       <button 
                         onClick={() => setLanguage('np')}
                         className={cn("px-4 py-1.5 text-[10px] font-bold rounded-md transition-all", language === 'np' ? "bg-background shadow-sm text-primary" : "text-muted-foreground")}
                       >
                         NP
                       </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
               <Card className="border-none bg-card/50 backdrop-blur-sm rounded-[2rem]">
                  <CardHeader>
                     <CardTitle className="font-['Fraunces'] text-2xl">{t('settings.notifications.title')}</CardTitle>
                     <CardDescription>{t('settings.notifications.description')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {[
                       { id: 'email', label: t('settings.notifications.email'), desc: 'Receive updates via signflow@company.com', icon: Mail, checked: true },
                       { id: 'whatsapp', label: t('settings.notifications.whatsapp'), desc: 'Real-time alerts on your mobile', icon: Check, checked: false },
                       { id: 'viber', label: t('settings.notifications.viber'), desc: 'Join our official Viber community', icon: Globe, checked: false },
                     ].map((item) => (
                       <div key={item.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-2xl hover:bg-muted/20 transition-colors">
                          <div className="flex items-center gap-4">
                             <div className="size-10 rounded-xl bg-background flex items-center justify-center shadow-sm">
                                <item.icon className="size-4 text-primary" />
                             </div>
                             <div>
                                <p className="text-sm font-bold">{item.label}</p>
                                <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                             </div>
                          </div>
                          <Switch defaultChecked={item.checked} />
                       </div>
                     ))}
                  </CardContent>
               </Card>
            </div>
          )}

          {(activeTab === 'security' || activeTab === 'billing') && (
            <div className="h-64 flex flex-col items-center justify-center text-center p-8 bg-muted/20 border-2 border-dashed border-border rounded-[2.5rem] animate-in zoom-in-95 duration-500">
               <Zap className="size-12 text-muted-foreground/20 mb-4" />
               <h3 className="text-xl font-bold font-['Fraunces']">{t('common.comingSoon')}</h3>
               <p className="text-xs text-muted-foreground font-['Syne'] max-w-[240px] mt-2">
                  We're putting the final touches on these enterprise-grade security and billing features.
               </p>
            </div>
          )}

          <div className="flex justify-end pt-4 gap-4">
             <Button variant="ghost" className="rounded-xl h-12 px-8 font-bold font-['Syne']">
                Discard Changes
             </Button>
             <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl h-12 px-10 font-bold font-['Syne'] shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-70"
             >
                {isSaving ? (
                  <>
                    <Zap className="size-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check className="size-4 mr-2" />
                    {t('common.save')}
                  </>
                )}
             </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
