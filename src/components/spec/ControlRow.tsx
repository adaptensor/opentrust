import type { Control } from '@/data/otp-spec';

interface ControlRowProps {
  control: Control;
}

export default function ControlRow({ control }: ControlRowProps) {
  return (
    <div className="py-3 px-4 border-b border-surface-3/20 last:border-0 hover:bg-surface-2/30 transition-colors">
      <div className="flex items-start gap-3">
        <span className="font-mono text-xs text-brand-gold font-bold mt-0.5 shrink-0 w-8">
          {control.id}
        </span>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-text-primary mb-1">
            {control.name}
          </h4>
          <p className="text-xs text-text-secondary mb-1">
            <span className="text-text-muted">Evidence: </span>
            {control.requiredEvidence}
          </p>
          <p className="text-xs text-text-muted italic">
            {control.notes}
          </p>
        </div>
      </div>
    </div>
  );
}
