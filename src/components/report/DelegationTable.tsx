import type { DelegationDeclaration } from '@/data/report-types';
import { ShieldCheck } from 'lucide-react';

interface DelegationTableProps {
  delegations: DelegationDeclaration[];
}

export default function DelegationTable({ delegations }: DelegationTableProps) {
  return (
    <div className="rounded-xl bg-surface-1 border border-surface-3/50 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-3/50">
            <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Function</th>
            <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Provider</th>
            <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Certification</th>
            <th className="text-left py-3 px-4 font-display font-bold text-text-primary">Data Isolation Proof</th>
          </tr>
        </thead>
        <tbody>
          {delegations.map((d) => (
            <tr key={d.function} className="border-b border-surface-3/20 last:border-0">
              <td className="py-3 px-4 text-text-primary font-semibold">{d.function}</td>
              <td className="py-3 px-4 text-brand-gold font-semibold">{d.provider}</td>
              <td className="py-3 px-4">
                <span className="inline-flex items-center gap-1.5 text-score-enforced">
                  <ShieldCheck size={14} />
                  {d.certification}
                </span>
              </td>
              <td className="py-3 px-4 text-text-secondary">{d.dataIsolation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
