import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, EyeOff, Eye, User } from 'lucide-react';
import { useUserStore } from '@/lib/stores/useUserStore';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Mocking signup as just logging in
    navigate('/dashboard');
  };

  return (
    <>
      <div className="mb-3 text-center">
        <h2 className="text-lg md:text-xl font-bold text-foreground font-['Fraunces'] leading-tight">Create Account</h2>
        <p className="text-[10px] text-muted-foreground font-['Syne']">Join Digital Nepal</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-2.5">
        <div>
          <label className="block text-[11px] font-semibold text-foreground mb-1">Full Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground">
              <User className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              required
              placeholder="Rajesh Hamal"
              className="block w-full pl-8 pr-3 py-1.5 border border-border rounded-lg bg-background text-sm text-foreground focus:ring-1 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-foreground mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground">
              <Mail className="w-4 h-4" />
            </span>
            <input 
              type="email" 
              required
              placeholder="name@company.com.np"
              className="block w-full pl-8 pr-3 py-1.5 border border-border rounded-lg bg-background text-sm text-foreground focus:ring-1 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-[11px] font-semibold text-foreground mb-1">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground">
              <Lock className="w-4 h-4" />
            </span>
            <input 
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              className="block w-full pl-8 pr-10 py-1.5 border border-border rounded-lg bg-background text-sm text-foreground focus:ring-1 focus:ring-primary focus:border-transparent transition-all outline-none"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="terms" 
            required
            className="h-4 w-4 text-primary focus:ring-primary border-border rounded cursor-pointer bg-background"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-foreground cursor-pointer">
            I agree to the Terms of Service & Privacy Policy
          </label>
        </div>
        
        <button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-4 rounded-lg shadow-lg shadow-primary/30 transform transition-transform active:scale-[0.98] text-sm"
        >
          Create Account
        </button>
      </form>
      
      <div className="relative my-3 text-center shrink-0">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/50"></div>
        </div>
        <div className="relative flex justify-center text-[8px] uppercase tracking-widest">
          <span className="bg-background px-4 text-muted-foreground/40">Secure Setup</span>
        </div>
      </div>
      
      <button 
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-background border border-border py-1.5 px-4 rounded-lg hover:bg-accent transition-colors text-foreground font-medium shadow-sm text-xs"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
        </svg>
        Sign up with Google
      </button>
      
      <p className="mt-4 text-center text-[10px] text-muted-foreground">
        Already registered? 
        <Link to="/login" className="font-bold text-primary hover:underline ml-1">Sign In</Link>
      </p>
    </>
  );
}
