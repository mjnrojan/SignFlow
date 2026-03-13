import { PageHeader } from '@/components/layout/PageHeader';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Users,
  Calendar,
  Download,
  ArrowUpRight,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full space-y-8 pb-20 animate-pulse">
        <div className="h-32 bg-muted rounded-[2.5rem] w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
           {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="bg-card border border-border p-6 rounded-3xl h-32" />
           ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-muted rounded-[2.5rem] h-96" />
           <div className="space-y-8">
              <div className="bg-muted rounded-[2.5rem] h-64" />
              <div className="bg-muted rounded-[2.5rem] h-64" />
           </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Completion Rate', value: '84.2%', change: '+12.5%', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Avg signing time', value: '2.4 hrs', change: '-15%', icon: Clock, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Active document', value: '1,284', change: '+5.7%', icon: FileText, color: 'text-secondary', bg: 'bg-secondary/10' },
    { label: 'Active Recipients', value: '4,520', change: '+22%', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ];

  return (
    <div className="flex flex-col min-h-full space-y-8 pb-20">
      <PageHeader 
        title="Analytics Dashboard" 
        description="Monitor your signing performance and document lifecycles."
        actions={
          <div className="flex items-center gap-2">
             <Button variant="outline" className="rounded-xl font-bold gap-2">
                <Calendar className="size-4" /> This Month
             </Button>
             <Button className="rounded-xl font-bold gap-2 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Download className="size-4" /> Export
             </Button>
          </div>
        }
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
         {stats.map((stat, index) => (
           <div 
            key={stat.label}
            className="bg-card border border-border p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
           >
              <div className="flex items-center justify-between mb-4">
                 <div className={cn("size-10 rounded-xl flex items-center justify-center", stat.bg)}>
                    <stat.icon className={cn("size-5", stat.color)} />
                 </div>
                 <div className={cn(
                   "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
                   stat.change.startsWith('+') ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                 )}>
                   {stat.change.startsWith('+') ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
                   {stat.change}
                 </div>
              </div>
              <h3 className="text-2xl font-bold font-['Fraunces'] text-foreground">{stat.value}</h3>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart Card (Simplified Bar Chart) */}
         <div className="lg:col-span-2 bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-xl font-bold font-['Fraunces']">Monthly Volume</h3>
                  <p className="text-xs text-muted-foreground font-['Syne']">Document processing growth over 2023</p>
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

            <div className="h-64 flex items-end justify-between gap-4 px-2">
               {[
                 { m: 'Jan', s: 40, c: 30 }, { m: 'Feb', s: 45, c: 35 }, { m: 'Mar', s: 60, c: 50 },
                 { m: 'Apr', s: 55, c: 45 }, { m: 'May', s: 70, c: 65 }, { m: 'Jun', s: 85, c: 80 },
                 { m: 'Jul', s: 80, c: 75 }, { m: 'Aug', s: 95, c: 90 }, { m: 'Sep', s: 100, c: 95 },
                 { m: 'Oct', s: 110, c: 105 }, { m: 'Nov', s: 120, c: 115 }, { m: 'Dec', s: 130, c: 125 }
               ].map((d, i) => (
                 <div key={d.m} className="flex-1 flex flex-col items-center gap-3 group">
                    <div className="w-full flex flex-col-reverse items-center gap-1 h-full">
                       <div 
                         className="w-full max-w-[12px] bg-secondary rounded-t-full relative transition-all duration-1000 group-hover:bg-secondary/80" 
                         style={{ height: `${d.c}%`, animationDelay: `${i * 50}ms` }} 
                       >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
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

         {/* Side Distributions */}
         <div className="space-y-8">
            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
               <h3 className="text-xl font-bold font-['Fraunces'] mb-6">Device Usage</h3>
               <div className="space-y-6">
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
                          <div className={cn("h-full rounded-full", device.color)} style={{ width: `${device.value}%` }} />
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-primary border border-primary/20 rounded-[2.5rem] p-8 shadow-2xl text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="size-32" />
               </div>
               <Info className="size-8 mb-4 opacity-50" />
               <h3 className="text-xl font-bold font-['Fraunces'] mb-2">Pro Insights</h3>
               <p className="text-xs text-white/70 leading-relaxed font-['Syne'] mb-6">
                  You are $120.00 away from your next performance tier. Automate your reminders to increase completion speed by 24%.
               </p>
               <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold rounded-xl h-11 border-none transition-all active:scale-95 shadow-lg">
                  Upgrade Plan
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
}
