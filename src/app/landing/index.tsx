import { Link } from 'react-router-dom';
import { 
  PenTool, Globe, ChevronRight, FileText, UploadCloud, 
  CheckCircle, Star, PenLine, MousePointer2 
} from 'lucide-react';

export default function LandingPage() {
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
            <a href="#features" className="text-sm font-semibold hover:text-primary transition-colors">Features</a>
            <a href="#process" className="text-sm font-semibold hover:text-primary transition-colors">Workflow</a>
            <a href="#testimonials" className="text-sm font-semibold hover:text-primary transition-colors">Testimonials</a>
            <div className="h-4 w-[1px] bg-border"></div>
            <button className="flex items-center gap-1 text-sm font-bold text-foreground hover:text-primary">
              <Globe className="w-4 h-4" /> EN/NP
            </button>
          </nav>
          
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden sm:flex text-sm font-bold px-4 py-2 rounded-lg hover:bg-accent transition-colors">
              Log In
            </Link>
            <Link to="/signup" className="bg-primary text-primary-foreground text-sm font-bold px-5 py-2.5 rounded-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              Get Started Free
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
                <span className="text-xs font-bold uppercase tracking-wider">Trusted by 500+ Local Businesses</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-foreground font-['Fraunces']">
                The Future of <span className="text-primary italic">Signing</span> in Nepal.
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg leading-relaxed font-['Syne']">
                Legally binding digital signatures designed for the Nepali market. From secure land documents to corporate contracts—all in one click.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="bg-foreground text-background h-14 px-8 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all">
                  <PenLine className="w-5 h-5" />
                  Sign your first document
                </Link>
                <button className="border-2 border-primary/20 h-14 px-8 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all text-foreground">
                  Watch Demo Video
                </button>
              </div>
            </div>
            
            {/* Floating Signature Pad Demo */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-50"></div>
              <div className="relative bg-card p-8 rounded-2xl shadow-2xl border border-border">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-bold text-muted-foreground">SIGNATURE PREVIEW</span>
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
        <section id="process" className="bg-primary/5 py-24 px-6 lg:px-20 overflow-hidden">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-20">
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
                <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform overflow-hidden relative border border-primary/20">
                  <FileText className="w-10 h-10 text-primary" />
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

        {/* Bento Features Grid */}
        <section id="features" className="py-24 px-6 lg:px-20 bg-background text-foreground">
          <div className="mx-auto max-w-7xl">
            <div className="grid md:grid-cols-12 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
              {/* Main Drag & Drop Feature */}
              <div className="md:col-span-8 md:row-span-2 bg-card rounded-3xl p-8 border border-border flex flex-col justify-between overflow-hidden group">
                <div>
                  <h3 className="text-3xl font-bold text-foreground mb-4 font-['Fraunces']">Precision Drag & Drop</h3>
                  <p className="text-muted-foreground max-w-md font-['Syne']">
                    Place signature, initial, and date fields anywhere on your document with millimeter precision.
                  </p>
                </div>
                
                <div className="relative mt-8 h-64 bg-accent/50 rounded-2xl border-2 border-dashed border-border flex items-center justify-center">
                  <div className="absolute top-10 left-1/4 px-4 py-2 bg-primary text-primary-foreground rounded-lg shadow-xl flex items-center gap-2 animate-pulse">
                    <MousePointer2 className="w-4 h-4" /> Signature Field
                  </div>
                  <div className="absolute bottom-12 right-1/3 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg shadow-xl opacity-80 border border-primary/20">
                    Date Signed
                  </div>
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileText className="w-12 h-12 opacity-50" />
                    <span className="text-xs font-bold uppercase tracking-widest">Document Workspace</span>
                  </div>
                </div>
              </div>
              
              {/* Status Tracker Card */}
              <div className="md:col-span-4 md:row-span-1 bg-primary text-primary-foreground rounded-3xl p-8 flex flex-col justify-between">
                <h4 className="font-bold text-xl">Real-time Tracking</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold border-b border-primary-foreground/20 pb-2">
                    <span>DOC #1092</span>
                    <span className="bg-primary-foreground/20 px-2 py-0.5 rounded">66% DONE</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-black">
                        <CheckCircle className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">CEO (Signed)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-400 flex items-center justify-center text-black">
                        <CheckCircle className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">Legal Dept (Signed)</span>
                    </div>
                    <div className="flex items-center gap-3 opacity-80">
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">3</div>
                      <span className="text-sm font-medium">Client (Pending)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Integration Card */}
              <div className="md:col-span-4 md:row-span-1 bg-secondary text-secondary-foreground rounded-3xl p-8 flex flex-col justify-between border border-border">
                <h4 className="font-bold text-xl">API Ready</h4>
                <div className="bg-background/80 p-4 rounded-xl font-mono text-xs text-primary leading-relaxed border border-border">
                  <span className="text-muted-foreground">// Send for signature</span><br/>
                  SignFlow.send({`{`}<br/>
                  &nbsp;&nbsp;template: 'np_nda',<br/>
                  &nbsp;&nbsp;signer: 'user@mail.np'<br/>
                  {`}`});
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 px-6 lg:px-20 overflow-hidden bg-primary/5">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-center text-4xl font-bold mb-16 text-foreground font-['Fraunces']">Trusted Across Nepal</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <div className="flex text-primary mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-muted-foreground italic mb-6 font-['Syne']">
                  "SignFlow reduced our contract closing time from 4 days to 4 hours. Essential for any modern Nepali business."
                </p>
                <div className="flex items-center gap-4 border-t border-border pt-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg font-bold">
                    S
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Sunil Thapa</p>
                    <p className="text-xs text-muted-foreground">CEO, Himalayan Tech</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-card p-8 rounded-2xl shadow-lg border border-primary/20 transform md:scale-105">
                <div className="flex text-primary mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-muted-foreground italic mb-6 font-['Syne']">
                  "Perfect for remote clients. The Nepali language support made it easy for our older stakeholders to adapt."
                </p>
                <div className="flex items-center gap-4 border-t border-border pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center text-lg font-bold">
                    P
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Priya Adhikari</p>
                    <p className="text-xs text-muted-foreground">Legal Partner, Adhikari & Co.</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-card p-8 rounded-2xl shadow-sm border border-border">
                <div className="flex text-primary mb-4">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <p className="text-muted-foreground italic mb-6 font-['Syne']">
                  "The security features are world-class. We trust SignFlow with our most sensitive financial documents."
                </p>
                <div className="flex items-center gap-4 border-t border-border pt-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-lg font-bold">
                    B
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Bikram Shrestha</p>
                    <p className="text-xs text-muted-foreground">Ops Manager, Everest Fin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 lg:px-20 bg-background text-foreground">
          <div className="mx-auto max-w-5xl bg-foreground text-background mb-8 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight font-['Fraunces']">
                Ready to transform your business workflow?
              </h2>
              <p className="text-background/80 text-lg max-w-xl font-['Syne']">
                Join thousands of businesses in Nepal who are signing smarter, faster, and more securely.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/signup" className="bg-primary text-primary-foreground h-16 px-10 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-transform flex items-center justify-center border-2 border-primary">
                  Create Free Account
                </Link>
                <button className="bg-background text-foreground h-16 px-10 rounded-2xl font-bold text-lg shadow-xl hover:bg-muted transition-colors border-2 border-transparent">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-accent/30 border-t border-border py-12 px-6 lg:px-20 bg-background text-foreground">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <PenTool className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-bold tracking-tight font-['Fraunces']">SignFlow Nepal</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The standard for electronic signatures in Nepal. Compliant with the Electronic Transactions Act (ETA) 2063.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-foreground">Product</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Digital Signature</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Document Editor</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">API for Developers</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-foreground">Company</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Legality</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-foreground">Support</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl mt-12 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground">© 2026 SignFlow Nepal Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
