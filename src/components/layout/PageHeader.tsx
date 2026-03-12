import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface IBreadcrumb {
  label: string;
  to?: string;
}

interface IPageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: IBreadcrumb[];
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, breadcrumbs, actions }: IPageHeaderProps) {
  return (
    <section className="space-y-3">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-sm text-slate-500">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="size-3.5 text-slate-400" />}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className="hover:text-primary transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-900 dark:text-slate-100 font-medium">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      )}

      {/* Title + Actions row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-slate-500 mt-1 text-sm lg:text-base">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </section>
  );
}
