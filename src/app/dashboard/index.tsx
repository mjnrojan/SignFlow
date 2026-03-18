import React from 'react';
import { 
  FileText, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  TrendingUp,
  TrendingDown,
  History,
  Edit,
  Download,
  Eye,
  Layers,
  FileEdit,
  Share2,
  Clock,
  CheckCircle2,
  Users,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDocuments } from '@/lib/hooks/useDocuments';
import { useAuditLogs } from '@/lib/hooks/useAuditLogs';
import { DocumentStatus } from '@/types/document.types';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { TableSkeleton } from '@/components/shared/TableSkeleton';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'warning' | 'danger' | 'info';
}

function StatCard({ title, value, icon: Icon, description, trend, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'text-muted-foreground bg-muted',
    primary: 'text-primary bg-primary/10',
    secondary: 'text-secondary bg-secondary/10',
    warning: 'text-amber-600 bg-amber-100',
    danger: 'text-destructive bg-destructive/10',
    info: 'text-blue-600 bg-blue-100',
  };

  return (
    <div className="bg-card p-4 rounded-xl border border-border shadow-sm group hover:border-primary/50 transition-colors">
      <div className="flex justify-between items-start mb-2">
        <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider font-['Syne']">{title}</p>
        <div className={`p-2 rounded-lg ${variantStyles[variant]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-bold font-['Fraunces']">{value}</h3>
          {trend ? (
            <p className="text-[10px] text-green-600 font-bold mt-1 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> {trend}
            </p>
          ) : (
            <p className="text-[10px] text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface IAnalyticsStatProps {
  label: string;
  value: string;
  change: string;
  icon: React.ElementType;
  color: string;
  bg: string;
  index: number;
}

function AnalyticsStatCard({ label, value, change, icon: Icon, color, bg, index }: IAnalyticsStatProps) {
  return (
    <div 
      className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn("size-9 rounded-xl flex items-center justify-center", bg)}>
          <Icon className={cn("size-4", color)} />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
          change.startsWith('+') ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
        )}>
          {change.startsWith('+') ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
          {change}
        </div>
      </div>
      <h3 className="text-xl font-bold font-['Fraunces'] text-foreground">{value}</h3>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

function QuickAction({ title, subtitle, icon: Icon, color, onClick }: { title: string; subtitle: string; icon: React.ElementType; color: string; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`${color} text-white p-6 rounded-2xl flex items-center justify-between group transform transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-black/5`}
    >
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
          <Icon className="w-8 h-8" />
        </div>
        <div className="text-left">
          <h3 className="text-xl font-bold font-['Fraunces']">{title}</h3>
          <p className="text-white/80 text-sm font-['Syne']">{subtitle}</p>
        </div>
      </div>
      <ArrowRight className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
    </button>
  );
}

// Monthly volume chart data
const CHART_DATA = [
  { m: 'Jan', s: 40, c: 30 }, { m: 'Feb', s: 45, c: 35 }, { m: 'Mar', s: 60, c: 50 },
  { m: 'Apr', s: 55, c: 45 }, { m: 'May', s: 70, c: 65 }, { m: 'Jun', s: 85, c: 80 },
  { m: 'Jul', s: 80, c: 75 }, { m: 'Aug', s: 95, c: 90 }, { m: 'Sep', s: 100, c: 95 },
  { m: 'Oct', s: 110, c: 105 }, { m: 'Nov', s: 120, c: 115 }, { m: 'Dec', s: 130, c: 125 }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: documents, isLoading: docsLoading } = useDocuments();
  const { data: auditLogs, isLoading: logsLoading } = useAuditLogs();

  if (docsLoading || logsLoading) {
    return (
      <div className="p-8 space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-muted animate-pulse rounded-2xl"></div>
          <div className="h-32 bg-muted animate-pulse rounded-2xl"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-24 bg-muted animate-pulse rounded-xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted animate-pulse rounded-2xl"></div>
          ))}
        </div>
        <div className="h-72 bg-muted animate-pulse rounded-[2.5rem]"></div>
        <TableSkeleton />
      </div>
    );
  }

  const stats = {
    total: documents?.length || 0,
    draft: documents?.filter(d => d.status === DocumentStatus.DRAFT).length || 0,
    sent: documents?.filter(d => d.status === DocumentStatus.SENT).length || 0,
    completed: documents?.filter(d => d.status === DocumentStatus.COMPLETED).length || 0,
    declined: documents?.filter(d => d.status === DocumentStatus.DECLINED).length || 0,
  };

  const recentDocs = documents?.slice(0, 5) || [];
  const recentLogs = auditLogs?.slice(0, 5) || [];

  const analyticsStats = [
    { label: 'Completion Rate', value: '84.2%', change: '+12.5%', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Avg Signing Time', value: '2.4 hrs', change: '-15%', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active Documents', value: String(stats.total), change: '+5.7%', icon: FileText, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Active Recipients', value: '4,520', change: '+22%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-['Fraunces'] text-foreground">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-1 font-['Syne'] tracking-wide">
            {t('dashboard.greeting')} {t('dashboard.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
           <div className="hidden sm:flex items-center bg-accent rounded-lg p-1 border border-border">
              <span className="px-3 py-1.5 text-xs font-bold text-primary bg-background rounded-md shadow-sm">Monthly</span>
              <span className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer">Yearly</span>
           </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickAction 
          title={t('dashboard.quickActions.newDocTitle')} 
          subtitle={t('dashboard.quickActions.newDocSub')} 
          icon={FileEdit} 
          color="bg-primary" 
          onClick={() => navigate('/documents/upload')}
        />
        <QuickAction 
          title={t('dashboard.quickActions.useTemplateTitle')} 
          subtitle={t('dashboard.quickActions.useTemplateSub')} 
          icon={Layers} 
          color="bg-forest" 
          onClick={() => navigate('/documents/upload')}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title={t('dashboard.stats.allFiles')} value={stats.total} icon={FileText} description="Across all folders" variant="default" />
        <StatCard title={t('dashboard.stats.drafts')} value={stats.draft} icon={Edit} description="Work in progress" variant="info" />
        <StatCard title={t('dashboard.stats.sentOut')} value={stats.sent} icon={Send} trend="+12.5%" variant="primary" />
        <StatCard title={t('dashboard.stats.completed')} value={stats.completed} icon={CheckCircle} trend="+18.2%" variant="secondary" />
        <StatCard title={t('dashboard.stats.declined')} value={stats.declined} icon={AlertCircle} description="Needs attention" variant="danger" />
      </div>

      {/* Analytics Stats Row (merged from AnalyticsPage) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {analyticsStats.map((stat, index) => (
          <AnalyticsStatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      {/* Monthly Volume Chart (merged from AnalyticsPage) */}
      <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-bold font-['Fraunces']">{t('dashboard.title')} — Monthly Volume</h3>
            <p className="text-xs text-muted-foreground font-['Syne']">Document processing growth over 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-[10px] font-bold">
              <span className="size-2 bg-primary rounded-full" />
              SENT
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-[10px] font-bold">
              <span className="size-2 bg-secondary rounded-full" />
              SIGNED
            </div>
          </div>
        </div>

        <div className="h-56 flex items-end justify-between gap-3 px-2">
          {CHART_DATA.map((d, i) => (
            <div key={d.m} className="flex-1 flex flex-col items-center gap-3 group">
              <div className="w-full flex flex-col-reverse items-center gap-1 h-full">
                <div 
                  className="w-full max-w-[12px] bg-secondary rounded-t-full relative transition-all duration-1000 group-hover:bg-secondary/80" 
                  style={{ height: `${d.c}%`, animationDelay: `${i * 50}ms` }} 
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {d.c}
                  </div>
                </div>
                <div 
                  className="w-full max-w-[12px] bg-primary/20 rounded-t-full relative transition-all duration-1000 group-hover:bg-primary/40" 
                  style={{ height: `${d.s - d.c}%`, animationDelay: `${i * 50}ms` }} 
                />
              </div>
              <span className="text-[10px] font-bold text-muted-foreground uppercase">{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Documents Table */}
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              <h2 className="font-bold text-lg font-['Fraunces']">{t('dashboard.recentDocs')}</h2>
            </div>
            <button 
              onClick={() => navigate('/documents')}
              className="text-xs text-primary font-bold hover:underline flex items-center gap-1"
            >
              {t('dashboard.viewAll')} <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/30 text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                  <th className="px-6 py-4">{t('documents.table.document')}</th>
                  <th className="px-6 py-4">{t('documents.table.status')}</th>
                  <th className="px-6 py-4">{t('documents.table.created')}</th>
                  <th className="px-6 py-4 text-right">{t('common.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-accent/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div 
                        onClick={() => navigate(`/documents/${doc.id}`)}
                        className="flex items-center gap-3 cursor-pointer group/item"
                      >
                        <div className="w-8 h-10 bg-primary/5 border border-primary/20 rounded-md flex items-center justify-center shrink-0 group-hover/item:bg-primary group-hover/item:border-primary transition-all">
                           <FileText className="w-4 h-4 text-primary opacity-60 group-hover/item:text-white group-hover/item:opacity-100" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground truncate max-w-[180px] group-hover/item:text-primary transition-colors">{doc.title}</p>
                          <p className="text-[10px] text-muted-foreground">ID: {doc.id.toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={doc.status} />
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          title={t('common.view')} 
                          onClick={() => navigate(`/documents/${doc.id}`)}
                          className="p-1.5 hover:bg-primary/10 rounded-md text-primary transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button title={t('common.download')} className="p-1.5 hover:bg-primary/10 rounded-md text-primary transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Activity Feed + Device Usage + Pro Insights */}
        <div className="lg:col-span-1 space-y-6">
          {/* Activity Feed */}
          <div className="bg-card rounded-2xl border border-border shadow-sm flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg font-['Fraunces']">{t('dashboard.activityFeed')}</h2>
              </div>
              <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full uppercase">Real-time</span>
            </div>
            <div className="p-6 space-y-6 overflow-y-auto max-h-[320px] custom-scrollbar">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex gap-4 relative group">
                  <div className="relative z-10 size-9 rounded-full bg-accent border border-border flex items-center justify-center shrink-0 shadow-sm group-hover:border-primary/50 transition-colors">
                    <History className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  {/* Vertical line connector */}
                  <div className="absolute left-[17px] top-9 bottom-[-24px] w-[2px] bg-border group-last:hidden"></div>
                  
                  <div>
                    <p className="text-sm text-foreground leading-tight">
                      <span className="font-bold text-primary cursor-pointer hover:underline">{log.userEmail?.split('@')[0]}</span>
                      {' '}{log.action.toLowerCase()}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      <span className="text-[10px] text-border">•</span>
                      <p className="text-[10px] text-muted-foreground">{new Date(log.timestamp).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Usage (merged from AnalyticsPage) */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold font-['Fraunces'] mb-5">Device Usage</h3>
            <div className="space-y-4">
              {[
                { label: 'Mobile App', value: 65, color: 'bg-primary' },
                { label: 'Desktop Web', value: 25, color: 'bg-secondary' },
                { label: 'Tablets', value: 10, color: 'bg-blue-500' }
              ].map(device => (
                <div key={device.label} className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold font-['Syne']">
                    <span>{device.label}</span>
                    <span className="text-muted-foreground">{device.value}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-1000", device.color)} style={{ width: `${device.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pro Insights CTA (merged from AnalyticsPage) */}
          <div className="bg-primary border border-primary/20 rounded-2xl p-6 shadow-2xl text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <ArrowUpRight className="size-24" />
            </div>
            <Info className="size-7 mb-3 opacity-50" />
            <h3 className="text-lg font-bold font-['Fraunces'] mb-2">Pro Insights</h3>
            <p className="text-xs text-white/70 leading-relaxed font-['Syne'] mb-5">
              Automate your reminders to increase completion speed by 24%.
            </p>
            <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold rounded-xl h-10 border-none transition-all active:scale-95 shadow-lg">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
