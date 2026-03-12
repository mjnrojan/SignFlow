import { Search, Bell, Moon, Sun, Languages } from 'lucide-react';
import { useUIStore } from '@/lib/stores/useUIStore';
import { useUserStore } from '@/lib/stores/useUserStore';
import { useTranslation } from 'react-i18next';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function TopNavbar() {
  const { i18n } = useTranslation();
  const theme = useUIStore((s) => s.theme);
  const language = useUIStore((s) => s.language);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const toggleLanguage = useUIStore((s) => s.toggleLanguage);
  const user = useUserStore((s) => s.user);

  const handleLanguageToggle = () => {
    toggleLanguage();
    const newLang = language === 'en' ? 'np' : 'en';
    i18n.changeLanguage(newLang);
  };

  const initials = user
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'AU';

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-8 flex items-center justify-between z-10 shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/50 focus:outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
            placeholder="Search for documents, signatures..."
            type="text"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative transition-colors"
          title="Notifications"
        >
          <Bell className="size-5" />
          <span className="absolute top-2 right-2.5 size-2 bg-primary rounded-full border-2 border-white dark:border-slate-900" />
        </button>

        {/* Language toggle */}
        <button
          onClick={handleLanguageToggle}
          className="flex items-center gap-1 p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title={`Switch to ${language === 'en' ? 'Nepali' : 'English'}`}
        >
          <Languages className="size-5" />
          <span className="text-xs font-bold px-0.5 min-w-[20px] text-center">
            {language === 'en' ? 'EN' : 'NP'}
          </span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon className="size-5" /> : <Sun className="size-5" />}
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2" />

        {/* User profile */}
        <div className="flex items-center gap-3 pl-1">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none text-slate-900 dark:text-white">
              {user?.name ?? 'Admin User'}
            </p>
            <p className="text-[11px] text-slate-500 mt-1 uppercase tracking-tight">
              {user?.email ?? 'admin@signflow.np'}
            </p>
          </div>
          <Avatar className="size-9 ring-2 ring-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
