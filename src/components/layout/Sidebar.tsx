import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  PenLine,
} from 'lucide-react';
import { useUIStore } from '@/lib/stores/useUIStore';
import { useTranslation } from 'react-i18next';

interface INavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  section?: string;
  translationKey: string;
}

const NAV_ITEMS: INavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, translationKey: 'sidebar.dashboard' },
  { name: 'Documents', path: '/documents', icon: FileText, translationKey: 'sidebar.documents' },
  { name: 'Signatures', path: '/vault', icon: PenLine, translationKey: 'sidebar.signatures' },
  { name: 'Contacts', path: '/contacts', icon: Users, section: 'Administration', translationKey: 'sidebar.contacts' },
  { name: 'Settings', path: '/settings', icon: Settings, translationKey: 'sidebar.settings' },
];

export function Sidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const sidebarCollapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.sidebarCollapsed !== undefined ? s.toggleSidebar : () => {});

  let lastSection: string | undefined;

  return (
    <aside
      className={`${
        sidebarCollapsed ? 'w-[72px]' : 'w-64'
      } border-r border-border bg-card flex flex-col transition-all duration-300 h-full shrink-0`}
    >
      {/* Logo */}
      <div className="p-4 flex items-center gap-3 h-16 border-b border-border/50">
        <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground shrink-0 shadow-lg shadow-primary/20">
          <PenLine className="size-5" />
        </div>
        {!sidebarCollapsed && (
          <div className="flex flex-col min-w-0">
            <h1 className="text-foreground font-bold text-lg leading-tight truncate">
              SignFlow
            </h1>
            <p className="text-primary text-[10px] uppercase tracking-widest font-bold">
              Nepal
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path));

          // Render section header
          let sectionHeader: React.ReactNode = null;
          if (item.section && item.section !== lastSection) {
            lastSection = item.section;
            sectionHeader = !sidebarCollapsed ? (
              <div className="pt-4 pb-2">
                <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {t('sidebar.administration')}
                </p>
              </div>
            ) : (
              <div className="pt-3 pb-1">
                <div className="mx-auto w-6 border-t border-border" />
              </div>
            );
          }

          return (
            <div key={item.path}>
              {sectionHeader}
              <Link
                to={item.path}
                title={sidebarCollapsed ? t(item.translationKey) : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
              >
                <Icon
                  className={`size-[22px] shrink-0 ${
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                  }`}
                />
                {!sidebarCollapsed && (
                  <span className="text-sm truncate">{t(item.translationKey)}</span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="px-3 py-2 border-t border-border/50">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center gap-2 p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
          title={sidebarCollapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="size-5" />
          ) : (
            <>
              <PanelLeftClose className="size-5" />
              <span className="text-xs font-medium">{t('sidebar.collapse')}</span>
            </>
          )}
        </button>
      </div>

      {/* New Document CTA */}
      <div className="p-3 border-t border-border/50">
        <Link
          to="/documents/upload"
          className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/20 ${
            sidebarCollapsed ? 'px-2' : 'px-4'
          }`}
        >
          <Plus className="size-5 shrink-0" />
          {!sidebarCollapsed && <span className="text-sm">{t('sidebar.newDocument')}</span>}
        </Link>
      </div>
    </aside>
  );
}
