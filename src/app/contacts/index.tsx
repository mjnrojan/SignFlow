import { useState, useEffect } from 'react';
import { useRecipientStore } from '@/lib/stores/useRecipientStore';
import { PageHeader } from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Mail, 
  Phone,
  Tag,
  Building2,
  Filter,
  Check
} from 'lucide-react';
import { RecipientRole } from '@/types/recipient.types';
import { cn } from '@/lib/utils';

export default function ContactsPage() {
  const { recipients } = useRecipientStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<RecipientRole | 'ALL'>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full space-y-6 pb-20 animate-pulse">
        <div className="h-32 bg-muted rounded-[2.5rem] w-full" />
        <div className="h-16 bg-muted rounded-2xl w-full" />
        <div className="bg-card border border-border rounded-3xl h-96 overflow-hidden">
           <div className="h-12 bg-muted/50 w-full" />
           <div className="p-6 space-y-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                   <div className="size-10 rounded-full bg-muted" />
                   <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted rounded w-1/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                   </div>
                   <div className="h-6 w-20 bg-muted rounded-full" />
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  const filteredContacts = recipients.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         contact.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'ALL' ? true : contact.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex flex-col min-h-full space-y-6 pb-20">
      <PageHeader 
        title="Contacts & Directory" 
        description="Manage your regular signers, approvers, and collaborators."
        actions={
          <Button className="rounded-xl h-10 font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            <UserPlus className="size-4 mr-2" />
            Add Contact
          </Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-card border border-border p-3 rounded-2xl shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search contacts..." 
            className="pl-10 h-10 rounded-xl bg-muted/20 border-border focus:bg-background transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-1.5 bg-muted p-1 rounded-xl">
           <Button 
            variant={selectedRole === 'ALL' ? 'default' : 'ghost'} 
            size="sm" 
            className="rounded-lg h-8 text-[10px] font-bold uppercase tracking-widest px-4"
            onClick={() => setSelectedRole('ALL')}
           >
            All
           </Button>
           <Button 
            variant={selectedRole === RecipientRole.SIGNER ? 'default' : 'ghost'} 
            size="sm" 
            className="rounded-lg h-8 text-[10px] font-bold uppercase tracking-widest px-4"
            onClick={() => setSelectedRole(RecipientRole.SIGNER)}
           >
            Signers
           </Button>
           <Button 
            variant={selectedRole === RecipientRole.APPROVER ? 'default' : 'ghost'} 
            size="sm" 
            className="rounded-lg h-8 text-[10px] font-bold uppercase tracking-widest px-4"
            onClick={() => setSelectedRole(RecipientRole.APPROVER)}
           >
            Approvers
           </Button>
        </div>

        <Button variant="outline" className="rounded-xl h-10 gap-2 font-bold px-4">
           <Filter className="size-4" /> More
        </Button>
      </div>

      {/* Contacts Table/List */}
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-border bg-muted/30">
                     <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Contact</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Role</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Status</th>
                     <th className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden md:table-cell">Details</th>
                     <th className="px-6 py-4 text-right w-20"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/50">
                  {filteredContacts.map((contact, index) => (
                    <tr 
                      key={contact.id} 
                      className="group hover:bg-muted/10 transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div 
                              className="size-10 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-lg shadow-primary/10"
                              style={{ backgroundColor: contact.color || '#E8760A' }}
                             >
                                {contact.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div>
                                <p className="font-bold text-sm text-foreground">{contact.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                   <Mail className="size-3" /> {contact.email}
                                </p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={cn(
                            "text-[9px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-widest whitespace-nowrap",
                            contact.role === RecipientRole.SIGNER ? "bg-primary/5 text-primary border-primary/20" : 
                            contact.role === RecipientRole.APPROVER ? "bg-secondary/5 text-secondary border-secondary/20" : "bg-blue-500/5 text-blue-500 border-blue-500/20"
                          )}>
                             {contact.role}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-500/5 px-2 py-1 rounded-lg w-fit border border-green-500/10 uppercase tracking-tighter">
                             <Check className="size-3" /> Active
                          </div>
                       </td>
                       <td className="px-6 py-4 hidden md:table-cell">
                          <div className="flex items-center gap-4 text-muted-foreground/40">
                             <Tag className="size-4" />
                             <Building2 className="size-4" />
                             <Phone className="size-4" />
                          </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground opacity-0 group-hover:opacity-100 transition-all active:scale-95">
                             <MoreHorizontal className="size-5" />
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         {filteredContacts.length === 0 && (
           <div className="py-20 flex flex-col items-center justify-center text-center">
              <div className="size-20 bg-muted rounded-full flex items-center justify-center mb-6">
                 <Search className="size-10 text-muted-foreground opacity-20" />
              </div>
              <h3 className="text-xl font-bold font-['Fraunces']">No contacts found</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm font-['Syne']">
                 We couldn't find any contacts matching your criteria. Try a different search term or role filter.
              </p>
              <Button 
                variant="link" 
                className="mt-4 font-bold text-primary"
                onClick={() => { setSearchQuery(''); setSelectedRole('ALL'); }}
              >
                 Reset filters
              </Button>
           </div>
         )}
      </div>

      <div className="flex items-center justify-between px-2">
         <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4">Showing {filteredContacts.length} total contacts</p>
         <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg">1</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground">2</Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground">3</Button>
         </div>
      </div>
    </div>
  );
}
