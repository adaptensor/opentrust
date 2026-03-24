import { Link as LinkIcon } from 'lucide-react';

interface SectionHeadingProps {
  id: string;
  children: React.ReactNode;
  level?: 'h2' | 'h3';
}

export default function SectionHeading({ id, children, level = 'h2' }: SectionHeadingProps) {
  const Tag = level;
  const sizes = level === 'h2'
    ? 'text-2xl sm:text-3xl'
    : 'text-xl sm:text-2xl';

  return (
    <Tag id={id} className={`${sizes} font-display font-bold text-text-primary mb-6 group scroll-mt-24 flex items-center gap-3`}>
      {children}
      <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-brand-gold">
        <LinkIcon size={level === 'h2' ? 20 : 16} />
      </a>
    </Tag>
  );
}
