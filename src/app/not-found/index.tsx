import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { Home, ArrowLeft, PenLine, FileQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-8 animate-in zoom-in-95 duration-700">
        <div className="relative">
           <div className="size-48 bg-primary/10 rounded-[3rem] rotate-12 absolute inset-0 -z-10 animate-pulse" />
           <div className="size-48 bg-secondary/10 rounded-[3rem] -rotate-12 absolute inset-0 -z-10 animate-pulse [animation-delay:1s]" />
           <div className="size-48 bg-card border border-border rounded-[3rem] flex items-center justify-center shadow-2xl mx-auto backdrop-blur-sm">
              <FileQuestion className="size-20 text-primary" />
           </div>
           
           <div className="absolute -top-4 -right-4 bg-secondary text-white text-4xl font-black px-6 py-2 rounded-2xl shadow-xl rotate-12">
              404
           </div>
        </div>

        <div className="space-y-3">
           <h1 className="text-4xl font-extrabold font-['Fraunces'] tracking-tight">Page Lost in the Himalayas</h1>
           <p className="text-muted-foreground font-['Syne']">
              The document or page you're looking for has moved or doesn't exist. Let's get you back to safety.
           </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
           <Link 
            to={-1 as any} 
            className={cn(buttonVariants({ variant: 'outline' }), "h-12 rounded-xl font-bold gap-2 px-8 group")}
           >
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
           </Link>
           <Link 
            to="/dashboard" 
            className={cn(buttonVariants({ variant: 'default' }), "h-12 rounded-xl font-bold gap-2 px-8 bg-primary text-white hover:bg-primary/90 shadow-xl shadow-primary/20 border-none")}
           >
              <Home className="size-4" />
              Return Home
           </Link>
        </div>

        <div className="pt-12 flex items-center justify-center gap-6 opacity-40">
           <div className="flex items-center gap-2">
              <PenLine className="size-4 text-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest">SignFlow Nepal</span>
           </div>
        </div>
      </div>
    </div>
  );
}
