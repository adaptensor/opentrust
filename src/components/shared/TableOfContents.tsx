'use client';

import { useState, useEffect } from 'react';

interface TocItem {
  id: string;
  label: string;
  level: number;
}

const TOC_ITEMS: TocItem[] = [
  { id: 'purpose', label: 'Purpose', level: 1 },
  { id: 'scoring', label: 'Scoring Methodology', level: 1 },
  { id: 'delegation', label: 'The Delegation Principle', level: 1 },
  { id: 'domains', label: 'The Eight Trust Domains', level: 1 },
  { id: 'domain-1', label: '1. Authentication & Identity', level: 2 },
  { id: 'domain-2', label: '2. Data Protection & Encryption', level: 2 },
  { id: 'domain-3', label: '3. Input Validation', level: 2 },
  { id: 'domain-4', label: '4. Access Control', level: 2 },
  { id: 'domain-5', label: '5. Financial Integrity', level: 2 },
  { id: 'domain-6', label: '6. Infrastructure', level: 2 },
  { id: 'domain-7', label: '7. Monitoring', level: 2 },
  { id: 'domain-8', label: '8. Availability', level: 2 },
  { id: 'publishing', label: 'Publishing a Report', level: 1 },
  { id: 'rating-tiers', label: 'Rating Tiers', level: 1 },
];

export default function TableOfContents() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    TOC_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden xl:block sticky top-24 w-56 shrink-0">
      <h4 className="font-display text-xs font-bold text-text-muted uppercase tracking-wider mb-4">
        On this page
      </h4>
      <ul className="space-y-1">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-xs py-1 transition-colors ${
                item.level === 2 ? 'pl-4' : 'pl-0'
              } ${
                activeId === item.id
                  ? 'text-brand-gold font-semibold'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
