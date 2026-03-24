'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Domain } from '@/data/otp-spec';
import ControlRow from './ControlRow';

interface DomainCardProps {
  domain: Domain;
}

export default function DomainCard({ domain }: DomainCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl bg-surface-1 border border-surface-3/50 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-4 p-5 text-left hover:bg-surface-2/30 transition-colors"
      >
        <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-surface-2 font-display text-lg font-bold text-brand-gold shrink-0">
          {domain.number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold text-text-primary">
            {domain.name}
          </h3>
          <p className="text-sm text-text-secondary line-clamp-1">
            {domain.description}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono bg-surface-2 text-text-muted rounded-md">
            {domain.controlCount} controls
          </span>
          <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-mono bg-surface-2 text-brand-gold rounded-md">
            {(domain.weight * 100).toFixed(0)}% weight
          </span>
          {expanded ? (
            <ChevronDown size={20} className="text-text-muted" />
          ) : (
            <ChevronRight size={20} className="text-text-muted" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-surface-3/50">
          {/* SOC 2 mapping */}
          <div className="px-5 py-3 bg-surface-2/20 border-b border-surface-3/30">
            <p className="text-xs text-text-muted">
              <span className="font-semibold text-text-secondary">SOC 2 Mapping:</span>{' '}
              {domain.soc2Mapping} — {domain.soc2Description}
            </p>
          </div>

          {/* Controls */}
          <div>
            {domain.controls.map((control) => (
              <ControlRow key={control.id} control={control} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
