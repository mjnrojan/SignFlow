import { Outlet } from "react-router-dom"
import { Shield } from "lucide-react"
export function AuthLayout() {
  return (
    <div className="relative h-[100dvh] w-full flex items-center justify-center p-2 bg-slate-950 overflow-hidden overscroll-none select-none">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className="w-full h-full bg-cover bg-center transition-opacity duration-1000" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px] z-10" />
      </div>

      {/* Centered Content Card */}
      <div className="relative z-20 w-full max-w-sm px-2 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-background/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex-1 px-4 py-4 md:px-6 md:py-6">
              {/* Logo Area */}
              <div className="flex items-center gap-2 mb-2 justify-center">
                <div className="bg-primary p-1 rounded-lg rotate-[-4deg]">
                  <Shield className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex flex-col">
                  <span className="text-base font-black tracking-tight font-['Fraunces'] text-foreground leading-none">SignFlow</span>
                  <span className="text-[6px] font-bold tracking-[0.3em] uppercase text-primary font-['Syne']">Nepal</span>
                </div>
              </div>

              <div className="w-full">
                <Outlet />
              </div>

              {/* Shared Footer Links */}
              <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[7px] text-muted-foreground uppercase tracking-[0.2em] font-bold border-t border-border/30 pt-2">
                <a href="#" className="hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms</a>
                <a href="#" className="hover:text-primary transition-colors">Security</a>
                <a href="#" className="hover:text-primary transition-colors">Help</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Tagline */}
        <div className="mt-4 text-center text-white/30 text-[9px] font-['Syne'] font-medium uppercase tracking-[0.25em]">
          Securely Scaling Digital Nepal
        </div>
      </div>
    </div>
  )
}
